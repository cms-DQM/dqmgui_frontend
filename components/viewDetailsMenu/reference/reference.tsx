import React, { useState, useContext } from 'react';
import { Col } from 'antd';

import {
  TripleProps,
  QueryProps,
} from '../../../containers/display/interfaces';
import {
  StyledDiv,
  CustomCheckbox,
  CustomRow,
  CustomCol,
} from '../../styledComponents';
import { useRouter } from 'next/router';
import { CustomModal } from '../search';
import { OverlayOptions } from './overlayOptions';
import { OverlayRuns } from './overlayRuns';
import FormItem from 'antd/lib/form/FormItem';
import { store } from '../../../contexts/leftSideContext';

export const Reference = () => {
  const [selectedTriple, setTriple] = useState<TripleProps>({});

  const globalState = useContext(store);
  const { normalize, setNormalize, triples } = globalState;

  const checkedValue = normalize === 'True' ? true : false;
  const [checked, setChecked] = useState(checkedValue);

  const router = useRouter();
  const query: QueryProps = router.query;

  return (
    <StyledDiv>
      <CustomRow>
        <CustomCol space={'2'}></CustomCol>
        <CustomCol space={'2'}>
          <FormItem name="OverlayPosition" label="Position:">
            <OverlayOptions />
          </FormItem>
        </CustomCol>
        <CustomCol space={'2'}>
          <FormItem>
            <CustomCheckbox
              onClick={(e: any) => {
                setChecked(e.target.checked);
                const normalizeValue = e.target.checked ? 'True' : 'False';
                setNormalize(normalizeValue);
              }}
              checked={normalize === 'True' ? true : false}
            >
              Normalize
            </CustomCheckbox>
          </FormItem>
        </CustomCol>
        <Col></Col>
      </CustomRow>
      <CustomModal id={selectedTriple.id} />
      <OverlayRuns
        overlaid_runs={triples}
        query={query}
        setTriple={setTriple}
      />
    </StyledDiv>
  );
};
