import { getRunsWithLumisections, get_customise_params } from "./utils";
import { LumisectionRequestProps, ParamsForApiProps } from "../containers/display/interfaces";
import { ParametersForApi, PlotProperties } from "../plotsLocalOverlayPageComponents/interfaces";
import { newApi } from "./paramtersParser";

export const get_folders_and_plots_new_api = (params: ParamsForApiProps) => {
  if (params.plot_search) {
    return `api/v1/archive/${getRunsWithLumisections(params)}${params.dataset_name
      }/${params.folders_path}?search=${params.plot_search}`;
  }
  return `api/v1/archive/${getRunsWithLumisections(params)}${params.dataset_name
    }/${params.folders_path}`;
};

export const get_plot_url_new_api = (params: ParamsForApiProps & ParametersForApi & any) => {
  const { errorBars, height, norm, stats, width} = newApi(params)

  return `plotfairy/archive/${getRunsWithLumisections(params)}${params.dataset_name
    }/${params.folders_path}/${params.plot_name as string}?${get_customise_params(
      params.customiseProps
    )}${stats};${errorBars};${width};${height}`;
};

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

export const get_plots_with_overlay_new_api = (params: ParametersForApi) => {
  //empty string in order to set &reflabel= in the start of joined_labels string
  const labels: string[] = ['']
  if (params.overlaidSeparately?.plots) {
    const plots_strings = params.overlaidSeparately.plots.map((plot_for_overlay: PlotProperties) => {
      labels.push(plot_for_overlay.label ? plot_for_overlay.label : params.run_number)
      return (`obj=archive/${params.run_number}${params.dataset_name}/${plot_for_overlay.folders_path}/${plot_for_overlay.plot_name}`)
    })
    const { errorBars, height, norm, stats, width} = newApi(params)
    const joined_plots = plots_strings.join('&')
    const joined_labels = labels.join('&reflabel=')
    const ref = params.overlaidSeparately.ref ? params.overlaidSeparately.ref : 'overlay'
    const customization = get_customise_params(params.customiseProps)

    return `api/v1/render_overlay?obj=archive/${params.run_number}${params.dataset_name}/${params.folders_path}/${params.plot_name}&${joined_plots}&${width}&${height}&${norm}&${stats}${joined_labels}&${errorBars}&${customization}ref=${ref}`
  }
  else {
    return
  }
}

export const get_plot_with_overlay_new_api = (params: ParamsForApiProps) => {
  const { errorBars, height, norm, stats, width} = newApi(params as any)
  return `plotfairy/overlay?${get_customise_params(params.customiseProps)}ref=${params.overlay
    };obj=archive/${getRunsWithLumisections(params)}${params.dataset_name}/${params.folders_path
    }/${params.plot_name}${params.joined_overlaied_plots_urls
    };${stats};${errorBars};${norm};${width};${height}`;
};

export const getLumisections = (params: LumisectionRequestProps) =>
  `api/v1/samples?run=${params.run_number}&dataset=${params.dataset_name
  }&lumi=${params.lumi}`;

export const get_the_latest_runs = (notOlderThan: number) => {
  return `api/v1/latest_runs?notOlderThan=${notOlderThan}`;
};
