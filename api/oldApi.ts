import { getRunsWithLumisections, get_customize_params } from "./utils";
import { ParamsForApiProps, TripleProps } from "../containers/display/interfaces";
import { ParametersForApi } from "../plotsLocalOverlayPageComponents/interfaces";
import { oldApi } from "./paramtersParser";

export const get_folders_and_plots_old_api = (params: ParamsForApiProps) => {
    if (params.plot_search) {
      return `data/json/archive/${params.run_number}${params.dataset_name}/${params.folders_path}?search=${params.plot_search}`;
    }
    return `data/json/archive/${params.run_number}${params.dataset_name}/${params.folders_path}`;
  };
  
  export const get_run_list_by_search_old_api = (params: ParamsForApiProps) => {
    return `data/json/samples?match=${params.dataset_name}&run=${params.run_number}`;
  };
  
  export const get_plot_url = (params: ParamsForApiProps & ParametersForApi & any) => {
    const { errorBars, height, norm, stats, width} = oldApi(params)

    return `plotfairy/archive/${getRunsWithLumisections(params)}${params.dataset_name
      }/${params.folders_path}/${params.plot_name as string}?${get_customize_params(
        params.customizeProps
      )}${norm};${stats};${errorBars};${width};${height}`;
  };
  
  export const get_plot_with_overlay = (params: ParamsForApiProps) => {
    const { errorBars, height, norm, stats, width} = oldApi(params as any)

    return `plotfairy/overlay?${get_customize_params(params.customizeProps)}ref=${params.overlay
      };obj=archive/${getRunsWithLumisections(params)}${params.dataset_name}/${params.folders_path
      }/${params.plot_name}${params.joined_overlaied_plots_urls
      };${stats};${errorBars};${norm};${width};${height}`;
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
      )}${dataset_name_overlay}/${params.folders_path}/${
        params.plot_name};reflabel=${label}`;
    });
  };
  
  export const get_jroot_plot = (params: ParamsForApiProps) =>
    `jsrootfairy/archive/${getRunsWithLumisections(params)}${params.dataset_name
    }/${params.folders_path}/${
      params.plot_name as string
    }?jsroot=true;${params.notOlderThan ? `notOlderThan=${params.notOlderThan}` : ''}`;
  
  