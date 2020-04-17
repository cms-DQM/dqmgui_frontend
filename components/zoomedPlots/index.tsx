import React, { useEffect } from 'react';
import {
  ParamsForApiProps,
  SizeProps,
} from '../../containers/display/interfaces';

import { ZoomedPlots as ZoomedOverlaidPlots } from './zoomedOverlayPlots/';
import { ZoomedPlots as ZoomedPlotsWithoutOverlay } from './zoomedPlots/';
import { DisplayOptionsWrapper } from '../styledComponents';
import { ViewDetailsMenu } from './viewDetails';
import { setJSROOTMode } from '../../reducers/displayFolderOrPlot';

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
}: ZoomedPlotsProps) => {
  useEffect(() => {
    const disableJSROOT = setJSROOTMode(false)(dispatch);
    return disableJSROOT;
  }, []);

  return (
    <>
      {/* <DisplayOptionsWrapper> */}
      <ViewDetailsMenu dispatch={dispatch} jsroot_mode={jsroot_mode} />
      {/* </DisplayOptionsWrapper> */}
      {params_for_api.overlay_plot && params_for_api.overlay_plot.length > 0 ? (
        <ZoomedOverlaidPlots
          selected_plots_name={selected_plots_name}
          removePlotFromList={removePlotFromList}
          params_for_api={params_for_api}
          jsroot_mode={jsroot_mode}
          size={size}
        />
      ) : (
        <ZoomedPlotsWithoutOverlay
          jsroot_mode={jsroot_mode}
          selected_plots_name={selected_plots_name}
          removePlotFromList={removePlotFromList}
          params_for_api={params_for_api}
          size={size}
        />
      )}
    </>
  );
};
