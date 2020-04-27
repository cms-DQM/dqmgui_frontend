import React from 'react';
import {
  ParamsForApiProps,
  SizeProps,
  PlotDataProps,
} from '../../../../containers/display/interfaces';
import { ZoomedPlot } from './zoomedPlot';
import { ZoomedJSROOTPlot } from './zoomedJSROOTPlot';
import { ZoomedPlotsWrapper } from '../../../styledComponents';

interface ZoomedPlotsProps {
  selected_plots: PlotDataProps[];
  params_for_api: ParamsForApiProps;
  jsroot_mode: boolean;
  size: SizeProps;
}

export const ZoomedPlots = ({
  selected_plots,
  params_for_api,
  jsroot_mode,
  size,
}: ZoomedPlotsProps) => {
  return (
    <ZoomedPlotsWrapper>
      {selected_plots.map((selected_plot: any) => {
        if (jsroot_mode) {
          return (
            <ZoomedJSROOTPlot
              selected_plot={selected_plot}
              params_for_api={params_for_api}
              size={size}
              key={selected_plot.name}
            />
          );
        }
        return (
          <ZoomedPlot
            selected_plot={selected_plot}
            params_for_api={params_for_api}
            size={size}
            key={selected_plot.name}
          />
        );
      })}
    </ZoomedPlotsWrapper>
  );
};
