import { get_plot_url, root_url } from '../config/config'
import { ParamsForApiProps } from '../containers/display/interfaces'
import {sizes} from './constants'

interface ZoomedPlotsProps {
  params_for_api: ParamsForApiProps
  selected_plots: string[]
}

export const ZoomedPlots = ({ params_for_api, selected_plots }: ZoomedPlotsProps) => {
  params_for_api.height= sizes.fill.size.h
  params_for_api.width= sizes.fill.size.w

  return (
    <div>
      {
        selected_plots.map((selected_plot: string) => {
          params_for_api.plot_name = selected_plot
          const plot_url = get_plot_url(params_for_api)
          const source = `${root_url}/${plot_url}`
          return (<img src={source} />)
        })
      }

    </div>
  )
}