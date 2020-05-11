import React from 'react';
import Link from 'next/link';

import { get_overlaied_plots_urls } from '../../../../config/config';
import {
  ParamsForApiProps,
  SizeProps,
  PlotDataProps,
  QueryProps,
} from '../../../../containers/display/interfaces';
import { get_plot_source } from './utils';
import {
  StyledPlotRow,
  PlotNameCol,
  Column,
  MinusIcon,
  StyledCol,
  ImageDiv,
  Image,
} from '../../../../containers/display/styledComponents';
import { useRouter } from 'next/router';
import { removePlotFromSelectedPlots } from '../../plot/singlePlot/utils';

interface ZoomedPlotsProps {
  selected_plot: PlotDataProps;
  params_for_api: ParamsForApiProps;
  size: SizeProps;
}

export const ZoomedOverlaidPlot = ({
  selected_plot,
  params_for_api,
  size,
}: ZoomedPlotsProps) => {
  params_for_api.height = size.h;
  params_for_api.width = size.w;
  params_for_api.plot_name = selected_plot.name;

  const router = useRouter();
  const query: QueryProps = router.query;

  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;

  const source = get_plot_source(params_for_api);

  return (
    <StyledCol space={2}>
      <StyledPlotRow
        minheight={params_for_api.height}
        width={params_for_api.width}
        is_plot_selected={true.toString()}
        nopointer={true.toString()}
      >
        <PlotNameCol>{selected_plot.displayedName}</PlotNameCol>
        <Column>
          <Link
            href={{
              pathname: '/',
              query: {
                run_number: query.run_number,
                dataset_name: query.dataset_name,
                folder_path: query.folder_path,
                overlay: query.overlay,
                overlay_data: query.overlay_data,
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
          <Image src={source} width={size.w} height={size.h} />
        </ImageDiv>
      </StyledPlotRow>
    </StyledCol>
  );
};
