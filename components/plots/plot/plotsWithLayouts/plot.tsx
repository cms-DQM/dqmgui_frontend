import * as React from 'react'
import { Tooltip } from 'antd';

import { get_overlaied_plots_urls, get_plot_with_overlay } from '../../../../api/oldApi';
import { PlotDataProps, QueryProps } from '../../../../containers/display/interfaces';
import { isPlotSelected } from '../../../../containers/display/utils';
import { PlotWrapper } from './styledComponents';
import { FormatParamsForAPI, get_plot_error, scroll, scrollToBottom } from '../singlePlot/utils'
import { PlotImage } from '../plotImages';
import { store as globalContext } from '../../../../contexts/globalStateContext';
import { store as leftSideContext } from '../../../../contexts/leftSideContext';
import { chooseApiForGettingPlotUrl } from '../../../../api/utils';


interface PlotProps {
  query: QueryProps;
  plot: PlotDataProps;
  onePlotWidth: number;
  onePlotHeight: number;
  selected_plots: PlotDataProps[];
  imageRef: React.RefObject<HTMLDivElement>;
}

export const Plot = ({
  query,
  plot,
  onePlotHeight,
  onePlotWidth,
  selected_plots,
  imageRef,
   }: PlotProps) => {
  const { imageRefScrollDown } = React.useContext(globalContext)
  const fullState = React.useContext(leftSideContext)
  const params_for_api = FormatParamsForAPI(
    fullState,
    query,
    encodeURIComponent(plot.name),
    plot.path
  );
  params_for_api.width = onePlotWidth
  params_for_api.height = onePlotHeight
  const url = chooseApiForGettingPlotUrl(params_for_api);
  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;
  const plot_with_overlay = get_plot_with_overlay(params_for_api);
  plot.dataset_name = query.dataset_name
  plot.run_number = query.run_number
  const plotSelected = isPlotSelected(
    selected_plots,
    plot
  )
  const fullPlotPath = plot.path + '/' + plot.name
  return (
    <Tooltip title={fullPlotPath} color={get_plot_error(plot) ? 'red' : ''}>
      <PlotWrapper
        height={`${onePlotHeight}px`}
        width={`${onePlotWidth}px`}
        plotSelected={plotSelected}
        onClick={async () => {
          await plotSelected
          setTimeout(() => {
            scroll(imageRef);
            scrollToBottom(imageRefScrollDown)
          }, 500);
        }}

        ref={imageRef}
      >
        {query.overlay_data ? (
          <PlotImage
            params_for_api={params_for_api}
            plot={plot}
            plotURL={plot_with_overlay}
            query={query}
            imageRef={imageRef}
            isPlotSelected={plotSelected}
          />)
          :
          (<PlotImage
            params_for_api={params_for_api}
            plot={plot}
            plotURL={url}
            query={query}
            imageRef={imageRef}
            isPlotSelected={plotSelected}
          />)}
      </PlotWrapper>
    </Tooltip>
  )
}

