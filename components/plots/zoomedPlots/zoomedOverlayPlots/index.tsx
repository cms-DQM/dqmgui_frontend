import React, { useContext } from 'react';
import {
  PlotDataProps,
  QueryProps,
} from '../../../../containers/display/interfaces';
import { ZoomedOverlaidPlot } from './zoomedOverlaidPlot';
import { ZoomedOverlaidJSROOTPlot } from './zoomedOverlaidJSROOTPlot';
import { ZoomedPlotsWrapper } from '../../../styledComponents';
import { store } from '../../../../contexts/rightSideContext';
import { useRouter } from 'next/router';
import { makeid } from '../../../utils';
import { formTriples } from '../../../viewDetailsMenu/utils';

interface ZoomedPlotsProps {
  selected_plots: PlotDataProps[];
}

export const ZoomedPlots = ({ selected_plots }: ZoomedPlotsProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const { rightSideSize, customise, JSROOTmode } = useContext(store)

  return (
    <ZoomedPlotsWrapper>
      {selected_plots.map((selected_plot: PlotDataProps) => {
        const params_for_api = {
          run_number: query.run_number,
          dataset_name: query.dataset_name,
          lumi: query.lumi,
          folders_path: selected_plot.path,
          overlay: query.overlay,
          overlay_plot: formTriples(query.overlay_data),
          height: rightSideSize.h,
          width: rightSideSize.w,
          customiseProps: customise,
          plot_name: selected_plot.name,
          normalize: query.normalize
        }
        if (JSROOTmode) {
          const id = makeid();
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
