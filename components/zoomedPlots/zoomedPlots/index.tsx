import React from 'react';
import { ParamsForApiProps } from '../../../containers/display/interfaces';
import { ZoomedPlot } from './zoomedPlot';
import { ZoomedJSROOTPlot } from './zoomedJSROOTPlot';

interface ZoomedPlotsProps {
  selected_plots_name: string[];
  removePlotFromList(plot_name: string | undefined): void;
  params_for_api: ParamsForApiProps;
  jsroot_mode: boolean;
}

export const ZoomedPlots = ({
  selected_plots_name,
  removePlotFromList,
  params_for_api,
  jsroot_mode,
}: ZoomedPlotsProps) => {
  return (
    <div>
      {selected_plots_name.map((selected_plot: string) => {
        if (jsroot_mode) {
          return (
            <ZoomedJSROOTPlot
              selected_plot_name={selected_plot}
              removePlotFromList={removePlotFromList}
              params_for_api={params_for_api}
            />
          );
        }
        return (
          <ZoomedPlot
            selected_plot_name={selected_plot}
            removePlotFromList={removePlotFromList}
            params_for_api={params_for_api}
          />
        );
      })}
    </div>
  );
};
