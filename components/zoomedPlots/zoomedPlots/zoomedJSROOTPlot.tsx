import React, { useEffect } from 'react';

import { get_jroot_plot } from '../../../config/config';
import { ParamsForApiProps, SizeProps } from '../../../containers/display/interfaces';
import { useRequest } from '../../../hooks/useRequest';
import { StyledCol, StyledPlotRow, PlotNameCol, MinusIcon, Column, ImageDiv } from '../../../containers/display/styledComponents';

interface ZoomedJSROOTPlotsProps {
  selected_plot_name: string;
  removePlotFromList(plot_name: string | undefined): void;
  params_for_api: ParamsForApiProps;
  size: SizeProps
}

export const ZoomedJSROOTPlot = ({
  selected_plot_name,
  removePlotFromList,
  params_for_api,
  size,
}: ZoomedJSROOTPlotsProps) => {
  params_for_api.plot_name = selected_plot_name;
  const { data } = useRequest(get_jroot_plot(params_for_api), {}, [
    selected_plot_name,
  ]);

  useEffect(() => {
    //@ts-ignore
    JSROOT.draw(selected_plot_name, JSROOT.parse(JSON.stringify(data)), 'hist');
  }, [data]);

  return (
    <StyledCol>
      <StyledPlotRow
        minHeight={size.h}
        width={size.w}
        isPlotSelected={true}
      >
        <PlotNameCol>{selected_plot_name}</PlotNameCol>
        <Column>
          <MinusIcon
            onClick={() => removePlotFromList(selected_plot_name)}
          />
        </Column>
        <ImageDiv
          id={selected_plot_name}
          width={size.w}
          height={size.h}
        />
      </StyledPlotRow>
    </StyledCol>
  );
};
