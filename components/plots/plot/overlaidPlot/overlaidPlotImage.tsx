import React, { useRef, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { functions_config } from '../../../../config/config';
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
  scroll,
  scrollToBottom,
  get_plot_error,
} from '../singlePlot/utils';
import { store } from '../../../../contexts/leftSideContext';
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate';
import { PlotImage } from '../plotImage';
import { LayoutName, LayoutWrapper, ParentWrapper, PlotWrapper } from '../plotsWithLayouts/styledComponents';

interface OverlaidPlotImageProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  isPlotSelected: boolean;
  imageRefScrollDown: any;
}

export const OverlaidPlotImage = ({
  plot,
  params_for_api,
  isPlotSelected,
  imageRefScrollDown,
}: OverlaidPlotImageProps) => {
  const globalState = useContext(store);
  const { normalize, size } = globalState;

  params_for_api.plot_name = plot.name;
  params_for_api.normalize = normalize;

  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;
  const plot_with_overlay = get_plot_with_overlay(params_for_api);

  const router = useRouter();
  const query: QueryProps = router.query;

  const imageRef = useRef(null);
  const { blink, updated_by_not_older_than } = useBlinkOnUpdate();

  return (
    <ParentWrapper
      isLoading={blink.toString()}
      animation={(functions_config.mode === 'ONLINE').toString()}
      size={size}
      isPlotSelected={isPlotSelected.toString()}>
      <LayoutName
        error={get_plot_error(plot).toString()}
        isPlotSelected={isPlotSelected.toString()}
      >{decodeURI(params_for_api.plot_name)}</LayoutName>
      <LayoutWrapper
        size={size}
        auto='auto'
      >
        <PlotWrapper
          plotSelected={isPlotSelected}
          onClick={async () => {
            await isPlotSelected
            setTimeout(() => {
              scroll(imageRef);
              scrollToBottom(imageRefScrollDown)
            }, 500);
          }}
          ref={imageRef}
        >
          <PlotImage
            blink={blink}
            params_for_api={params_for_api}
            plot={plot}
            plotURL={plot_with_overlay}
            updated_by_not_older_than={updated_by_not_older_than}
            query={query}
            imageRef={imageRef}
            isPlotSelected={isPlotSelected}
          />
        </PlotWrapper>
      </LayoutWrapper>
    </ParentWrapper>
  );
};
