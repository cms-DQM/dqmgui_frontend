import { getPathName } from '../components/utils';
import {
  ParamsForApiProps,
  TripleProps,
  LumisectionRequestProps,
} from '../containers/display/interfaces';
import { get_customize_params, getRunsWithLumisections } from './utils';

const config: any = {
  development: {
    root_url: 'http://localhost:8086/',
    title: 'Development',
  },
  production: {
    // root_url: `https://dqm-gui.web.cern.ch/api/dqm/offline/`,
    root_url: `${getPathName()}`,
    title: 'Online',
  },
};

const new_env_variable = process.env.NEW_BACK_END === 'true';
const layout_env_variable = process.env.LAYOUTS === 'true';
const latest_runs_env_variable = process.env.LATEST_RUNS === 'true';
const lumis_env_variable = process.env.LUMIS === 'true';

export const functions_config: any = {
  new_back_end: {
    new_back_end: new_env_variable || false,
    lumisections_on: (lumis_env_variable && new_env_variable) || false,
    layouts: (layout_env_variable && new_env_variable) || false,
    latest_runs: (latest_runs_env_variable && new_env_variable) || false,
  },
  mode: process.env.MODE || 'OFFLINE',
};

export const root_url = config[process.env.NODE_ENV || 'development'].root_url;
export const mode = config[process.env.NODE_ENV || 'development'].title;

export const service_title =
  config[process.env.NODE_ENV || 'development'].title;

export const get_folders_and_plots_new_api = (params: ParamsForApiProps) => {
  if (params.plot_search) {
    return `api/v1/archive/${getRunsWithLumisections(params)}${
      params.dataset_name
    }/${params.folders_path}?search=${params.plot_search}`;
  }
  return `api/v1/archive/${getRunsWithLumisections(params)}${
    params.dataset_name
  }/${params.folders_path}`;
};
export const get_folders_and_plots_new_api_with_live_mode = (
  params: ParamsForApiProps
) => {
  if (params.plot_search) {
    return `api/v1/archive/${getRunsWithLumisections(params)}${
      params.dataset_name
    }/${params.folders_path}?search=${params.plot_search}&notOlderThan=${
      params.notOlderThan
    }`;
  }
  return `api/v1/archive/${getRunsWithLumisections(params)}${
    params.dataset_name
  }/${params.folders_path}?notOlderThan=${params.notOlderThan}`;
};

export const get_folders_and_plots_old_api = (params: ParamsForApiProps) => {
  if (params.plot_search) {
    return `data/json/archive/${params.run_number}${params.dataset_name}/${params.folders_path}?search=${params.plot_search}`;
  }
  return `data/json/archive/${params.run_number}${params.dataset_name}/${params.folders_path}`;
};

export const get_run_list_by_search_old_api = (params: ParamsForApiProps) => {
  return `data/json/samples?match=${params.dataset_name}&run=${params.run_number}`;
};
export const get_run_list_by_search_new_api = (params: ParamsForApiProps) => {
  return `api/v1/samples?run=${params.run_number}&lumi=${params.lumi}&dataset=${params.dataset_name}`;
};
export const get_run_list_by_search_new_api_with_no_older_than = (
  params: ParamsForApiProps
) => {
  return `api/v1/samples?run=${params.run_number}&lumi=${params.lumi}&dataset=${params.dataset_name}&notOlderThan=${params.notOlderThan}`;
};
export const get_plot_url = (params: ParamsForApiProps) => {
  return `plotfairy/archive/${getRunsWithLumisections(params)}${
    params.dataset_name
  }${params.folders_path}/${params.plot_name as string}?${get_customize_params(
    params.customizeProps
  )}${params.stats ? '' : 'showstats=0;'}${
    params.errorBars ? 'showerrbars=1;' : ''
  };w=${params.width};h=${params.height}`;
};

export const get_plot_with_overlay = (params: ParamsForApiProps) => {
  return `plotfairy/overlay?${get_customize_params(params.customizeProps)}ref=${
    params.overlay
  };obj=archive/${getRunsWithLumisections(params)}${params.dataset_name}${
    params.folders_path
  }/${encodeURIComponent(params.plot_name as string)}${
    params.joined_overlaied_plots_urls
  };${params.stats ? '' : 'showstats=0;'}${
    params.errorBars ? 'showerrbars=1;' : ''
  }norm=${params.normalize};w=${params.width};h=${params.height}`;
};

export const get_overlaied_plots_urls = (params: ParamsForApiProps) => {
  const overlay_plots =
    params?.overlay_plot && params?.overlay_plot.length > 0
      ? params.overlay_plot
      : [];

  return overlay_plots.map((overlay: TripleProps) => {
    const dataset_name_overlay = overlay.dataset_name
      ? overlay.dataset_name
      : params.dataset_name;
    const label = overlay.label ? overlay.label : overlay.run_number;
    return `;obj=archive/${getRunsWithLumisections(
      overlay
    )}${dataset_name_overlay}${params.folders_path}/${encodeURIComponent(
      params.plot_name as string
    )};reflabel=${label}`;
  });
};

export const get_jroot_plot = (params: ParamsForApiProps) =>
  `jsrootfairy/archive/${getRunsWithLumisections(params)}${
    params.dataset_name
  }${params.folders_path}/${encodeURIComponent(
    params.plot_name as string
  )}?jsroot=true;notOlderThan=${params.notOlderThan}`;

export const getLumisections = (params: LumisectionRequestProps) =>
  `api/v1/samples?run=${params.run_number}&dataset=${
    params.dataset_name
  }&lumi=${params.lumi}${
    functions_config.mode === 'ONLINE' && params.notOlderThan
      ? `&notOlderThan=${params.notOlderThan}`
      : ''
  }`;

export const get_the_latest_runs = (notOlderThan: number) => {
  return `api/v1/latest_runs?notOlderThan=${notOlderThan}`;
};
