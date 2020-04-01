import { root_url } from '../../config/config';
import { get_plot_with_overlay, get_overlaied_plots_urls } from '../../config/config';
import { ParamsForApiProps } from './interfaces';

interface OverlaidPlotProps {
  params_for_api: ParamsForApiProps,
  plot_name: string,
  addPlotToList(plot_name: string): void
  set_selected_plots_names(plot_name: string[]): void
}

export const OverlaidPlot = ({
  plot_name,
  params_for_api,
  addPlotToList,
  set_selected_plots_names,
}: OverlaidPlotProps) => {

  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api)
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('')
  params_for_api.plot_name = plot_name
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls
  const plot_with_overlay = get_plot_with_overlay(params_for_api)
  const source = `${root_url}/${plot_with_overlay}`

  return (
    <>
      <button onClick={() => addPlotToList(plot_name)}>Add to list</button>
      <div style={{ height: params_for_api.height, width: params_for_api.width }}
        onClick={() => set_selected_plots_names([plot_name])}
      >
        <p>{plot_name}</p>
        <img alt={plot_name} src={source} />
      </div>
    </>
  )
}