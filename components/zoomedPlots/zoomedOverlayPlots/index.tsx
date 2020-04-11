import React from 'react';
import { ParamsForApiProps, SizeProps } from '../../../containers/display/interfaces';
import { ZoomedOverlaidPlot } from './zoomedOverlaidPlot';
import { ZoomedOverlaidJSROOTPlot } from './zoomedOverlaidJSROOTPlot';
import {ZoomedPlotsWrapper} from '../../styledComponents'

interface ZoomedPlotsProps {
  selected_plots_name: string[];
  removePlotFromList(plot_name: string | undefined): void;
  params_for_api: ParamsForApiProps;
  jsroot_mode: boolean;
  size: SizeProps;
}

export const ZoomedPlots = ({
  selected_plots_name,
  removePlotFromList,
  params_for_api,
  jsroot_mode,
  size,
}: ZoomedPlotsProps) => {
  return (
    <ZoomedPlotsWrapper>
      {selected_plots_name.map((selected_plot: string) => {
        if (jsroot_mode) {
          return (
            <ZoomedOverlaidJSROOTPlot
              selected_plot_name={selected_plot}
              removePlotFromList={removePlotFromList}
              params_for_api={params_for_api}
              size={size}
            />
          );
        }
        return (
          <ZoomedOverlaidPlot
            selected_plot_name={selected_plot}
            removePlotFromList={removePlotFromList}
            params_for_api={params_for_api}
            size={size}
          />
        );
      })}
    </ZoomedPlotsWrapper>
  );
};
