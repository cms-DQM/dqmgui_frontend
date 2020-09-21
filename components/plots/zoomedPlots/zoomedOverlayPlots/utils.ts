import { ParamsForApiProps } from '../../../../containers/display/interfaces';

import {
  get_plot_with_overlay,
  get_plot_url,
} from '../../../../config/config';

export const get_plot_source = (root_url: string, params_for_api: ParamsForApiProps) => {
  if (params_for_api.overlay === 'onSide') {
    const plot = get_plot_url(params_for_api);
    return `${root_url}${plot}`;
  } else {
    const plot_with_overlay = get_plot_with_overlay(params_for_api);
    return `${root_url}${plot_with_overlay}`;
  }
};
