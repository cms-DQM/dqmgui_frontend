import { ParamsForApiProps } from '../../../../containers/display/interfaces';

import {
  get_plot_with_overlay,
  get_plot_url,
} from '../../../../config/config';

export const get_plot_source = (params_for_api: ParamsForApiProps) => {
  if (params_for_api.overlay === 'onSide') {
    return get_plot_url(params_for_api);
  } else {
    return get_plot_with_overlay(params_for_api);
  }
};

