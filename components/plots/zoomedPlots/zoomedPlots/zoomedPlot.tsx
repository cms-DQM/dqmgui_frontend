import React from 'react';

import { get_plot_url, root_url } from '../../../../config/config';
import {
  ParamsForApiProps,
  SizeProps,
  PlotDataProps,
  QueryProps,
} from '../../../../containers/display/interfaces';
import {
  StyledCol,
  PlotNameCol,
  StyledPlotRow,
  Column,
  MinusIcon,
  ImageDiv,
} from '../../../../containers/display/styledComponents';
import { removePlotFromSelectedPlots } from '../../plot/singlePlot/utils';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ZoomedPlotsProps {
  selected_plot: PlotDataProps;
  params_for_api: ParamsForApiProps;
  size: SizeProps;
}

export const ZoomedPlot = ({
  selected_plot,
  params_for_api,
  size,
}: ZoomedPlotsProps) => {
  params_for_api.plot_name = selected_plot.name;
  params_for_api.height = size.h;
  params_for_api.width = size.w;
  params_for_api.folders_path = selected_plot.dir;

  const plot_url = get_plot_url(params_for_api);
  const source = `${root_url}${plot_url}`;
  const router = useRouter();
  const query: QueryProps = router.query;

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
          <Link
            href={{
              pathname: '/',
              query: {
                run_number: query.run_number,
                dataset_name: query.dataset_name,
                folder_path: query.folder_path,
                selected_plots: `${removePlotFromSelectedPlots(
                  query.selected_plots,
                  selected_plot
                )}`,
              },
            }}
          >
            <MinusIcon />
          </Link>
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
