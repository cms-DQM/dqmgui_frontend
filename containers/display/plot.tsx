import { root_url } from '../../config/config';
import { get_plot_url } from '../../config/config';
import { ParamsForApiProps } from './interfaces';
import { setSelectedPlotsName } from '../../reducers/displayFolderOrPlot';

interface PlotProps {
  plot_name: string,
  params_for_api: ParamsForApiProps
  addPlotToList(plot_name: string): void;
  dispatch:any
}
export const Plot = ({ addPlotToList, plot_name, params_for_api, dispatch }: PlotProps) => {
  params_for_api.plot_name = plot_name
  const plot_url = get_plot_url(params_for_api)
  const source = `${root_url}/${plot_url}`

  return (
    <>
      <button onClick={() => addPlotToList(plot_name)}>Add to list</button>
      <div style={{ height: params_for_api.height, width: params_for_api.width }}
        onClick={() => setSelectedPlotsName([plot_name])(dispatch)}
        >
        <p>{plot_name}</p>
        <img alt={plot_name} src={source} />
      </div>
    </>
  )
}