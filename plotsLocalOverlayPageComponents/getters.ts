import cleanDeep from "clean-deep"
import { DirectoryInterface, PlotInterface } from "../containers/display/interfaces"

export const getFoldersAndPlots = (data: (DirectoryInterface & PlotInterface)[]) => {
    const directories: string[] = []
    const plots: string[] = []
  
    data.forEach((folder_or_plot: DirectoryInterface & PlotInterface) => {
      directories.push(folder_or_plot.subdir)
      plots.push(folder_or_plot.name)
    })
    return { directories: cleanDeep(directories), plots: cleanDeep(plots) }
  }
  