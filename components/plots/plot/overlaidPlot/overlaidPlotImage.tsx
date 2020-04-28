import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { root_url } from '../../../../config/config';
import {
  get_plot_with_overlay,
  get_overlaied_plots_urls,
} from '../../../../config/config';
import {
  ParamsForApiProps,
  PlotDataProps,
  QueryProps,
} from '../../../../containers/display/interfaces';
import {
  StyledCol,
  PlotNameCol,
  StyledPlotRow,
  Column,
  PlusIcon,
  MinusIcon,
} from '../../../../containers/display/styledComponents';
import {
  removePlotFromSelectedPlots,
  addToSelectedPlots,
} from '../singlePlot/utils';

interface OverlaidPlotImageProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  isPlotSelected: boolean;
}

export const OverlaidPlotImage = ({
  plot,
  params_for_api,
  isPlotSelected,
}: OverlaidPlotImageProps) => {
  params_for_api.plot_name = plot.name;
  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;

  const plot_with_overlay = get_plot_with_overlay(params_for_api);
  const source = `${root_url}/${plot_with_overlay}`;

  const router = useRouter();
  const query: QueryProps = router.query;

  return (
    <StyledCol space={2}>
      <StyledPlotRow
        minHeight={params_for_api.height}
        width={params_for_api.width}
        isPlotSelected={isPlotSelected}
      >
        <PlotNameCol>{plot.name}</PlotNameCol>
        <Column>
          {isPlotSelected ? (
            <Link
              href={{
                pathname: '/',
                query: {
                  run_number: query.run_number,
                  dataset_name: query.dataset_name,
                  folder_path: query.folder_path,
                  overlay: params_for_api.overlay,
                  selected_plots: `${removePlotFromSelectedPlots(
                    query.selected_plots,
                    plot
                  )}`,
                },
              }}
            >
              <MinusIcon />
            </Link>
          ) : (
              <Link
                href={{
                  pathname: '/',
                  query: {
                    run_number: query.run_number,
                    dataset_name: query.dataset_name,
                    folder_path: query.folder_path,
                    //addig selected plots name and directories to url
                    selected_plots: `${addToSelectedPlots(
                      query.selected_plots,
                      plot
                    )}`,
                  },
                }}
              >
                <PlusIcon />
              </Link>
            )}
        </Column>
        <Link
          href={{
            pathname: '/',
            query: {
              run_number: query.run_number,
              dataset_name: query.dataset_name,
              folder_path: query.folder_path,
              //if plot is laready selected, on plot click, plot will be removed from url;
              //Otherwis-- plot and its dir will be added to url.
              selected_plots: `${isPlotSelected ?
                removePlotFromSelectedPlots(
                  query.selected_plots,
                  plot
                )
                :
                addToSelectedPlots(
                  query.selected_plots,
                  plot,
                )}`,
            },
          }}
        >
          <div>
            <img alt={plot.name} src={source} />
          </div>
        </Link>
      </StyledPlotRow>
    </StyledCol>
  );
};
