import React, { useRef, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { functions_config } from '../../../../config/config';
import { get_plot_url } from '../../../../api/oldApi';
import {
  PlotDataProps,
  QueryProps,
  ParamsForApiProps,
} from '../../../../containers/display/interfaces';
import {
  scroll,
  scrollToBottom,
  get_plot_error,
} from './utils';
import { useUpdateLiveMode } from '../../../../hooks/useUpdateInLiveMode';
import { useBlink } from '../../../../hooks/useBlink';
import { PlotImage } from '../plotImage';
import { LayoutName, LayoutWrapper, ParentWrapper, PlotWrapper } from '../plotsWithLayouts/styledComponents';
import { isPlotSelected } from '../../../../containers/display/utils';
import { Tooltip } from 'antd';
import { decodePlotName } from '../../../utils';
import { store } from '../../../../contexts/globalStateContext';

interface PlotProps {
  plot: PlotDataProps;
  selected_plots: PlotDataProps[];
  params_for_api: ParamsForApiProps;
}

export const Plot = ({
  plot,
  selected_plots,
  params_for_api,
}: PlotProps) => {

  const router = useRouter();
  const query: QueryProps = router.query;
  const imageRef = useRef(null);
  const size = { w: params_for_api.width, h: params_for_api.height }

  const plotNameRef = React.useRef<any>(null)
  const [count, setCount] = React.useState(0)
  const [tooLong, setTooLong] = React.useState(false)

  const { not_older_than } = useUpdateLiveMode()
  const { blink } = useBlink(not_older_than);
  const url = get_plot_url(params_for_api);
  const is_plot_selected = isPlotSelected(selected_plots, plot)
  const { imageRefScrollDown } = useContext(store)

  useEffect(() => {
    const scrollPlot = () => {
      scroll(imageRef);
      scrollToBottom(imageRefScrollDown);
    };
    if (is_plot_selected) {
      scrollPlot();
    }
  }, [is_plot_selected, query.selected_plots]);

  React.useEffect(() => {
    setCount(count + 1) //2 because on mount, and when size changes. Without count, we're getting infinity loop
    if (plotNameRef.current && count < 3) {
      setTooLong(plotNameRef.current.clientHeight > 24)
    }
  }, [plotNameRef.current && plotNameRef.current.clientHeight])

  plot.dataset_name = query.dataset_name
  plot.run_number = query.run_number

  return (
    <Tooltip title={tooLong ? decodeURI(params_for_api.plot_name as string) : ''}>
      <ParentWrapper
        isLoading={blink.toString()}
        animation={(functions_config.mode === 'ONLINE').toString()}
        size={size}
        isPlotSelected={is_plot_selected.toString()}>
        <LayoutName
          ref={plotNameRef}
          isPlotSelected={is_plot_selected.toString()}
          error={get_plot_error(plot).toString()}
        >{decodePlotName(tooLong, params_for_api.plot_name ? params_for_api.plot_name : '')}
        </LayoutName>
        <LayoutWrapper
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
              plot={plot}
              plotURL={url}
              updated_by_not_older_than={not_older_than}
              query={query}
              imageRef={imageRef}
              isPlotSelected={is_plot_selected}
            />
          </PlotWrapper>
        </LayoutWrapper>
      </ParentWrapper>
    </Tooltip>
  )
};
