import { getRunsWithLumisections, get_customize_params } from "./utils";
import { LumisectionRequestProps, ParamsForApiProps } from "../containers/display/interfaces";
import { ParametersForApi, PlotProperties } from "../plotsLocalOverlayPageComponents/interfaces";
import { sizes } from "../components/constants";

export const get_folders_and_plots_new_api = (params: ParamsForApiProps) => {
  if (params.plot_search) {
    return `api/v1/archive/${getRunsWithLumisections(params)}${params.dataset_name
      }/${params.folders_path}?search=${params.plot_search}`;
  }
  return `api/v1/archive/${getRunsWithLumisections(params)}${params.dataset_name
    }/${params.folders_path}`;
};
//
export const get_folders_and_plots_new_api_with_live_mode = (
  params: ParamsForApiProps
) => {
  if (params.plot_search) {
    return `api/v1/archive/${getRunsWithLumisections(params)}${params.dataset_name
      }/${params.folders_path}?search=${params.plot_search}&notOlderThan=${params.notOlderThan
      }`;
  }
  return `api/v1/archive/${getRunsWithLumisections(params)}${params.dataset_name
    }/${params.folders_path}?notOlderThan=${params.notOlderThan}`;
};

export const get_run_list_by_search_new_api = (params: ParamsForApiProps) => {
  return `api/v1/samples?run=${params.run_number}&lumi=${params.lumi}&dataset=${params.dataset_name}`;
};
export const get_run_list_by_search_new_api_with_no_older_than = (
  params: ParamsForApiProps
) => {
  return `api/v1/samples?run=${params.run_number}&lumi=${params.lumi}&dataset=${params.dataset_name}&notOlderThan=${params.notOlderThan}`;
};

export const get_plot_with_overlay_new_api = (params: ParametersForApi) => {
  //empty string in order to set &reflabel= in the start of joined_labels string
  const labels: string[] = ['']
  if (params.overlaidSeparately?.plots) {
    const plots_strings = params.overlaidSeparately.plots.map((plot_for_overlay: PlotProperties) => {
      labels.push(plot_for_overlay.label ? plot_for_overlay.label : params.run_number)
      return (`obj=archive/${params.run_number}${params.dataset_name}/${plot_for_overlay.folders_path}/${plot_for_overlay.plot_name}`)
    })
    const joined_plots = plots_strings.join('&')
    const joined_labels = labels.join('&reflabel=')
    const norm = params.normalize
    const stats = params.stats ? '' : 'stats=0'
    const ref = params.overlaidSeparately.ref ? params.overlaidSeparately.ref : 'overlay'
    const error = params.error ? '&showerrbars=1' : ''
    const customization = get_customize_params(params.customizeProps)
    //@ts-ignore
    const height = sizes[params.size].size.h
    //@ts-ignore
    const width = sizes[params.size].size.w

    return `api/v1/render_overlay?obj=archive/${params.run_number}${params.dataset_name}/${params.folders_path}/${params.plot_name}&${joined_plots}&w=${width}&h=${height}&norm=${norm}&${stats}${joined_labels}${error}&${customization}ref=${ref}`
  }
  else {
    return
  }
}

export const getLumisections = (params: LumisectionRequestProps) =>
  `api/v1/samples?run=${params.run_number}&dataset=${params.dataset_name
  }&lumi=${params.lumi}`;

export const get_the_latest_runs = (notOlderThan: number) => {
  return `api/v1/latest_runs?notOlderThan=${notOlderThan}`;
};
