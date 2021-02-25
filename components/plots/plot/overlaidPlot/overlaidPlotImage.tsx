import React, { useRef, useContext } from 'react';
import { useRouter } from 'next/router';

import { functions_config } from '../../../../config/config';
import {
  get_plot_with_overlay,
  get_overlaied_plots_urls,
} from '../../../../api/oldApi';
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
import { store } from '../../../../contexts/globalStateContext';
import { PlotImage } from '../plotImages';
import { LayoutName, LayoutWrapper, ParentWrapper, PlotWrapper } from '../plotsWithLayouts/styledComponents';
import { isPlotSelected } from '../../../../containers/display/utils';
import { Tooltip } from 'antd';
import { decodePlotName } from '../../../utils';

interface OverlaidPlotImageProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  selected_plots: PlotDataProps[];
}

export const OverlaidPlotImage = ({
  plot,
  params_for_api,
  selected_plots,
}: OverlaidPlotImageProps) => {
  params_for_api.plot_name = plot.name;
  const size = { w: params_for_api.width, h: params_for_api.height }
  const { imageRefScrollDown } = useContext(store)

  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;
  const plot_with_overlay = get_plot_with_overlay(params_for_api);

  const router = useRouter();
  const query: QueryProps = router.query;

  const imageRef = useRef(null);

  plot.dataset_name = query.dataset_name
  plot.run_number = query.run_number

  const plotNameRef = React.useRef<any>(null)
  const [count, setCount] = React.useState(0)
  const [tooLong, setTooLong] = React.useState(false)

  React.useEffect(() => {
    setCount(count + 1) //2 because on mount, and when size changes. Without count, we're getting infinity loop
    if (plotNameRef.current && count < 3) {
      setTooLong(plotNameRef.current.clientHeight > 24)
    }
  }, [plotNameRef.current && plotNameRef.current.clientHeight])

  const is_plot_selected = isPlotSelected(selected_plots, plot)

  return (
    <Tooltip title={tooLong ? decodeURI(params_for_api.plot_name as string) : ''}>
      <ParentWrapper
        size={size}
        isPlotSelected={is_plot_selected.toString()}>
        <LayoutName
          ref={plotNameRef}
          error={get_plot_error(plot).toString()}
          isPlotSelected={is_plot_selected.toString()}
        > {decodePlotName(tooLong, params_for_api.plot_name ? params_for_api.plot_name : '')}
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
              params_for_api={params_for_api}
              plot={plot}
              plotURL={plot_with_overlay}
              query={query}
              imageRef={imageRef}
              isPlotSelected={is_plot_selected}
            />
          </PlotWrapper>
        </LayoutWrapper>
      </ParentWrapper>
    </Tooltip>
  );
};
