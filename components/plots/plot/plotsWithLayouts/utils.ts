import { get_overlaied_plots_urls } from "../../../../api/oldApi";
import { PlotDataProps } from "../../../../containers/display/interfaces";

const getOverlaidPlots = (plot: PlotDataProps) => {
  const overlaid_plots = plot.overlays.map((overlaidPlot) => {
    const parts = overlaidPlot.split('/')
    const plot_name = parts.pop()
    const path = parts.join('/')
    const parameters = {
      run_number: plot.run_number,
      dataset_name: plot.dataset_name,
      folders_path: path,
      plot_name: plot_name
    }
    return parameters
  })
  const overlaid_plots_urls = get_overlaied_plots_urls({ overlay_plot: overlaid_plots });
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  return joined_overlaid_plots_urls
}
export const getExtraParametersForPlotsInLayouts = (plot: PlotDataProps) => {
  if (plot.draw && plot.overlays) {
    const overlaid_plots = getOverlaidPlots(plot)
    const customisation = { ...plot.draw }
    return { customise: customisation, overlaidWithLayoutsConfig: overlaid_plots }
  } else if (!plot.draw && plot.overlays) {
    const overlaid_plots = getOverlaidPlots(plot)
    return { overlaidWithLayoutsConfig: overlaid_plots }
  } else if (plot.draw && !plot.overlays) {
    const customisation = { ...plot.draw }
    return { customise: customisation }
  }
  return {}
}