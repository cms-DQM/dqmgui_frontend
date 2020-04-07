import React from 'react';

import { get_plot_with_overlay, root_url, get_overlaied_plots_urls } from '../../../config/config'
import { ParamsForApiProps } from '../../../containers/display/interfaces'
import { sizes } from '../../constants'

interface ZoomedPlotsProps {
  selected_plot_name: string
  removePlotFromList(plot_name: string | undefined): void;
  params_for_api: ParamsForApiProps
}

export const ZoomedOverlaidPlot = ({ selected_plot_name, removePlotFromList, params_for_api }: ZoomedPlotsProps) => {
  params_for_api.height = sizes.fill.size.h
  params_for_api.width = sizes.fill.size.w
  params_for_api.plot_name = selected_plot_name

  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api)
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('')

  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls
  const plot_with_overlay = get_plot_with_overlay(params_for_api)
  const source = `${root_url}/${plot_with_overlay}`
  
  return (
    <div id={selected_plot_name}
      style={{ width: sizes.fill.size.w, height: sizes.fill.size.h }}
      onClick={() => removePlotFromList(selected_plot_name)}>
      <img src={source} style={{ width: sizes.fill.size.w, height: sizes.fill.size.h }} />
    </div>
  )
}
