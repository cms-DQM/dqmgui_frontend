import React, { useEffect } from 'react';
import {
  ParamsForApiProps,
  SizeProps,
  CustomizeProps,
  PlotDataProps,
} from '../../../containers/display/interfaces';

import { ZoomedPlots as ZoomedOverlaidPlots } from './zoomedOverlayPlots';
import { ZoomedPlots as ZoomedPlotsWithoutOverlay } from './zoomedPlots';
import { ViewDetailsMenu } from './viewDetails';
import { setJSROOTMode } from '../../../reducers/displayFolderOrPlot';
import { Row } from 'antd';

interface ZoomedPlotsProps {
  selected_plots: PlotDataProps[];
  params_for_api: ParamsForApiProps;
  jsroot_mode: boolean;
  dispatch: any;
  size: SizeProps;
  customizeProps: CustomizeProps;
}

export const ZoomedPlots = ({
  jsroot_mode,
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
      <Row style={{ width: '100%', height: 30 }}>
        <ViewDetailsMenu dispatch={dispatch} jsroot_mode={jsroot_mode} />
      </Row>
      {params_for_api.overlay_plot && params_for_api.overlay_plot.length > 0 ? (
        <ZoomedOverlaidPlots
          selected_plots={selected_plots}
          params_for_api={params_for_api}
          jsroot_mode={jsroot_mode}
          size={size}
        />
      ) : (
          <ZoomedPlotsWithoutOverlay
            jsroot_mode={jsroot_mode}
            selected_plots={selected_plots}
            params_for_api={params_for_api}
            size={size}
          />
        )}
    </>
  );
};
