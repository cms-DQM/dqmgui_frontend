import React from 'react';

import { ParamsForApiProps } from '../../../../containers/display/interfaces';
import { OnSideOverlaidPlots } from './onSideOverlaidPlots';
import { OverlaidPlotImage } from './overlaidPlotImage';
import { PlotDataProps } from '../../../../containers/display/interfaces';

interface OverlaidPlotProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  isPlotSelected: boolean;
}

export const OverlaidPlot = ({
  plot,
  params_for_api,
  isPlotSelected,
}: OverlaidPlotProps) => {
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
