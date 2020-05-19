import React, { useRef } from 'react';
import Router, { useRouter } from 'next/router';

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
  const imageRef = useRef(null);

  const addPlotToRightSide = () => Router.replace({
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
  })

  const removePlotFromRightSide = () => Router.replace({
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
  })

  const scroll = () => {
    if (imageRef) {
      //@ts-ignore
      imageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }

  return (
    <OnSidePlotsWrapper>
      {onsidePlotsURLs.map((url: string) => {
        const sourceForOnePlot = `${root_url}${url}`;
        return (
          <div ref={imageRef}>
            <StyledCol space={2} key={url}>
              <StyledPlotRow
                minheight={params_for_api.height}
                width={params_for_api.width}
                is_plot_selected={isPlotSelected.toString()}
                report={plot.properties.report}
              >
                <PlotNameCol>{plot.name}</PlotNameCol>
                <Column>
                  {isPlotSelected ? (
                    <MinusIcon onClick={removePlotFromRightSide} />
                  ) : (
                      <PlusIcon onClick={async () => {
                        await addPlotToRightSide()
                        scroll()
                      }} />
                    )}
                </Column>
                <div onClick={async () => {
                  isPlotSelected ? await removePlotFromRightSide() : await addPlotToRightSide()
                  scroll()
                }}>
                  <img alt={plot.name} src={sourceForOnePlot} />
                </div>
              </StyledPlotRow>
            </StyledCol>
          </div>
        );
      })}
    </OnSidePlotsWrapper>
  );
};
