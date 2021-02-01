import React from 'react';

import { ParamsForApiProps } from '../../../../containers/display/interfaces';
import { OnSideOverlaidPlots } from './onSideOverlaidPlots';
import { OverlaidPlotImage } from './overlaidPlotImage';
import { PlotDataProps } from '../../../../containers/display/interfaces';

interface OverlaidPlotProps {
  plot: PlotDataProps;
  selected_plots:PlotDataProps[] ;
  params_for_api: ParamsForApiProps;
  imageRefScrollDown: any;
}

export const OverlaidPlot = ({
  plot,
  selected_plots,
  params_for_api,
  imageRefScrollDown,
}: OverlaidPlotProps) => {
  return (
    <>
      {params_for_api.overlay === 'onSide' ? (
        <OnSideOverlaidPlots
          params_for_api={params_for_api}
          plot={plot}
          selected_plots={selected_plots}
          imageRefScrollDown={imageRefScrollDown}
        />
      ) : (
        <OverlaidPlotImage
          plot={plot}
          params_for_api={params_for_api}
          selected_plots={selected_plots}
          imageRefScrollDown={imageRefScrollDown}
        />
      )}
    </>
  );
};
