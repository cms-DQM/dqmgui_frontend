import cleanDeep from "clean-deep"
import { ParsedUrlQueryInput } from "querystring"

import { PlotDataProps, PlotoverlaidSeparatelyProps, PlotsoverlaidSeparatelyProps, QueryProps } from "../../../../../containers/display/interfaces"
import { getSelectedPlots } from "../../../../../containers/display/utils"

export const changeFolderPathByBreadcrumb = (item: ParsedUrlQueryInput) => (setFolders: (cleaned_folders_array: (string | undefined)[]) => void, setCurrentFolder: (folder: string) => void) => {
  // @ts-ignore
  const folders_from_breadcrumb = item.folder_path.split('/')
  const cleaned_folders_array = cleanDeep(folders_from_breadcrumb) ? cleanDeep(folders_from_breadcrumb) : []
  setFolders(cleaned_folders_array)
  if (cleaned_folders_array.length > 0) {
    setCurrentFolder(cleaned_folders_array[cleaned_folders_array.length - 1])
  }
  else {
    setCurrentFolder('')
  }
}


export const setPlot = (overlaid_plot: PlotoverlaidSeparatelyProps, plot_name: string) => {
  const copy = { ...overlaid_plot }
  copy.name = plot_name
  return copy
}

export const addToSelectedPlots = (item: PlotoverlaidSeparatelyProps, allSelectedPlots: PlotoverlaidSeparatelyProps[]) => {
  if (allSelectedPlots.findIndex((selected_plot) => selected_plot.name === item.name && selected_plot.folder_path === item.folder_path)) {
    allSelectedPlots.push(item)
    return allSelectedPlots.reverse()
  }
  return allSelectedPlots
}

export const removeSelectedPlot = (item: PlotoverlaidSeparatelyProps, allSelectedPlots: PlotoverlaidSeparatelyProps[]) => {
  const copy = [...allSelectedPlots]
  const index = copy.indexOf(item)
  copy.splice(index, 1)
  return copy
}

export const setLabel = (item: PlotoverlaidSeparatelyProps, allSelectedPlots: PlotoverlaidSeparatelyProps[], label?: string) => {
  const copy = [...allSelectedPlots]
  const index = copy.indexOf(item)
  copy[index].label = label
  return copy
}

export const makeLinkableOverlay = (separately_overlaid_plots: PlotsoverlaidSeparatelyProps, plot: PlotDataProps, query: QueryProps) => {
  const selected_plots = getSelectedPlots(query)

  const simple_plot_object = {
    name: plot.name,
    path: plot.path,
    run_number: plot.run_number,
    dataset_name: plot.dataset_name,
  };
  const index = selected_plots.findIndex((plot) =>
    plot.run_number == simple_plot_object.run_number
    && plot.dataset_name == simple_plot_object.dataset_name
    && plot.path == simple_plot_object.path
    && plot.name == simple_plot_object.name
  )

  if(index > -1){
    selected_plots[index].overlaidSeparately = separately_overlaid_plots
  }
  const urls = selected_plots.map((plot) => {
    const overlaid_separately = plot.overlaidSeparately
    if (overlaid_separately) {
      const overlaid_separately_string = overlaid_separately?.plots.map(overlaid_plot => {
        const label = overlaid_plot.label ? overlaid_plot.label : plot.run_number
        return `plot=${overlaid_plot.folder_path}/${overlaid_plot.name};lab=${label}`
      })
      const overlaid_separately_full_string = overlaid_separately_string?.join(';') + `;norm=${separately_overlaid_plots.normalize};overlay=${separately_overlaid_plots.ref};`
      return (`${plot.run_number}/${plot.dataset_name}/${plot.path}/${plot.name};overlayed=${overlaid_separately_full_string}`)
    }
    else {
      return (`${plot.run_number}/${plot.dataset_name}/${plot.path}/${plot.name}`)
    }
  }
)
return urls.join('&')
}