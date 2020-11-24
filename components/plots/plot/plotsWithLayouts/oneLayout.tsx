import * as React from 'react'
import { get_overlaied_plots_urls, get_plot_url, get_plot_with_overlay } from '../../../../config/config'
import { isPlotSelected } from '../../../../containers/display/utils'
import { store } from '../../../../contexts/leftSideContext'
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate'
import { theme } from '../../../../styles/theme'
import { OverlaidPlot } from '../overlaidPlot'
import { PlotImage } from '../plotImage'
import { Plot } from '../singlePlot/plot'
import { FormatParamsForAPI } from '../singlePlot/utils'

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
  // if there are 2, 6, 10... plots in the layout, we need to add 2 pseudo plots
  // in order to get square divided that in one line should be even amount of plots
  // then we getting tidy layout
  const plotsAmount = (plots.length !== 1 && plots.length % 4) > 0 ? plots.length + 2 : plots.length
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
      width: size.w + 16,
      margin: 4,
      background: `${theme.colors.primary.light}`,
      display: 'grid',
      alignItems: 'end',
      padding: 8,
    }
    }>
      <div style={{paddingBottom: 4}}>{layoutName}</div>
      <div
        style={{
          width: size.w,
          height: size.h + 8,
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

            return (<div
              style={{
                background: `${theme.colors.primary.light}`,
                //we're getting distorted plots, when there are just 2 plots in layout
                minWidth: onePlotWidth,
                minHeight: onePlotHeight,
                border: '1px solid lightGrey'
              }}
            >              {query.overlay_data ? (
              <PlotImage
                blink={blink}
                params_for_api={params_for_api}
                plot={plot}
                plotURL={plot_with_overlay}
                updated_by_not_older_than={updated_by_not_older_than}
                imageRef={imageRefScrollDown}
                query={query}
              />)
              :
              (<PlotImage
                blink={blink}
                params_for_api={params_for_api}
                plot={plot}
                plotURL={url}
                updated_by_not_older_than={updated_by_not_older_than}
                imageRef={imageRefScrollDown}
                query={query}
              />)}
            </div>
            )
          })}
      </div>
    </div>
  )
} 