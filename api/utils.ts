import {
  ParamsForApiProps,
  TripleProps,
} from '../containers/display/interfaces';
import { functions_config } from '../config/config';
import { ParametersForApi } from '../plotsLocalOverlayPageComponents/interfaces';
import { get_plot_url_new_api, get_plot_with_overlay_new_api, get_the_latest_runs, get_the_latest_runs_live_mode } from './newApi';
import { get_plot_url, get_plot_with_overlay } from './oldApi';

export const get_customise_params = (params = {} as any) => {
  const xtype = params.xtype ? `xtype=${params.xtype};` : '';
  const xmin = params.xmin ? `xmin=${params.xmin};` : '';
  const xmax = params.xmax ? `xmax=${params.xmax};` : '';

  const ytype = params.ytype ? `ytype=${params.ytype};` : '';
  const ymin = params.ymin ? `ymin=${params.ymin};` : '';
  const ymax = params.ymax ? `ymax=${params.ymax};` : '';

  const ztype = params.ztype ? `ztype=${params.ztype};` : '';
  const zmin = params.zmin ? `zmin=${params.zmin};` : '';
  const zmax = params.zmax ? `zmax=${params.zmax};` : '';

  const drawopts = params.drawopts ? `drawopts=${params.drawopts};` : '';
  const withref = params.withref ? `withref=${params.withref};` : '';
  const parameters = `${xtype}${xmin}${xmax}${ytype}${ymin}${ymax}${ztype}${zmin}${zmax}${drawopts}${withref}`;

  return parameters ? parameters : '';
};

export const getRunsWithLumisections = (
  params: ParamsForApiProps | TripleProps
) => {
  const lumisectionValue =
    params.lumi === -1 || !functions_config.new_back_end.lumisections_on
      ? undefined
      : params.lumi;
  const lumisectionParameter = lumisectionValue
    ? `${params.run_number}:${lumisectionValue}`
    : params.run_number;

  return lumisectionParameter;
};

export const getRunsWithLumisectionsForOverlaidPlots = (
  params: TripleProps
) => {
  const lumisectionValue = params.lumi === -1 ? undefined : params.lumi;
  const lumisectionParameter = lumisectionValue
    ? `${params.run_number}:${lumisectionValue}`
    : params.run_number;

  return lumisectionParameter;
};


export const chooseApiForGettingPlotUrl = (parameters: ParametersForApi | ParamsForApiProps) => (
  functions_config.new_back_end.new_back_end ?
    get_plot_url_new_api(parameters) :
    get_plot_url(parameters)
)

export const chooseApiForGettingOverlaidPlotsUrl = (parameters: any) => (
  functions_config.new_back_end.new_back_end ?
    get_plot_with_overlay_new_api(parameters) :
    get_plot_with_overlay(parameters)
)
export const chooseApiForGettingTheLatestRuns = (parameters: any) => (
  functions_config.mode === 'ONLINE' ?
    get_the_latest_runs_live_mode(parameters) :
    get_the_latest_runs()
)