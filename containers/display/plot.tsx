import React, { useEffect } from 'react';

import { root_url } from '../../config/config';
import { get_plot_url } from '../../config/config';
import { ParamsForApiProps } from './interfaces';
import { setSelectedPlotsName } from '../../reducers/displayFolderOrPlot';
import {
  StyledCol,
  StyledPlotRow,
  PlotNameCol,
  MenuCol,
} from './styledComponents';
import { DropdownMenu } from '../../components/menu';
import { useCleanPlots } from '../../hooks/useCleanPlots';

interface PlotProps {
  plot_name: string;
  params_for_api: ParamsForApiProps;
  addPlotToList(plot_name: string): void;
  dispatch: any;
  selected_plots_name: string[]
}

export const Plot = ({
  addPlotToList,
  plot_name,
  params_for_api,
  dispatch,
  selected_plots_name,
}: PlotProps) => {

  params_for_api.plot_name = plot_name;
  const plot_url = get_plot_url(params_for_api);
  const source = `${root_url}/${plot_url}`;

  useCleanPlots(plot_name, selected_plots_name, setSelectedPlotsName, dispatch)

  const dropdownParams: any[] = [
    {
      value: plot_name,
      label: 'Add to list',
      action: () => addPlotToList(plot_name),
    },
  ];

  return (
    <StyledCol>
      <StyledPlotRow
        minHeight={params_for_api.height}
        width={params_for_api.width}
      >
        <PlotNameCol>{plot_name}</PlotNameCol>
        <MenuCol>
          <DropdownMenu options={dropdownParams} />
        </MenuCol>
        <div onClick={() => setSelectedPlotsName([plot_name])(dispatch)}>
          <img alt={plot_name} src={source} />
        </div>
      </StyledPlotRow>
    </StyledCol>
  );
};
