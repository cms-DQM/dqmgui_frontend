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
import { OverlayRuns } from './overlayPlotsWithDifferentRunsAndDatasets/overlayRuns';
import FormItem from 'antd/lib/form/FormItem';
import { store } from '../../../contexts/leftSideContext';

interface ReferenceProps extends ReferenceWithOverlaidRuns {
  setNormalizeNotGlobally?(value: boolean): void;
  setPositionNotGlobally?(value: string): void;
}

interface ReferenceWithOverlaidRuns {
  settedOverlay: string;
}

export const Reference = ({ setNormalizeNotGlobally, setPositionNotGlobally, settedOverlay }: ReferenceProps) => {
  const globalState = useContext(store);
  const { normalize, setNormalize } = globalState;

  const set_normalize = setNormalizeNotGlobally ? setNormalizeNotGlobally : setNormalize

  const checkedValue = normalize === 'True' ? true : false;
  const [checked, setChecked] = useState(checkedValue);

  useEffect(() => {
    const normalizeValue = checked ? 'True' : 'False';
    set_normalize(normalizeValue);
  }, [checked]);

  return (
    <CustomRow>
      <CustomCol space={'2'}></CustomCol>
      <CustomCol space={'2'}>
      </CustomCol>
      <CustomCol space={'2'}>
        <FormItem name="OverlayPosition" label="Position:">
          <OverlayOptions settedOverlay={settedOverlay} setPositionNotGlobally={setPositionNotGlobally} />
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
  );
};

export const ReferenceWithOverlaidRuns = ({ settedOverlay }: ReferenceWithOverlaidRuns) => {
  const globalState = useContext(store);
  const { triples } = globalState;
  const router = useRouter();
  const query: QueryProps = router.query;
  return (
    <StyledDiv>
      <Reference settedOverlay={settedOverlay} />
      <OverlayRuns overlaid_runs={triples} query={query} />
    </StyledDiv>
  )
}