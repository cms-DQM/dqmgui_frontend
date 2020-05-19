import React, { useRef } from 'react';
import Router, { useRouter } from 'next/router';

import { root_url } from '../../../../config/config';
import { get_plot_url } from '../../../../config/config';
import {
  ParamsForApiProps,
  PlotDataProps,
  QueryProps,
} from '../../../../containers/display/interfaces';
import {
  StyledCol,
  StyledPlotRow,
  PlotNameCol,
  Column,
  PlusIcon,
  MinusIcon,
} from '../../../../containers/display/styledComponents';
import { removePlotFromSelectedPlots, addToSelectedPlots } from './utils';

interface PlotProps {
  plot: PlotDataProps;
  params_for_api: ParamsForApiProps;
  isPlotSelected: boolean;
}

export const Plot = ({ plot, params_for_api, isPlotSelected }: PlotProps) => {
  params_for_api.plot_name = plot.name;
  const plot_url = get_plot_url(params_for_api);
  const source = `${root_url}${plot_url}`;

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
    <div ref={imageRef}>
      <StyledCol space={2} >
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
            isPlotSelected ?  await removePlotFromRightSide() : await addPlotToRightSide()
            scroll()
          }}>
            <img alt={plot.name} src={source} />
          </div>
        </StyledPlotRow>
      </StyledCol >
    </div>
  );
};
