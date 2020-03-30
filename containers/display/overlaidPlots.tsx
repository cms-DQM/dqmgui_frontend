import { useState } from 'react';

import { root_url } from '../../config/config';
import { sizes } from '../../components/constants'
import { get_plot_with_overlay, get_overlaied_plots_urls } from './apis';
import { ParamsForApiProps, PlotProps } from './interfaces';

export const OverlaidPlot = ({
  plot_name,
  dataset_name,
  run_number,
  folders_path,
  overlay_plot = [],
  width,
  height,
  overlay,
}: PlotProps) => {

  const params_for_api: ParamsForApiProps = {
    overlay_plot: overlay_plot,
    run_number: run_number,
    folders_path: folders_path,
    dataset_name: dataset_name,
    plot_name: plot_name,
    width: width,
    height: height,
    overlay: overlay,
  }
  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api)
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('')

  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls
  const plot_with_overlay = get_plot_with_overlay(params_for_api)
  console.log(joined_overlaid_plots_urls)
  const source = `${root_url}/${plot_with_overlay}`

  return (
    <div style={{ height: height, width: width }}>
      <p>{plot_name}</p>
      <img alt={plot_name} src={source} />
    </div>
  )
}