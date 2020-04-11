import React from 'react';
import { ParamsForApiProps, SizeProps } from '../../containers/display/interfaces';

import { ZoomedPlots as ZoomedOverlaidPlots } from './zoomedOverlayPlots/';
import { ZoomedPlots as ZoomedPlotsWithoutOverlay } from './zoomedPlots/';
import { SizeChanger } from '../sizeChanger';
import { setZoomedPlotSize } from '../../reducers/displayFolderOrPlot';
import { sizes } from '../constants';

interface ZoomedPlotsProps {
  selected_plots_name: string[];
  removePlotFromList(plot_name: string | undefined): void;
  params_for_api: ParamsForApiProps;
  jsroot_mode: boolean;
  dispatch: any;
  size: SizeProps;
}

export const ZoomedPlots = ({
  jsroot_mode,
  removePlotFromList,
  params_for_api,
  selected_plots_name,
  dispatch,
  size,
}: ZoomedPlotsProps) =>
  <>
    <SizeChanger dispatch={dispatch} setSize={setZoomedPlotSize} currentValue={sizes.fill.size}/>
    {
      params_for_api.overlay_plot && params_for_api.overlay_plot.length > 0 ?
        <ZoomedOverlaidPlots
          selected_plots_name={selected_plots_name}
          removePlotFromList={removePlotFromList}
          params_for_api={params_for_api}
          jsroot_mode={jsroot_mode}
          size={size}
        />
        :
        <ZoomedPlotsWithoutOverlay
          jsroot_mode={jsroot_mode}
          selected_plots_name={selected_plots_name}
          removePlotFromList={removePlotFromList}
          params_for_api={params_for_api}
          size={size}
        />
    }
  </>

