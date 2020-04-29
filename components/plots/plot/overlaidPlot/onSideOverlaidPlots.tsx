import React from 'react';

import { root_url } from '../../../../config/config';
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
  OnSidePlotsWrapper,
} from '../../../../containers/display/styledComponents';
import { getOnSideOverlaidPlots } from './utils';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  removePlotFromSelectedPlots,
  addToSelectedPlots,
} from '../singlePlot/utils';

interface OnSideOverlaidPlotsProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  isPlotSelected: boolean;
}

export const OnSideOverlaidPlots = ({
  plot,
  params_for_api,
  isPlotSelected,
}: OnSideOverlaidPlotsProps) => {
  params_for_api.plot_name = plot.name;
  const onsidePlotsURLs: string[] = getOnSideOverlaidPlots(params_for_api);

  const router = useRouter();
  const query: QueryProps = router.query;

  return (
    <OnSidePlotsWrapper>
      {onsidePlotsURLs.map((url: string) => {
        const sourceForOnePlot = `${root_url}/${url}`;
        return (
          <StyledCol space={2} key={url}>
            <StyledPlotRow
              minheight={params_for_api.height}
              width={params_for_api.width}
              is_plot_selected={isPlotSelected.toString()}
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
                        overlay: query.overlay,
                        overlay_data: query.overlay_data,
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
                        overlay: query.overlay,
                        overlay_data: query.overlay_data,
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
                    overlay: query.overlay,
                    overlay_data: query.overlay_data,
                    //addig selected plots name and directories to url
                    selected_plots: `${addToSelectedPlots(
                      query.selected_plots,
                      plot
                    )}`,
                  },
                }}
              >
                <div>
                  <img alt={plot.name} src={sourceForOnePlot} />
                </div>
              </Link>
            </StyledPlotRow>
          </StyledCol>
        );
      })}
    </OnSidePlotsWrapper>
  );
};
