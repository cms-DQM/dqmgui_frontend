import React from 'react';

import { get_plot_url, root_url } from '../../../../config/config';
import {
  ParamsForApiProps,
  SizeProps,
  PlotDataProps,
} from '../../../../containers/display/interfaces';
import {
  StyledCol,
  PlotNameCol,
  StyledPlotRow,
  Column,
  MinusIcon,
  ImageDiv,
} from '../../../../containers/display/styledComponents';

interface ZoomedPlotsProps {
  selected_plot: PlotDataProps;
  removePlotFromList(plot: PlotDataProps | undefined): void;
  params_for_api: ParamsForApiProps;
  size: SizeProps;
}

export const ZoomedPlot = ({
  selected_plot,
  removePlotFromList,
  params_for_api,
  size,
}: ZoomedPlotsProps) => {
  params_for_api.plot_name = selected_plot.name;
  params_for_api.height = size.h;
  params_for_api.width = size.w;
  params_for_api.folders_path = selected_plot.dir;
  const plot_url = get_plot_url(params_for_api);
  const source = `${root_url}/${plot_url}`;

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
