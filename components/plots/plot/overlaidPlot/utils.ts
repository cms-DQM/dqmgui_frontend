import {
  ParamsForApiProps,
  TripleProps,
} from '../../../../containers/display/interfaces';
import { get_plot_url } from '../../../../config/config';

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
