import React, { useState, useEffect } from 'react';

import { functions_config } from '../../../config/config';
import {
  QueryProps,
  PlotDataProps,
  PlotsGroupedByLayoutsInterface,
} from '../../../containers/display/interfaces';
import { FormatParamsForAPI } from './singlePlot/utils';
import { isPlotSelected } from '../../../containers/display/utils';
import { Plot } from './singlePlot/plot';
import { OverlaidPlot } from './overlaidPlot';

interface LeftSidePlotsProps {
  plots: PlotDataProps[];
  selected_plots: any;
  plots_grouped_by_layouts?: PlotsGroupedByLayoutsInterface;
  query: QueryProps;
  imageRefScrollDown: any;
  globalState: any;
}

export const PlotsWithoutLayouts = ({ plots, selected_plots, globalState, imageRefScrollDown, query }: LeftSidePlotsProps) => {

  return (
    <>
      {plots.map((plot: PlotDataProps) => {
        const params_for_api = FormatParamsForAPI(
          globalState,
          query,
          encodeURI(plot.name),
          plot.path
        );
        if (plot) {
          return (
            <div key={plot.name}>
              {query.overlay_data ? (
                <OverlaidPlot
                  key={plot.name}
                  plot={plot}
                  params_for_api={params_for_api}
                  imageRefScrollDown={imageRefScrollDown}
                  isPlotSelected={isPlotSelected(selected_plots, plot.name)}
                />
              ) : (
                  <Plot
                    plot={plot}
                    imageRefScrollDown={imageRefScrollDown}
                    params_for_api={params_for_api}
                    key={plot.name}
                    isPlotSelected={isPlotSelected(selected_plots, plot.name)}
                  />
                )}
            </div>
          );
        }
        return <></>;
      })}
    </>
  );
};
