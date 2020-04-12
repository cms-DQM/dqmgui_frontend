import React from 'react';

import { ParamsForApiProps } from '../interfaces';
import { OnSideOverlaidPlots } from './onSideOverlaidPlots';
import { OverlaidPlotImage } from './overlaidPlotImage';

interface OverlaidPlotProps {
  params_for_api: ParamsForApiProps;
  plot_name: string;
  addPlotToList(plot_name: string): void;
  dispatch: any;
  isPlotSelected: boolean;
}

export const OverlaidPlot = ({
  plot_name,
  params_for_api,
  addPlotToList,
  dispatch,
  isPlotSelected
}: OverlaidPlotProps) => {

  return (
    <>
      {params_for_api.overlay === 'onSide' ?
        <OnSideOverlaidPlots
          params_for_api={params_for_api}
          plot_name={plot_name}
          dispatch={dispatch}
          isPlotSelected={isPlotSelected}
          addPlotToList={addPlotToList}
        />
        :
        <OverlaidPlotImage
          plot_name={plot_name}
          params_for_api={params_for_api}
          dispatch={dispatch}
          isPlotSelected={isPlotSelected}
          addPlotToList={addPlotToList}
        />
      }

    </>
  );
};
