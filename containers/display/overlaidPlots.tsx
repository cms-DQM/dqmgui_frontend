import { root_url } from '../../config/config';
import { get_plot_with_overlay, get_overlaied_plots_urls } from '../../config/config';
import { ParamsForApiProps, PlotProps } from './interfaces';
import { Dispatch, SetStateAction } from 'react';

interface OverlaidPlotProps {
  params_for_api: ParamsForApiProps,
  plot_name: string,
  set_selected_plots: any
}

export const OverlaidPlot = ({
  plot_name,
  params_for_api,
  set_selected_plots,
}: OverlaidPlotProps) => {

  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api)
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('')
  params_for_api.plot_name = plot_name
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls
  const plot_with_overlay = get_plot_with_overlay(params_for_api)
  const source = `${root_url}/${plot_with_overlay}`

  return (
    <div style={{ height: params_for_api.height, width: params_for_api.width }}
      onClick={() => set_selected_plots(plot_name)}
    >
      <p>{plot_name}</p>
      <img alt={plot_name} src={source} />
    </div>
  )
}