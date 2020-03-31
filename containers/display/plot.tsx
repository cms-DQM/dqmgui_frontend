import { root_url } from '../../config/config';
import { get_plot_url } from '../../config/config';
import { ParamsForApiProps } from './interfaces';

interface PlotProps {
  plot_name: string,
  params_for_api: ParamsForApiProps
  addPlotFromList(plot_name: string): void;
  set_selected_plots_names(plot_name: string[]): void
}
export const Plot = ({ addPlotFromList, plot_name, params_for_api, set_selected_plots_names }: PlotProps) => {
  params_for_api.plot_name = plot_name
  const plot_url = get_plot_url(params_for_api)
  const source = `${root_url}/${plot_url}`

  return (
    <>
      <button onClick={() => addPlotFromList(plot_name)}>Add to list</button>
      <div style={{ height: params_for_api.height, width: params_for_api.width }}
        onClick={() => set_selected_plots_names([plot_name])}
      >
        <p>{plot_name}</p>
        <img alt={plot_name} src={source} />
      </div>
    </>
  )
}