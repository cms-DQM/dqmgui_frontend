import React, { useContext } from 'react';
import {
  PlotDataProps,
  QueryProps,
} from '../../../../containers/display/interfaces';
import { ZoomedOverlaidPlot } from './zoomedOverlaidPlot';
import { ZoomedOverlaidJSROOTPlot } from './zoomedOverlaidJSROOTPlot';
import { ZoomedPlotsWrapper } from '../../../styledComponents';
import { FormatParamsForAPI } from '../../plot/singlePlot/utils';
import { store } from '../../../../contexts/rightSideContext';
import { useRouter } from 'next/router';

interface ZoomedPlotsProps {
  selected_plots: PlotDataProps[];
}

export const ZoomedPlots = ({ selected_plots }: ZoomedPlotsProps) => {
  const globalState = useContext(store);
  const router = useRouter();
  const query: QueryProps = router.query;

  return (
    <ZoomedPlotsWrapper>
      {selected_plots.map((selected_plot: PlotDataProps) => {
        const params_for_api = FormatParamsForAPI(
          globalState,
          query,
          selected_plot.name,
          selected_plot.path
        );

        if (globalState.JSROOTmode) {
          return (
            <ZoomedOverlaidJSROOTPlot
              selected_plot={selected_plot}
              params_for_api={params_for_api}
              key={selected_plot.name}
            />
          );
        }
        return (
          <ZoomedOverlaidPlot
            selected_plot={selected_plot}
            params_for_api={params_for_api}
            key={selected_plot.name}
          />
        );
      })}
    </ZoomedPlotsWrapper>
  );
};
