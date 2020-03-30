import { useState } from 'react';

import { root_url } from '../../config/config';
import { sizes } from '../../components/constants'
import { LineProps } from '../../components/view_details_menu';

interface PlotProps {
  plot_name: string;
  dataset_name: string;
  run_number: number;
  folders_path?: string;
  overlay_plot?: LineProps[];
}

const get_overlaied_plots_urls = (overlay_plot: LineProps[],
  run_number: number,
  folders_path: string | undefined,
  dataset_name: string,
  plot_name: string) =>
  overlay_plot.map((overlay: LineProps) => {
    const dataset_name_overlay = overlay.dataset_name ? overlay.dataset_name : dataset_name
    const run_number_overlay = overlay.run_number
    const label = overlay.label ? overlay.label : run_number
    return `;obj=archive/${run_number_overlay}${dataset_name_overlay}${folders_path}/${plot_name};reflabel=${label}`
  })

export const Plot = ({ plot_name, dataset_name, run_number, folders_path, overlay_plot = [] }: PlotProps) => {
  const [width, set_width] = useState(sizes.medium.size.w)
  const [height, set_height] = useState(sizes.medium.size.h)

  const overlaied_plots_urls = get_overlaied_plots_urls(overlay_plot, run_number, folders_path, dataset_name, plot_name)
  const joined_overlaied_plots_urls = overlaied_plots_urls.join('')

  const plot_url = `plotfairy/archive/${run_number}${dataset_name}${folders_path}/${plot_name}?w=${width};h=${height}`
  const plot_with_overlay = `plotfairy/overlay?ref=overlay;obj=archive/${run_number}${dataset_name}${folders_path}/${plot_name}${joined_overlaied_plots_urls};w=${width};h=${height}`

  const source = overlay_plot ? `${root_url}/${plot_with_overlay}` : `${root_url}/${plot_url}`

  return (
    <div style={{ height: height, width: width }}>
      <p>{plot_name}</p>
      <img alt={plot_name} src={source} />
    </div>
  )
}