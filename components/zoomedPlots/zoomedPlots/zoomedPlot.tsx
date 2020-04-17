import React from 'react';

import { get_plot_url, root_url } from '../../../config/config';
import { ParamsForApiProps, SizeProps } from '../../../containers/display/interfaces';
import { StyledCol, PlotNameCol, StyledPlotRow, Column, MinusIcon, ImageDiv } from '../../../containers/display/styledComponents';

interface ZoomedPlotsProps {
  selected_plot_name: string;
  removePlotFromList(plot_name: string | undefined): void;
  params_for_api: ParamsForApiProps;
  size: SizeProps;
}

export const ZoomedPlot = ({
  selected_plot_name,
  removePlotFromList,
  params_for_api,
  size,
}: ZoomedPlotsProps) => {
  params_for_api.plot_name = selected_plot_name;
  params_for_api.height = size.h;
  params_for_api.width = size.w;
  const plot_url = get_plot_url(params_for_api);
  const source = `${root_url}/${plot_url}`;

  return (
    <StyledCol>
      <StyledPlotRow
        minHeight={params_for_api.height}
        width={params_for_api.width}
        isPlotSelected={true}>
        <PlotNameCol>{selected_plot_name}</PlotNameCol>
        <Column>
          <MinusIcon
            onClick={() => removePlotFromList(selected_plot_name)}
          />
        </Column>
        <ImageDiv
          id={selected_plot_name}
          width={size.w}
          height={size.h}        >
          <ImageDiv
            src={source}
            width={size.w}
            height={size.h}
          />
        </ImageDiv>
      </StyledPlotRow>
    </StyledCol>
  );
};
