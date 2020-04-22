import React, { useEffect } from 'react';
import {
  ParamsForApiProps,
  SizeProps,
  CustomizeProps,
  PlotDataProps,
} from '../../containers/display/interfaces';

import { ZoomedPlots as ZoomedOverlaidPlots } from './zoomedOverlayPlots/';
import { ZoomedPlots as ZoomedPlotsWithoutOverlay } from './zoomedPlots/';
import { DisplayOptionsWrapper } from '../styledComponents';
import { ViewDetailsMenu } from './viewDetails';
import { setJSROOTMode } from '../../reducers/displayFolderOrPlot';

interface ZoomedPlotsProps {
  selected_plots: PlotDataProps[];
  removePlotFromList(plot: PlotDataProps | undefined): void;
  params_for_api: ParamsForApiProps;
  jsroot_mode: boolean;
  dispatch: any;
  size: SizeProps;
  customizeProps: CustomizeProps;
}

export const ZoomedPlots = ({
  jsroot_mode,
  removePlotFromList,
  params_for_api,
  selected_plots,
  dispatch,
  size,
  customizeProps,
}: ZoomedPlotsProps) => {
  useEffect(() => {
    const disableJSROOT = setJSROOTMode(false)(dispatch);
    return disableJSROOT;
  }, []);

  params_for_api.customizeProps = customizeProps;

  return (
    <>
      <ViewDetailsMenu dispatch={dispatch} jsroot_mode={jsroot_mode} />
      {params_for_api.overlay_plot && params_for_api.overlay_plot.length > 0 ? (
        <ZoomedOverlaidPlots
          selected_plots={selected_plots}
          removePlotFromList={removePlotFromList}
          params_for_api={params_for_api}
          jsroot_mode={jsroot_mode}
          size={size}
        />
      ) : (
          <ZoomedPlotsWithoutOverlay
            jsroot_mode={jsroot_mode}
            selected_plots={selected_plots}
            removePlotFromList={removePlotFromList}
            params_for_api={params_for_api}
            size={size}
          />
        )}
    </>
  );
};
