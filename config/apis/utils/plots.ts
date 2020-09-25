import { ParamsForApiProps, TripleProps } from "../../../containers/display/interfaces";
import { get_plot_url, get_plot_with_overlay } from "../get_plots_urls";

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

export const get_plot_source = (root_url: string, params_for_api: ParamsForApiProps) => {
  if (params_for_api.overlay === 'onSide') {
    const plot = get_plot_url(params_for_api);
    return `${root_url}${plot}`;
  } else {
    const plot_with_overlay = get_plot_with_overlay(params_for_api);
    return `${root_url}${plot_with_overlay}`;
  }
};