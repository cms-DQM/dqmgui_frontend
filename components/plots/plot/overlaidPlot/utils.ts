import {
  ParamsForApiProps,
  TripleProps,
} from '../../../../containers/display/interfaces';
import { functions_config, get_overlaied_plots_urls, get_plot_url, get_plot_with_overlay_new_api, get_plot_with_overlay_old_api } from '../../../../config/config';

export const getOnSideOverlaidPlots = (params_for_api: ParamsForApiProps) => {
  const onsidePlotsURLs = [];

  let copy = { ...params_for_api };

  onsidePlotsURLs.push(get_plot_url(copy));

  copy.overlay_plot &&
    copy.overlay_plot.map((plot: TripleProps) => {
      copy.dataset_name = plot.dataset_name
        ? (plot.dataset_name as string)
        : params_for_api.dataset_name;
      copy.run_number = plot.run_number as string;
      onsidePlotsURLs.push(get_plot_url(copy));
    });

  return onsidePlotsURLs;
};

export const getOnSideOverlaidPlotsObjects = (params_for_api: ParamsForApiProps) => {
  const onsidePlotsObj = [];
  const copy = { ...params_for_api }

  const onsidePlotObj = {
    name: params_for_api.plot_name,
    dataset_name: params_for_api.dataset_name,
    path: params_for_api.folders_path,
    run_number: params_for_api.run_number
  };

  onsidePlotsObj.push(onsidePlotObj);

  copy.overlay_plot &&
    copy.overlay_plot.map((plot: TripleProps) => {
      const run_number = plot.run_number
      const dataset_name = plot.dataset_name
      const name = params_for_api.plot_name
      const path = params_for_api.folders_path
      const onsidePlotObj = {
        run_number,
        name,
        dataset_name,
        path,
      };
      onsidePlotsObj.push(onsidePlotObj);
    });

  return onsidePlotsObj;
};

export const chooseApi = (params_for_api: ParamsForApiProps) => {
  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;
  return functions_config.new_back_end.new_back_end ? get_plot_with_overlay_new_api(params_for_api) : get_plot_with_overlay_old_api(params_for_api)
}