import { TrinomialProps } from "../../components/ViewDetailsMenu"
import { ParamsForApiProps } from "./interfaces"

export const get_plot_url = (params: ParamsForApiProps) => `plotfairy/archive/${params.run_number}${params.dataset_name}${params.folders_path}/${params.plot_name}?w=${params.width};h=${params.height}`

export const get_plot_with_overlay = (params: ParamsForApiProps) => `plotfairy/${params.overlay}?ref=overlay;obj=archive/${params.run_number}${params.dataset_name}${params.folders_path}/${params.plot_name}${params.joined_overlaied_plots_urls};w=${params.width};h=${params.height}`

export const get_overlaied_plots_urls = (params: ParamsForApiProps) => {
  const overlay_plots = params?.overlay_plot ? params.overlay_plot : []

  return (overlay_plots.map((overlay: TrinomialProps) => {
    const dataset_name_overlay = overlay.dataset_name ? overlay.dataset_name : params.dataset_name
    const run_number_overlay = overlay.run_number
    const label = overlay.label ? overlay.label : params.run_number
    return `;obj=archive/${run_number_overlay}${dataset_name_overlay}${params.folders_path}/${params.plot_name};reflabel=${label}`
  }))
}
