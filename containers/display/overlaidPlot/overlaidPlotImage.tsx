import React from 'react';

import { root_url } from '../../../config/config';
import {
  get_plot_with_overlay,
  get_overlaied_plots_urls,
} from '../../../config/config';
import { ParamsForApiProps, OptionProps } from '../interfaces';
import { setSelectedPlotsName, addPlotToList } from '../../../reducers/displayFolderOrPlot';
import {
  StyledCol,
  PlotNameCol,
  StyledPlotRow,
  Column,
  PlusIcon,
} from '../styledComponents';

interface OverlaidPlotImageProps {
  params_for_api: ParamsForApiProps;
  plot_name: string;
  dropdownParams: OptionProps[];
  dispatch: any;
  selected_plots_name: string[]
}

export const OverlaidPlotImage = ({
  plot_name,
  params_for_api,
  dropdownParams,
  dispatch,
  selected_plots_name,
}: OverlaidPlotImageProps) => {

  params_for_api.plot_name = plot_name;
  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;

  const plot_with_overlay = get_plot_with_overlay(params_for_api);
  const source = `${root_url}/${plot_with_overlay}`;

  return (
    <StyledCol>
      <StyledPlotRow
        minHeight={params_for_api.height}
        width={params_for_api.width}
      >
        <PlotNameCol>{plot_name}</PlotNameCol>
        <Column>
          <PlusIcon onClick={() => addPlotToList(plot_name)} />
        </Column>
        <div onClick={() => setSelectedPlotsName([plot_name])(dispatch)}>
          <img alt={plot_name} src={source} />
        </div>
      </StyledPlotRow>
    </StyledCol>
  );
};
