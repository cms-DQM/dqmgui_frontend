import React from 'react';

import { ParamsForApiProps } from '../../containers/display/interfaces';

import { ZoomedPlots as ZoomedOverlaidPlots } from './zoomedOverlayPlots/';
import { ZoomedPlots as ZoomedPlotsWithoutOverlay } from './zoomedPlots/';
interface ZoomedPlotsProps {
  selected_plots_name: string[];
  removePlotFromList(plot_name: string | undefined): void;
  params_for_api: ParamsForApiProps;
  jsroot_mode: boolean;
}

export const ZoomedPlots = ({
  jsroot_mode,
  removePlotFromList,
  params_for_api,
  selected_plots_name,
}: ZoomedPlotsProps) => {
  if (params_for_api.overlay_plot && params_for_api.overlay_plot.length > 0) {
    return (
      <ZoomedOverlaidPlots
        selected_plots_name={selected_plots_name}
        removePlotFromList={removePlotFromList}
        params_for_api={params_for_api}
        jsroot_mode={jsroot_mode}
      />
    );
  }
  return (
    <ZoomedPlotsWithoutOverlay
      jsroot_mode={jsroot_mode}
      selected_plots_name={selected_plots_name}
      removePlotFromList={removePlotFromList}
      params_for_api={params_for_api}
    />
  );
};
