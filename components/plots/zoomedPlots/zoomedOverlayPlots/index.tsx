import React, { useContext } from 'react';
import {
  PlotDataProps,
  QueryProps,
} from '../../../../containers/display/interfaces';
import { ZoomedOverlaidPlot } from './zoomedOverlaidPlot';
import { ZoomedOverlaidJSROOTPlot } from './zoomedOverlaidJSROOTPlot';
import { ZoomedPlotsWrapper } from '../../../styledComponents';
import { FormatParamsForAPI } from '../../plot/singlePlot/utils';
import { store } from '../../../../contexts/leftSideContext';
import { useRouter } from 'next/router';
import { makeid } from '../../../utils';

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
          selected_plot.path,
          true
        );
        if (globalState.JSROOTmode) {
          const id = makeid()
          return (
            <ZoomedOverlaidJSROOTPlot
              selected_plot={selected_plot}
              params_for_api={params_for_api}
              key={selected_plot.name}
              id={id}
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
