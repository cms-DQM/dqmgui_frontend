import React, { useEffect } from 'react';

import { root_url } from '../../config/config';
import { get_plot_url } from '../../config/config';
import { ParamsForApiProps } from './interfaces';
import { setSelectedPlotsName } from '../../reducers/displayFolderOrPlot';
import {
  StyledCol,
  StyledPlotRow,
  PlotNameCol,
  Column,
  PlusIcon,
} from './styledComponents';

interface PlotProps {
  plot_name: string;
  params_for_api: ParamsForApiProps;
  addPlotToList(plot_name: string): void;
  dispatch: any;
  isPlotSelected: boolean;
}

export const Plot = ({
  addPlotToList,
  plot_name,
  params_for_api,
  dispatch,
  isPlotSelected,
}: PlotProps) => {

  params_for_api.plot_name = plot_name;
  const plot_url = get_plot_url(params_for_api);
  const source = `${root_url}/${plot_url}`;

  return (
    <StyledCol>
      <StyledPlotRow
        minHeight={params_for_api.height}
        width={params_for_api.width}
        isPlotSelected={isPlotSelected}
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
