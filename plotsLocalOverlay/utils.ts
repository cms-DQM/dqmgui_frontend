import cleanDeep from "clean-deep"
import { ParsedUrlQueryInput } from "querystring"
import { PlotoverlaidSeparatelyProps, PlotProps } from "../containers/display/interfaces"

export const changeFolderPathByBreadcrumb = (item: ParsedUrlQueryInput) =>( setFolders:(cleaned_folders_array: (string | undefined)[])=> void, setCurrentFolder: (folder:string) => void ) => {
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


  export const setPlot = (overlaid_plot: PlotProps, plot_name: string) =>{
      const copy = {...overlaid_plot}
      copy.plot_name = plot_name
       return copy
  }

  export const setLabel = (item: PlotProps, allSelectedPlots: PlotProps[], label?: string) => {
    const copy = [...allSelectedPlots]
    const index = copy.indexOf(item)
    copy[index].label = label
    return copy
  }