import { root_url } from '../../config/config';
import { get_plot_url } from '../../config/config';
import { ParamsForApiProps } from './interfaces';
import { Dispatch, SetStateAction } from 'react';

interface PlotProps {
  plot_name: string,
  params_for_api: ParamsForApiProps
  set_selected_plots: any
}
export const Plot = ({ plot_name, params_for_api, set_selected_plots }: PlotProps) => {
  params_for_api.plot_name = plot_name
  const plot_url = get_plot_url(params_for_api)
  const source = `${root_url}/${plot_url}`

  return (
    <div style={{ height: params_for_api.height, width: params_for_api.width }}
      onClick={() => set_selected_plots([plot_name])}
    >
      <p>{plot_name}</p>
      <img alt={plot_name} src={source} />
    </div>
  )
}