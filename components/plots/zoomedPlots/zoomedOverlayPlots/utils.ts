import { ParamsForApiProps } from '../../../../containers/display/interfaces';

import { get_plot_with_overlay } from '../../../../api/oldApi';
import { chooseApiForGettingPlotUrl } from '../../../../api/utils';

export const get_plot_source = (params_for_api: ParamsForApiProps) => {
  if (params_for_api.overlay === 'onSide') {
    return chooseApiForGettingPlotUrl(params_for_api);
  } else {
    return get_plot_with_overlay(params_for_api);
  }
};
