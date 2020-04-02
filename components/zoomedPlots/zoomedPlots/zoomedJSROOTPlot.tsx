import { get_jroot_plot } from '../../../config/config'
import { ParamsForApiProps } from '../../../containers/display/interfaces'
import { sizes } from '../../constants'
import { useRequest } from '../../../hooks/useRequest'
import { useEffect } from 'react'

interface ZoomedJSROOTPlotsProps {
  selected_plot_name: string
  removePlotFromList(plot_name: string | undefined): void;
  params_for_api: ParamsForApiProps
}

export const ZoomedJSROOTPlot = ({ selected_plot_name, removePlotFromList, params_for_api }: ZoomedJSROOTPlotsProps) => {
  params_for_api.plot_name = selected_plot_name
  const { data } = useRequest(get_jroot_plot(params_for_api), {}, [selected_plot_name])

  useEffect(() => {
    //@ts-ignore
    JSROOT.draw(selected_plot_name, JSROOT.parse(JSON.stringify(data)), 'hist')
  }, [data])

  return (
    <div id={selected_plot_name}
      style={{ width: sizes.fill.size.w, height: sizes.fill.size.h }}
      onClick={() => removePlotFromList(selected_plot_name)}>
    </div>
  )
}