import React from 'react';

import { root_url } from '../../../config/config';
import {
  get_plot_with_overlay,
  get_overlaied_plots_urls,
} from '../../../config/config';
import { ParamsForApiProps } from '../interfaces';
import { setSelectedPlotsName, addPlotToList } from '../../../reducers/displayFolderOrPlot';
import {
  StyledCol,
  PlotNameCol,
  StyledPlotRow,
  Column,
  PlusIcon,
  MinusIcon,
} from '../styledComponents';

interface OverlaidPlotImageProps {
  params_for_api: ParamsForApiProps;
  plot_name: string;
  dispatch: any;
  isPlotSelected: boolean;
  addPlotToList(plot_name: string): void;
  removePlotFromList(plot_name: string | undefined): void;
}

export const OverlaidPlotImage = ({
  plot_name,
  params_for_api,
  dispatch,
  isPlotSelected,
  addPlotToList,
  removePlotFromList
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
        isPlotSelected={isPlotSelected}
      >
        <PlotNameCol>{plot_name}</PlotNameCol>
        <Column>
          {isPlotSelected ?
            <MinusIcon onClick={() => removePlotFromList(plot_name)} />
            :
            <PlusIcon onClick={() => addPlotToList(plot_name)} />
          }
        </Column>
        <div>
          <img alt={plot_name} src={source} />
        </div>
      </StyledPlotRow>
    </StyledCol>
  );
};
