import React, { useContext } from 'react';

import {
  QueryProps,
  PlotDataProps,
  PlotsGroupedByLayoutsInterface,
} from '../../../containers/display/interfaces';
import { FormatParamsForAPI } from './singlePlot/utils';
import { Plot } from './singlePlot/plot';
import { OverlaidPlot } from './overlaidPlot';
import { store as leftSideStore } from '../../../contexts/leftSideContext';

interface LeftSidePlotsProps {
  plots: PlotDataProps[];
  selected_plots:PlotDataProps[];
  plots_grouped_by_layouts?: PlotsGroupedByLayoutsInterface;
  query: QueryProps;
}

export const PlotsWithoutLayouts = ({
  plots,
  selected_plots,
  query,
}: LeftSidePlotsProps) => {
  const fullState = useContext(leftSideStore)
  return (
    <>
      {plots.map((plot: PlotDataProps) => {
        const params_for_api = FormatParamsForAPI(
          fullState,
          query,
          encodeURIComponent(plot.name),
          plot.path
        );
        if (plot) {
          return (
            <div key={plot.name} >
              {query.overlay_data ? (
                <OverlaidPlot
                  key={plot.name}
                  plot={plot}
                  params_for_api={params_for_api}
                  selected_plots={selected_plots}
                />
              ) : (
                <Plot
                  plot={plot}
                  params_for_api={params_for_api}
                  key={plot.name}
                  selected_plots={selected_plots}
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
