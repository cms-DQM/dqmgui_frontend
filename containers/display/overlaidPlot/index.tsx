import React from 'react';

import { ParamsForApiProps } from '../interfaces';
import { OnSideOverlaidPlots } from './onSideOverlaidPlots';
import { OverlaidPlotImage } from './overlaidPlotImage';
import { PlotDataProps } from '../interfaces'

interface OverlaidPlotProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  addPlotToList(plot: PlotDataProps): void;
  dispatch: any;
  isPlotSelected: boolean;
  removePlotFromList(plot: PlotDataProps | undefined): void;
}

export const OverlaidPlot = ({
  plot,
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
          plot={plot}
          dispatch={dispatch}
          isPlotSelected={isPlotSelected}
          addPlotToList={addPlotToList}
          removePlotFromList={removePlotFromList}
        />
      ) : (
          <OverlaidPlotImage
            plot={plot}
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
