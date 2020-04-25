import React from 'react';

import { root_url } from '../../../../config/config';
import {
  get_plot_with_overlay,
  get_overlaied_plots_urls,
} from '../../../../config/config';
import { ParamsForApiProps, PlotDataProps } from '../../../../containers/display/interfaces';
import { setSelectedPlotsName } from '../../../../reducers/displayFolderOrPlot';
import {
  StyledCol,
  PlotNameCol,
  StyledPlotRow,
  Column,
  PlusIcon,
  MinusIcon,
} from '../../../../containers/display/styledComponents';

interface OverlaidPlotImageProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  dispatch: any;
  isPlotSelected: boolean;
  addPlotToList(plot: PlotDataProps): void;
  removePlotFromList(plot: PlotDataProps | undefined): void;
}

export const OverlaidPlotImage = ({
  plot,
  params_for_api,
  dispatch,
  isPlotSelected,
  addPlotToList,
  removePlotFromList,
}: OverlaidPlotImageProps) => {
  params_for_api.plot_name = plot.name;
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
        isPlotSelected={isPlotSelected}
      >
        <PlotNameCol>{plot.name}</PlotNameCol>
        <Column>
          {isPlotSelected ? (
            <MinusIcon onClick={() => removePlotFromList(plot)} />
          ) : (
            <PlusIcon onClick={() => addPlotToList(plot)} />
          )}
        </Column>
        <div
          onClick={() => {
            isPlotSelected
              ? removePlotFromList(plot)
              : setSelectedPlotsName([plot])(dispatch);
          }}
        >
          <img alt={plot.name} src={source} />
        </div>
      </StyledPlotRow>
    </StyledCol>
  );
};
