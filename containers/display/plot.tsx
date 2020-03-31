import { root_url } from '../../config/config';
import { get_plot_url } from '../../config/config';
import { ParamsForApiProps, PlotProps } from './interfaces';


export const Plot = ({ plot_name, dataset_name, run_number, folders_path, width, height }: PlotProps) => {
  const params_for_api: ParamsForApiProps = {
    run_number: run_number,
    folders_path: folders_path,
    dataset_name: dataset_name,
    plot_name: plot_name,
    width: width,
    height: height,
  }

  const plot_url = get_plot_url(params_for_api)

  const source = `${root_url}/${plot_url}`

  return (
    <div style={{ height: height, width: width }}>
      <p>{plot_name}</p>
      <img alt={plot_name} src={source} />
    </div>
  )
}