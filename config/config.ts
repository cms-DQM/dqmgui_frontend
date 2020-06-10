import {
  ParamsForApiProps,
  TripleProps,
} from '../containers/display/interfaces';
import { get_customize_params } from './utils';

const config: any = {
  development: {
    root_url: 'http://localhost:8081/dqm/dev',
  },
  production: {
    root_url: 'https://dqm-gui.web.cern.ch/api/dqm/offline',
  },
};
export const root_url = config[process.env.NODE_ENV || 'development'].root_url;

export const get_plot_url = (params: ParamsForApiProps) => {
  return `/plotfairy/archive/${params.run_number}${params.dataset_name}${
    params.folders_path
  }/${params.plot_name}?${get_customize_params(params.customizeProps)}${
    params.stats ? '' : 'showstats=0;'
  }${params.errorBars ? 'showerrbars=1;' : ''};w=${params.width};h=${
    params.height
  }`;
};

export const get_plot_with_overlay = (params: ParamsForApiProps) => {
  return `/plotfairy/overlay?${get_customize_params(
    params.customizeProps
  )}ref=${params.overlay};obj=archive/${params.run_number}${
    params.dataset_name
  }${params.folders_path}/${params.plot_name}${
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
    const run_number_overlay = overlay.run_number;
    const label = overlay.label ? overlay.label : overlay.run_number;
    return `;obj=archive/${run_number_overlay}${dataset_name_overlay}${params.folders_path}/${params.plot_name};reflabel=${label}`;
  });
};

export const get_jroot_plot = (params: ParamsForApiProps) =>
  `/jsrootfairy/archive/${params.run_number}/${params.dataset_name}${params.folders_path}/${params.plot_name}?jsroot=true`;
