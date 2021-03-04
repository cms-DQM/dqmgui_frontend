import { ParamsForApiProps } from '../../../../containers/display/interfaces';

import { chooseApiForGettingOverlaidPlotsUrl, chooseApiForGettingPlotUrl } from '../../../../api/utils';

export const get_plot_source = (params_for_api: ParamsForApiProps) => {
  if (params_for_api.overlay === 'onSide') {
    return chooseApiForGettingPlotUrl(params_for_api);
  } else {
    return chooseApiForGettingOverlaidPlotsUrl(params_for_api);
  }
};
