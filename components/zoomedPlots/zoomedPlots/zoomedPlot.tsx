import React, { useEffect } from 'react'

import { get_plot_url, root_url } from '../../../config/config'
import { ParamsForApiProps } from '../../../containers/display/interfaces'
import { sizes } from '../../constants'

interface ZoomedPlotsProps {
  selected_plot_name: string
  removePlotFromList(plot_name: string | undefined): void;
  params_for_api: ParamsForApiProps
}

export const ZoomedPlot = ({ selected_plot_name, removePlotFromList, params_for_api }: ZoomedPlotsProps) => {
  params_for_api.plot_name = selected_plot_name
  params_for_api.height = sizes.fill.size.h
  params_for_api.width = sizes.fill.size.w
  const plot_url = get_plot_url(params_for_api)
  const source = `${root_url}/${plot_url}`

  return (
    <div id={selected_plot_name}
      style={{ width: sizes.fill.size.w, height: sizes.fill.size.h }}
      onClick={() => removePlotFromList(selected_plot_name)}>
      <img src={source} style={{ width: sizes.fill.size.w, height: sizes.fill.size.h }} />
    </div>
  )
}
