import React, { useContext, useRef } from 'react';
import { useRouter } from 'next/router';

import { functions_config } from '../../../../config/config';
import {
  ParamsForApiProps,
  PlotDataProps,
  QueryProps,
} from '../../../../containers/display/interfaces';
import {
  OnSidePlotsWrapper,
} from '../../../../containers/display/styledComponents';
import { getOnSideOverlaidPlots } from './utils';
import {
  scroll,
  scrollToBottom,
  get_plot_error,
} from '../singlePlot/utils';
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate';
import { PlotImage } from '../plotImage';
import { LayoutName, LayoutWrapper, ParentWrapper, PlotWrapper } from '../plotsWithLayouts/styledComponents';
import { store } from '../../../../contexts/leftSideContext';

interface OnSideOverlaidPlotsProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  isPlotSelected: boolean;
  imageRefScrollDown: any;
}

export const OnSideOverlaidPlots = ({
  plot,
  params_for_api,
  isPlotSelected,
  imageRefScrollDown,
}: OnSideOverlaidPlotsProps) => {
  params_for_api.plot_name = plot.name;
  const onsidePlotsURLs: string[] = getOnSideOverlaidPlots(params_for_api);
  const { size } = useContext(store)

  const router = useRouter();
  const query: QueryProps = router.query;
  const imageRef = useRef(null);

  const { blink, updated_by_not_older_than } = useBlinkOnUpdate();

  return (
    <OnSidePlotsWrapper>
      {onsidePlotsURLs.map((url: string) => {
        return (
          <ParentWrapper
            isPlotSelected={isPlotSelected.toString()}

            isLoading={blink.toString()}
            animation={(functions_config.mode === 'ONLINE').toString()}
            size={size}>
            <LayoutName
              isPlotSelected={isPlotSelected.toString()}
              error={get_plot_error(plot).toString()}
            >{decodeURI(params_for_api.plot_name as string)}</LayoutName>
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
                  plotURL={url}
                  updated_by_not_older_than={updated_by_not_older_than}
                  query={query}
                  imageRef={imageRef}
                  isPlotSelected={isPlotSelected}
                />
              </PlotWrapper>
            </LayoutWrapper>
          </ParentWrapper>
        );
      })}
    </OnSidePlotsWrapper>
  );
};
