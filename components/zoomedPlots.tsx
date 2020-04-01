import { get_plot_url, root_url } from '../config/config'
import { ParamsForApiProps } from '../containers/display/interfaces'
import { sizes } from './constants'

interface ZoomedPlotsProps {
  selected_plots_name: string[]
  removePlotFromList(plot_name: string | undefined): void;
  params_for_api: ParamsForApiProps
}

export const ZoomedPlots = ({ selected_plots_name, removePlotFromList, params_for_api }: ZoomedPlotsProps) => {
  return (
    <div>
      {
        selected_plots_name.map((selected_plot: string) => {
          params_for_api.plot_name = selected_plot
          params_for_api.height = sizes.fill.size.h
          params_for_api.width = sizes.fill.size.w
          const plot_url = get_plot_url(params_for_api)
          const source = `${root_url}/${plot_url}`

          return (
            <div onClick={() => removePlotFromList(selected_plot)}>
              <img src={source} style={{ width: sizes.fill.size.w, height: sizes.fill.size.h }} />
            </div>
          )
        })
      }
    </div>
  )
}