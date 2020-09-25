import { ParamsForApiProps, TripleProps } from "../../containers/display/interfaces";
import { getRunsWithLumisections, get_customize_params } from "../utils";

export const get_plot_url = (params: ParamsForApiProps) => {
  return `/plotfairy/archive/${getRunsWithLumisections(params)}${params.dataset_name
    }${params.folders_path}/${params.plot_name as string}?${get_customize_params(
      params.customizeProps
    )}${params.stats ? '' : 'showstats=0;'}${params.errorBars ? 'showerrbars=1;' : ''
    };w=${params.width};h=${params.height}`;
};

export const get_plot_with_overlay = (params: ParamsForApiProps) => {
  return `/plotfairy/overlay?${get_customize_params(
    params.customizeProps
  )}ref=${params.overlay};obj=archive/${getRunsWithLumisections(params)}${params.dataset_name
    }${params.folders_path}/${encodeURIComponent(params.plot_name as string)}${params.joined_overlaied_plots_urls
    // joined_overlaied_plots_urls is urls got from get_overlaied_plots_urls
    };${params.stats ? '' : 'showstats=0;'}${params.errorBars ? 'showerrbars=1;' : ''
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
  `/jsrootfairy/archive/${getRunsWithLumisections(params)}${params.dataset_name
  }${params.folders_path}/${encodeURIComponent(
    params.plot_name as string
  )}?jsroot=true;notOlderThan=${params.notOlderThan}`;