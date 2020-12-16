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
  setNormalizeNotGlobally?(value: string): void;
  setPositionNotGlobally?(value: string): void;
}

interface ReferenceWithOverlaidRuns {
  settedOverlay: string;
  normalize_from_query: string;
}

export const Reference = ({ setNormalizeNotGlobally, setPositionNotGlobally, settedOverlay, normalize_from_query }: ReferenceProps) => {
  const globalState = useContext(store);
  const { normalize, setNormalize } = globalState;

  const set_normalize = setNormalizeNotGlobally ? setNormalizeNotGlobally : setNormalize

  const [checked, setChecked] = useState(normalize_from_query === 'True' ? true : false);
  const [checkedStats, setCheckedStats] = useState(settedOverlay  === 'True' ? true : false);

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
      <CustomCol space={'2'}>
        <FormItem>
          <CustomCheckbox
            onClick={async (e: any) => {
              await setCheckedStats(e.target.checked);
            }}
            checked={checkedStats}
          >
            Stats
            </CustomCheckbox>
        </FormItem>
      </CustomCol>
      <Col></Col>
    </CustomRow>
  );
};

export const ReferenceWithOverlaidRuns = ({ settedOverlay, normalize_from_query }: ReferenceWithOverlaidRuns) => {
  const globalState = useContext(store);
  const { triples } = globalState;
  const router = useRouter();
  const query: QueryProps = router.query;
  return (
    <StyledDiv>
      <Reference settedOverlay={settedOverlay} normalize_from_query={normalize_from_query} />
      <OverlayRuns overlaid_runs={triples} query={query} />
    </StyledDiv>
  )
}