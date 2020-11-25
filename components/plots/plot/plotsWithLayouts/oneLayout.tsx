import * as React from 'react'
import { Tooltip } from 'antd'

import { get_overlaied_plots_urls, get_plot_url, get_plot_with_overlay } from '../../../../config/config'
import { isPlotSelected } from '../../../../containers/display/utils'
import { store } from '../../../../contexts/leftSideContext'
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate'
import { theme } from '../../../../styles/theme'
import { PlotImage } from '../plotImage'
import { FormatParamsForAPI, scroll, scrollToBottom } from '../singlePlot/utils'

interface OnePlotInLayout {
  layoutName: string;
  plots: any[];
  selected_plots: any,
  globalState: any,
  imageRefScrollDown: any,
  query: any,
}

export const OnePlotInLayout = ({ plots, globalState, imageRefScrollDown, layoutName, query, selected_plots }: OnePlotInLayout) => {
  const { size } = React.useContext(store)
  const imageRef = React.useRef(null);

  const plotsAmount =
    //in order to get tidy layout, has to be x^2 plots in one layout. In the layuts, where the plot number is 
    //less than x^2, we're adding peseudo plots (empty divs)
    (Math.ceil(Math.log(2) / Math.log(plots.length)) - (Math.log(2) / Math.log(plots.length)) !== 0) &&
      plots.length !== 1 // log(2)/log(1)=0, that's we need to avoid to add pseudo plots in layout when is just 1 plot in it
      //exception: need to plots.length^2, because when there is 2 plots in layout, we want to display it like 4 (2 real in 2 pseudo plots)
      // otherwise it won't fit in parent div.
      ? plots.length + Math.ceil(Math.sqrt(plots.length)) : plots.length ** 2 

  const layoutArea = size.h * size.w
  const ratio = size.w / size.h
  const onePlotArea = layoutArea / plotsAmount
  const onePlotHeight = Math.floor(Math.sqrt(onePlotArea / ratio))
  const onePlotWidth = Math.floor(Math.sqrt(onePlotArea / ratio) * ratio)
  const howMuchInOneLine = Math.floor(size.w / onePlotWidth)
  const auto = []
  var i;
  const { blink, updated_by_not_older_than } = useBlinkOnUpdate();

  for (i = 0; i < howMuchInOneLine; i++) {
    auto.push('auto')
  }
  return (
    <div style={{
      width: size.w + 24,
      justifyContent: 'center',
      margin: 4,
      background: `${theme.colors.primary.light}`,
      display: 'grid',
      alignItems: 'end',
      padding: 8,
    }
    }>
      <div style={{ paddingBottom: 4 }}>{layoutName}</div>
      <div
        style={{
          width: size.w + 12,
          height: size.h + 16,
          background: `${theme.colors.primary.light}`,
          display: 'grid',
          gridTemplateColumns: `${auto.join(' ')}`,
        }}
      >

        {
          plots.map((plot) => {
            const params_for_api = FormatParamsForAPI(
              globalState,
              query,
              encodeURI(plot.name),
              plot.path
            );
            params_for_api.width = onePlotWidth
            params_for_api.height = onePlotHeight
            const url = get_plot_url(params_for_api);

            const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
            const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
            params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;
            const plot_with_overlay = get_plot_with_overlay(params_for_api);
            const plotSelected = isPlotSelected(
              selected_plots,
              plot.name
            )
            return (
              <Tooltip title={plot.name}>
                <div
                  onClick={async () => {
                    await plotSelected
                    setTimeout(() => {
                      scroll(imageRef);
                      scrollToBottom(imageRefScrollDown)
                    }, 500);
                  }}
                  ref={imageRef}
                  style={{
                    justifyContent: 'center',
                    border: plotSelected ? `4px solid ${theme.colors.secondary.light}` : `2px solid ${theme.colors.primary.light}`,
                    alignItems: 'center',
                    minWidth: onePlotWidth,
                    minHeight: onePlotHeight,
                    cursor: 'pointer',
                    alignSelf: 'center',
                    justifySelf: 'baseline',
                    margin: 2,
                  }}
                >
                  {query.overlay_data ? (
                    <PlotImage
                      blink={blink}
                      params_for_api={params_for_api}
                      plot={plot}
                      plotURL={plot_with_overlay}
                      updated_by_not_older_than={updated_by_not_older_than}
                      query={query}
                      imageRef={imageRef}
                      isPlotSelected={plotSelected}
                    />)
                    :
                    (<PlotImage
                      blink={blink}
                      params_for_api={params_for_api}
                      plot={plot}
                      plotURL={url}
                      updated_by_not_older_than={updated_by_not_older_than}
                      query={query}
                      imageRef={imageRef}
                      isPlotSelected={plotSelected}
                    />)}
                </div>
              </Tooltip>
            )
          })}
      </div>
    </div>
  )
} 