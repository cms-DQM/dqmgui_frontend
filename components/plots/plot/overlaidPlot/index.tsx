import React, { useContext } from 'react';

import { QueryProps, ParamsForApiProps } from '../../../../containers/display/interfaces';
import { OnSideOverlaidPlots } from './onSideOverlaidPlots';
import { OverlaidPlotImage } from './overlaidPlotImage';
import { PlotDataProps } from '../../../../containers/display/interfaces';
import { store } from '../../../../contexts/leftSideContext';
import { useRouter } from 'next/router';
import { FormatParamsForAPI } from '../singlePlot/utils';

interface OverlaidPlotProps {
  plot: PlotDataProps;
  isPlotSelected: boolean;
  params_for_api: ParamsForApiProps
}

export const OverlaidPlot = ({
  plot,
  isPlotSelected,
  params_for_api,
}: OverlaidPlotProps) => {
  
  const globalState = useContext(store)
  const router = useRouter();
  const query: QueryProps = router.query;

  return (
    <>
      {params_for_api.overlay === 'onSide' ? (
        <OnSideOverlaidPlots
          params_for_api={params_for_api}
          plot={plot}
          isPlotSelected={isPlotSelected}
        />
      ) : (
        <OverlaidPlotImage
          plot={plot}
          params_for_api={params_for_api}
          isPlotSelected={isPlotSelected}
        />
      )}
    </>
  );
};
