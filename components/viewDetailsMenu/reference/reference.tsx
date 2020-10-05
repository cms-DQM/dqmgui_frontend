import React, { useState, useContext, useEffect } from 'react';
import { Col } from 'antd';

import { QueryProps } from '../../../containers/display/interfaces';
import {
  StyledDiv,
  CustomCheckbox,
  CustomRow,
  CustomCol,
} from '../../styledComponents';
import { useRouter } from 'next/router';
import { OverlayOptions } from './overlayOptions';
import { OverlayRuns } from './overlayRuns';
import FormItem from 'antd/lib/form/FormItem';
import { store } from '../../../contexts/leftSideContext';

export const Reference = () => {
  const globalState = useContext(store);
  const { normalize, setNormalize, triples } = globalState;

  const checkedValue = normalize === 'True' ? true : false;
  const [checked, setChecked] = useState(checkedValue);

  const router = useRouter();
  const query: QueryProps = router.query;

  useEffect(() => {
    const normalizeValue = checked ? 'True' : 'False';
    setNormalize(normalizeValue);
  }, [checked]);

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
              onClick={async (e: any) => {
                await setChecked(e.target.checked);
              }}
              checked={checked}
            >
              Normalize
            </CustomCheckbox>
          </FormItem>
        </CustomCol>
        <Col></Col>
      </CustomRow>
      <OverlayRuns overlaid_runs={triples} query={query} />
    </StyledDiv>
  );
};
