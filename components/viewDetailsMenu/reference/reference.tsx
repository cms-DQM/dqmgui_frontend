import React, { useEffect, useState } from 'react';
import { Col } from 'antd';

import { QueryProps, TripleProps } from '../../../containers/display/interfaces';
import {
  StyledDiv,
  CustomRow,
  CustomCol,
} from '../../styledComponents';
import { useRouter } from 'next/router';
import { OverlayOptions } from './overlayOptions';
import { OverlayRuns } from './overlayRuns';
import FormItem from 'antd/lib/form/FormItem';
import { Grid } from '../../../plotsLocalOverlayPageComponents/styledComponents';
import { CheckBox } from '../../../plotsLocalOverlayPageComponents/options/checkBox';
import { useChangeRouter } from '../../../hooks/useChangeRouter';

interface ReferenceProps {
  normalize: boolean;
  setNormalize(normalize: boolean): void;
  stats: boolean;
  setStats(stats: boolean): void;
  error: boolean;
  setError(error: boolean): void;
  triples: TripleProps[]
  setOverlaiPosition(overlaidPosition: string): void;
  overlayPosition: string;
}

export const Reference = ({
  normalize,
  setNormalize,
  stats,
  setStats,
  error,
  setError,
  overlayPosition,
  setOverlaiPosition,
  triples }: ReferenceProps) => {

  const router = useRouter();
  const query: QueryProps = router.query;

  const checkBoxes = [{
    label: 'Normalize',
    value: query.normalize  === 'true' ? true : false
  },
  {
    label: 'Stats',
    value: query.stats  === 'true' ? true : false
  },
  {
    label: 'Error',
    value: query.error === 'true' ? true : false
  }]

  const [reference, setReference] = React.useState({
    [checkBoxes[0].label.toLocaleLowerCase()]: checkBoxes[0].value,
    [checkBoxes[1].label.toLocaleLowerCase()]: checkBoxes[1].value,
    [checkBoxes[2].label.toLocaleLowerCase()]: checkBoxes[2].value,
  })

  useEffect(() => {
    setNormalize(reference[checkBoxes[0].label.toLocaleLowerCase()]),
      setStats(reference[checkBoxes[1].label.toLocaleLowerCase()]),
      setError(reference[checkBoxes[2].label.toLocaleLowerCase()])
  }, [reference[checkBoxes[0].label.toLocaleLowerCase()],
  reference[checkBoxes[1].label.toLocaleLowerCase()],
  reference[checkBoxes[2].label.toLocaleLowerCase()]])

  useChangeRouter(
    {
      overlay: overlayPosition,
      error: error,
      stats: stats,
      normalize: normalize
    },
    [normalize, stats, error, overlayPosition], true);

  return (
    <StyledDiv>
      <CustomRow>
        <CustomCol space={'2'}></CustomCol>
        <CustomCol space={'2'}>
          <FormItem name="OverlayPosition" label="Position:">
            <OverlayOptions
              setOverlaiPosition={setOverlaiPosition}
              overlayPosition={overlayPosition}
            />
          </FormItem>
        </CustomCol>
        {checkBoxes.map((checkBox) =>
          <CustomCol space={'2'}>
            <Grid space={'2'} key={checkBox.label}>
              <CheckBox option={checkBox}
                setReference={setReference}
                reference={reference}
              /></Grid>
          </CustomCol>)}
        <Col></Col>
      </CustomRow>
      <OverlayRuns overlaid_runs={triples} query={query} />
    </StyledDiv>
  );
};
