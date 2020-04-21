import React from 'react';

import { ParamsForApiProps } from '../../../containers/display/interfaces';
import { OnSideOverlaidPlots } from './onSideOverlaidPlots';
import { OverlaidPlotImage } from './overlaidPlotImage';

interface OverlaidPlotProps {
  params_for_api: ParamsForApiProps;
  plot_name: string;
  addPlotToList(plot_name: string): void;
  dispatch: any;
  isPlotSelected: boolean;
  removePlotFromList(plot_name: string | undefined): void;
}

export const OverlaidPlot = ({
  plot_name,
  params_for_api,
  addPlotToList,
  dispatch,
  isPlotSelected,
  removePlotFromList,
}: OverlaidPlotProps) => {
  return (
    <>
      {params_for_api.overlay === 'onSide' ? (
        <OnSideOverlaidPlots
          params_for_api={params_for_api}
          plot_name={plot_name}
          dispatch={dispatch}
          isPlotSelected={isPlotSelected}
          addPlotToList={addPlotToList}
          removePlotFromList={removePlotFromList}
        />
      ) : (
        <OverlaidPlotImage
          plot_name={plot_name}
          params_for_api={params_for_api}
          dispatch={dispatch}
          isPlotSelected={isPlotSelected}
          addPlotToList={addPlotToList}
          removePlotFromList={removePlotFromList}
        />
      )}
    </>
  );
};
