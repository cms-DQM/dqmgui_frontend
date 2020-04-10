import React from 'react';

import { ParamsForApiProps } from '../interfaces';
import { OnSideOverlaidPlots } from './onSideOverlaidPlots';
import { OverlaidPlotImage } from './overlaidPlotImage';

interface OverlaidPlotProps {
  params_for_api: ParamsForApiProps;
  plot_name: string;
  addPlotToList(plot_name: string): void;
  dispatch: any;
}

export const OverlaidPlot = ({
  plot_name,
  params_for_api,
  addPlotToList,
  dispatch,
}: OverlaidPlotProps) => {

  const dropdownParams: any[] = [
    {
      value: plot_name,
      label: 'Add to list',
      action: () => addPlotToList(plot_name),
    },
  ];

  return (
    <>
      {params_for_api.overlay === 'onSide' ?
        <OnSideOverlaidPlots
          params_for_api={params_for_api}
          plot_name={plot_name}
          dropdownParams={dropdownParams}
          dispatch={dispatch}
        />
        :
        <OverlaidPlotImage
          plot_name={plot_name}
          params_for_api={params_for_api}
          dropdownParams={dropdownParams}
          dispatch={dispatch}
        />
      }

    </>
  );
};
