import React from 'react';
import {
  ParamsForApiProps,
  SizeProps,
  PlotDataProps,
} from '../../../containers/display/interfaces';
import { ZoomedOverlaidPlot } from './zoomedOverlaidPlot';
import { ZoomedOverlaidJSROOTPlot } from './zoomedOverlaidJSROOTPlot';
import { ZoomedPlotsWrapper } from '../../styledComponents';

interface ZoomedPlotsProps {
  selected_plots: PlotDataProps[];
  removePlotFromList(plot: PlotDataProps | undefined): void;
  params_for_api: ParamsForApiProps;
  jsroot_mode: boolean;
  size: SizeProps;
}

export const ZoomedPlots = ({
  selected_plots,
  removePlotFromList,
  params_for_api,
  jsroot_mode,
  size,
}: ZoomedPlotsProps) => {

  return (
    <ZoomedPlotsWrapper>
      {selected_plots.map((selected_plot: PlotDataProps) => {
        if (jsroot_mode) {
          return (
            <ZoomedOverlaidJSROOTPlot
              selected_plot={selected_plot}
              removePlotFromList={removePlotFromList}
              params_for_api={params_for_api}
              size={size}
            />
          );
        }
        return (
          <ZoomedOverlaidPlot
            selected_plot={selected_plot}
            removePlotFromList={removePlotFromList}
            params_for_api={params_for_api}
            size={size}
          />
        );
      })}
    </ZoomedPlotsWrapper>
  );
};
