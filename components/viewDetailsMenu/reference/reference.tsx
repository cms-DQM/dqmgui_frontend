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
import { OverlayPosition } from './overlayPosition';
import { OverlayRuns } from './overlayPlotsWithDifferentRunsAndDatasets/overlayRuns';
import FormItem from 'antd/lib/form/FormItem';
import { store } from '../../../contexts/leftSideContext';

interface ReferenceProps extends ReferenceWithOverlaidRuns {
  setNormalize(value: string): void;
  setPosition(value: string): void;
  setStats(value: string): void;
}

interface ReferenceWithOverlaidRuns {
  normalize: string;
  position: string;
  stats: string;
}

export const Reference = ({ setNormalize, setPosition, setStats, normalize, position, stats }: ReferenceProps) => {
  const [checked, setChecked] = useState(normalize === 'True' ? true : false);
  const [checkedStats, setCheckedStats] = useState(stats === '0' ? false : true);

  useEffect(() => {
    const normalize_value = checked ? 'True' : 'False';
    setChecked(normalize === 'True' ? true : false)
    setNormalize(normalize_value);

    const stats_value = checkedStats ? '' : '0';
    setCheckedStats(stats === '0' ? false : true)
    setStats(stats_value);
  }, []);

  useEffect(() => {
    const value = checked ? 'True' : 'False';
    setNormalize(value);
  }, [checked]);

  useEffect(() => {
    const value = checkedStats ? '' : '0';
    setStats(value);
  }, [checkedStats]);


  return (
    <CustomRow>
      <CustomCol space={'2'}></CustomCol>
      <CustomCol space={'2'}>
      </CustomCol>
      <CustomCol space={'2'}>
        <FormItem name="OverlayPosition" label="Position:">
          <OverlayPosition setPosition={setPosition} position={position} />
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

export const ReferenceWithOverlaidRuns = () => {
  const globalState = useContext(store);
  const { triples, setNormalize, setStats, setOverlaiPosition, normalize, stats, overlayPosition } = globalState;
  const router = useRouter();
  const query: QueryProps = router.query;

  return (
    <StyledDiv>
      <Reference
        normalize={normalize}
        stats={stats}
        position={overlayPosition}
        setNormalize={setNormalize}
        setPosition={setOverlaiPosition}
        setStats={setStats}
      />
      <OverlayRuns overlaid_runs={triples} query={query} />
    </StyledDiv>
  )
}