import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import { store } from '../../../contexts/leftSideContext';
import { QueryProps, PlotDataProps } from '../../../containers/display/interfaces';
import { FormatParamsForAPI } from './singlePlot/utils';
import { getSelectedPlots, isPlotSelected } from '../../../containers/display/utils';
import { Plot } from './singlePlot/plot';
import { OverlaidPlot } from './overlaidPlot';

interface LeftSidePlotsProps {
  plot: PlotDataProps;
}

export const LeftSidePlots = ({ plot }: LeftSidePlotsProps) => {

  const globalState = useContext(store)
  const router = useRouter();
  const query: QueryProps = router.query;
  const selectedPlots = query.selected_plots;
  const { imageRefScrollDown } = globalState
  const selected_plots: PlotDataProps[] = getSelectedPlots(selectedPlots);
  const params_for_api = FormatParamsForAPI(globalState, query, plot.name, plot.dir)
  return (
    <>
      {query.overlay_data ? (
        <OverlaidPlot
          key={plot.name}
          plot={plot}
          params_for_api={params_for_api}
          imageRefScrollDown={imageRefScrollDown}
          isPlotSelected={isPlotSelected(
            selected_plots,
            plot.name
          )}
        />
      ) : (
          <Plot
            plot={plot}
            imageRefScrollDown={imageRefScrollDown}
            params_for_api={params_for_api}
            key={plot.name}
            isPlotSelected={isPlotSelected(
              selected_plots,
              plot.name
            )}
          />
        )}
    </>
  );
};
