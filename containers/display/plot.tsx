import React from 'react';

import { root_url } from '../../config/config';
import { get_plot_url } from '../../config/config';
import { ParamsForApiProps, PlotDataProps } from './interfaces';
import { setSelectedPlotsName } from '../../reducers/displayFolderOrPlot';
import {
  StyledCol,
  StyledPlotRow,
  PlotNameCol,
  Column,
  PlusIcon,
  MinusIcon,
} from './styledComponents';

interface PlotProps {
  plot: PlotDataProps;
  params_for_api: ParamsForApiProps;
  addPlotToList(plot: PlotDataProps): void;
  dispatch: any;
  isPlotSelected: boolean;
  removePlotFromList(plot: PlotDataProps | undefined): void;
  jsroot_mode: boolean;
}

export const Plot = ({
  addPlotToList,
  plot,
  params_for_api,
  dispatch,
  isPlotSelected,
  removePlotFromList,
}: PlotProps) => {
  params_for_api.plot_name = plot.name;
  const plot_url = get_plot_url(params_for_api);
  const source = `${root_url}/${plot_url}`;
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
