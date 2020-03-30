import { useState } from 'react';

import { root_url } from '../../config/config';
import { sizes } from '../../components/constants'
import { LineProps } from '../../components/view_details_menu';
import { get_plot_url, get_plot_with_overlay, get_overlaied_plots_urls } from './apis';

interface PlotProps {
  plot_name: string;
  dataset_name: string;
  run_number: number;
  folders_path?: string;
  overlay_plot?: LineProps[];
}

export interface ParamsForApiProps extends PlotProps{
  height: number,
  width: number,
  joined_overlaied_plots_urls?: string,
  overlay?: string,
}

export const Plot = ({ plot_name, dataset_name, run_number, folders_path, overlay_plot = [] }: PlotProps) => {
  const [width, set_width] = useState(sizes.medium.size.w)
  const [height, set_height] = useState(sizes.medium.size.h)
  const [overlay, set_overlay] = useState('overlay')

  const params_for_api: ParamsForApiProps = {
    overlay_plot: overlay_plot,
    run_number: run_number,
    folders_path: folders_path,
    dataset_name: dataset_name,
    plot_name: plot_name,
    width: width,
    height: height,
    overlay:overlay
  }

  const overlaied_plots_urls = get_overlaied_plots_urls(params_for_api)
  const joined_overlaied_plots_urls = overlaied_plots_urls.join('')
  
  params_for_api.joined_overlaied_plots_urls = joined_overlaied_plots_urls
  const plot_url = get_plot_url(params_for_api)
  const plot_with_overlay = get_plot_with_overlay(params_for_api)

  const source = overlay_plot ? `${root_url}/${plot_with_overlay}` : `${root_url}/${plot_url}`

  return (
    <div style={{ height: height, width: width }}>
      <p>{plot_name}</p>
      <img alt={plot_name} src={source} />
    </div>
  )
}