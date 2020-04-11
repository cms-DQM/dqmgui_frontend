import React from 'react';

import { get_overlaied_plots_urls } from '../../../config/config';
import { ParamsForApiProps, SizeProps } from '../../../containers/display/interfaces';
import { sizes } from '../../constants';
import { get_plot_source } from './utils'
import {StyledDiv} from '../../styledComponents';

interface ZoomedPlotsProps {
  selected_plot_name: string;
  removePlotFromList(plot_name: string | undefined): void;
  params_for_api: ParamsForApiProps;
  size: SizeProps;
}

export const ZoomedOverlaidPlot = ({
  selected_plot_name,
  removePlotFromList,
  params_for_api,
  size,
}: ZoomedPlotsProps) => {
  params_for_api.height = size.h;
  params_for_api.width = size.w;
  params_for_api.plot_name = selected_plot_name;

  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;

  const source = get_plot_source(params_for_api)
  
  return (
    <StyledDiv
      id={selected_plot_name}
      style={{ width: size.w, height: size.h }}
      onClick={() => removePlotFromList(selected_plot_name)}
    >
      <img
        src={source}
        style={{ width: size.w, height: size.h }}
      />
    </StyledDiv>
  );
};
