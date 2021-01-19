import React, { useRef, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { functions_config, get_plot_url } from '../../../../config/config';
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
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate';
import { PlotImage } from '../plotImage';
import { LayoutName, LayoutWrapper, ParentWrapper, PlotWrapper } from '../plotsWithLayouts/styledComponents';
import { store } from '../../../../contexts/leftSideContext';
import { isPlotSelected } from '../../../../containers/display/utils';

interface PlotProps {
  plot: PlotDataProps;
  selected_plots: PlotDataProps[];
  params_for_api: ParamsForApiProps;
  imageRefScrollDown: any;
}

export const Plot = ({
  plot,
  selected_plots,
  params_for_api,
  imageRefScrollDown,
}: PlotProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const { size } = useContext(store)
  const imageRef = useRef(null);

  const { blink, updated_by_not_older_than } = useBlinkOnUpdate();
  const url = get_plot_url(params_for_api);
  const is_plot_selected = isPlotSelected(selected_plots, plot)
  useEffect(() => {
    const scrollPlot = () => {
      scroll(imageRef);
      scrollToBottom(imageRefScrollDown);
    };
    if (is_plot_selected) {
      scrollPlot();
    }
  }, [is_plot_selected, query.selected_plots]);

  plot.dataset_name = query.dataset_name
  plot.run_number = query.run_number

  return (
    <ParentWrapper
      isLoading={blink.toString()}
      animation={(functions_config.mode === 'ONLINE').toString()}
      size={size}
      isPlotSelected={is_plot_selected.toString()}>
      <LayoutName
        isPlotSelected={is_plot_selected.toString()}
        error={get_plot_error(plot).toString()}
      >{decodeURI(params_for_api.plot_name as string)}</LayoutName>
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
            plot={plot}
            plotURL={url}
            updated_by_not_older_than={updated_by_not_older_than}
            query={query}
            imageRef={imageRef}
            isPlotSelected={is_plot_selected}
          />
        </PlotWrapper>
      </LayoutWrapper>
    </ParentWrapper>
  );
};
