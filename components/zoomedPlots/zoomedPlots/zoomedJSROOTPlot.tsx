import React, { useEffect } from 'react';

import { get_jroot_plot } from '../../../config/config';
import {
  ParamsForApiProps,
  SizeProps,
  PlotDataProps,
} from '../../../containers/display/interfaces';
import { useRequest } from '../../../hooks/useRequest';
import {
  StyledCol,
  StyledPlotRow,
  PlotNameCol,
  MinusIcon,
  Column,
  ImageDiv,
} from '../../../containers/display/styledComponents';

interface ZoomedJSROOTPlotsProps {
  selected_plot: PlotDataProps;
  removePlotFromList(plot: PlotDataProps | undefined): void;
  params_for_api: ParamsForApiProps;
  size: SizeProps;
}

export const ZoomedJSROOTPlot = ({
  selected_plot,
  removePlotFromList,
  params_for_api,
  size,
}: ZoomedJSROOTPlotsProps) => {
  params_for_api.plot_name = selected_plot.name;
  params_for_api.folders_path = selected_plot.dir;

  const { data } = useRequest(get_jroot_plot(params_for_api), {}, [
    selected_plot.name,
  ]);

  useEffect(() => {
    //@ts-ignore
    JSROOT.draw(selected_plot.name, JSROOT.parse(JSON.stringify(data)), 'hist');
  }, [data]);

  return (
    <StyledCol>
      <StyledPlotRow
        minHeight={size.h}
        width={size.w}
        isPlotSelected={true}
        noPointer={true}
      >
        <PlotNameCol>{selected_plot.name}</PlotNameCol>
        <Column>
          <MinusIcon onClick={() => removePlotFromList(selected_plot)} />
        </Column>
        <ImageDiv id={selected_plot.name} width={size.w} height={size.h} />
      </StyledPlotRow>
    </StyledCol>
  );
};
