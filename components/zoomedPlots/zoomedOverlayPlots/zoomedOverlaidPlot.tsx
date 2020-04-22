import React from 'react';

import { get_overlaied_plots_urls } from '../../../config/config';
import {
  ParamsForApiProps,
  SizeProps,
  PlotDataProps,
} from '../../../containers/display/interfaces';
import { get_plot_source } from './utils';
import {
  StyledPlotRow,
  PlotNameCol,
  Column,
  MinusIcon,
  StyledCol,
  ImageDiv,
} from '../../../containers/display/styledComponents';

interface ZoomedPlotsProps {
  selected_plot: PlotDataProps;
  removePlotFromList(plot_name: PlotDataProps | undefined): void;
  params_for_api: ParamsForApiProps;
  size: SizeProps;
}

export const ZoomedOverlaidPlot = ({
  selected_plot,
  removePlotFromList,
  params_for_api,
  size,
}: ZoomedPlotsProps) => {
  params_for_api.height = size.h;
  params_for_api.width = size.w;
  params_for_api.plot_name = selected_plot.name;

  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;

  const source = get_plot_source(params_for_api);

  return (
    <StyledCol>
      <StyledPlotRow
        minHeight={params_for_api.height}
        width={params_for_api.width}
        isPlotSelected={true}
        noPointer={true}
      >
        <PlotNameCol>{selected_plot.name}</PlotNameCol>
        <Column>
          <MinusIcon onClick={() => removePlotFromList(selected_plot)} />
        </Column>
        <ImageDiv id={selected_plot.name} width={size.w} height={size.h}>
          <img
            src={source}
            style={{ width: `${size.w}`, height: `${size.h}` }}
          />
        </ImageDiv>
      </StyledPlotRow>
    </StyledCol>
  );
};
