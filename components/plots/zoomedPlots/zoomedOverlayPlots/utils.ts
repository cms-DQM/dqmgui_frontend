import { ParamsForApiProps } from '../../../../containers/display/interfaces';

import { get_plot_with_overlay_old_api, get_plot_url } from '../../../../config/config';

export const get_plot_source = (params_for_api: ParamsForApiProps) => {
  if (params_for_api.overlay === 'onSide') {
    return get_plot_url(params_for_api);
  } else {
    // return chooseApi(params_for_api);

    return get_plot_with_overlay_old_api(params_for_api);
  }
};
