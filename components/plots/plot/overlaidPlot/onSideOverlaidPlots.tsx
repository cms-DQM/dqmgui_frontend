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
import { getOnSideOverlaidPlots, getOnSideOverlaidPlotsObjects } from './utils';
import {
  scroll,
  scrollToBottom,
  get_plot_error,
} from '../singlePlot/utils';
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate';
import { PlotImage } from '../plotImage';
import { LayoutName, LayoutWrapper, ParentWrapper, PlotWrapper } from '../plotsWithLayouts/styledComponents';
import { store } from '../../../../contexts/leftSideContext';
import { isPlotSelected } from '../../../../containers/display/utils';
import { Tooltip } from 'antd';
import { decodePlotName } from '../../../utils'

interface OnSideOverlaidPlotsProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  imageRefScrollDown: any;
  selected_plots: PlotDataProps[];
}

export const OnSideOverlaidPlots = ({
  plot,
  params_for_api,
  selected_plots,
  imageRefScrollDown,
}: OnSideOverlaidPlotsProps) => {
  params_for_api.plot_name = plot.name;
  const onsidePlotsURLs: string[] = getOnSideOverlaidPlots(params_for_api);
  const overlaidPlotsObjs = getOnSideOverlaidPlotsObjects(params_for_api);
  const { size } = useContext(store)

  const router = useRouter();
  const query: QueryProps = router.query;
  const imageRef = useRef<HTMLDivElement>(null);

  const plotNameRef = React.useRef<any>(null)
  const [count, setCount] = React.useState(0)
  const [tooLong, setTooLong] = React.useState(false)

  React.useEffect(() => {
    setCount(count + 1) //2 because on mount, and when size changes. Without count, we're getting infinity loop
    if (plotNameRef.current && count < 3) {
      setTooLong(plotNameRef.current.clientHeight > 24)
    }
  }, [plotNameRef.current && plotNameRef.current.clientHeight])

  plot.dataset_name = query.dataset_name
  plot.run_number = query.run_number

  const { blink, updated_by_not_older_than } = useBlinkOnUpdate();

  return (
    <OnSidePlotsWrapper>
      {onsidePlotsURLs.map((url: string, index: number) => {
        const is_plot_selected = isPlotSelected(selected_plots, overlaidPlotsObjs[index] as any)
        return (
          <Tooltip title={tooLong ? decodeURI(params_for_api.plot_name as string) : ''}>
            <ParentWrapper
              isPlotSelected={is_plot_selected.toString()}
              isLoading={blink.toString()}
              animation={(functions_config.mode === 'ONLINE').toString()}
              size={size}>
              <LayoutName
                ref={plotNameRef}
                isPlotSelected={isPlotSelected.toString()}
                error={get_plot_error(plot).toString()}
              >{decodePlotName(tooLong, params_for_api.plot_name ? params_for_api.plot_name : '')}
              </LayoutName>
              <LayoutWrapper
                size={size}
                auto='auto'
              >
                <PlotWrapper
                  plotSelected={is_plot_selected}
                  onClick={async () => {
                    await is_plot_selected
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
                    plot={overlaidPlotsObjs[index]}
                    plotURL={url}
                    updated_by_not_older_than={updated_by_not_older_than}
                    query={query}
                    imageRef={imageRef}
                    isPlotSelected={is_plot_selected}
                  />
                </PlotWrapper>
              </LayoutWrapper>
            </ParentWrapper>
          </Tooltip>
        );
      })}
    </OnSidePlotsWrapper>
  );
};
