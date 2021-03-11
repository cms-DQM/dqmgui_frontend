import cleanDeep from "clean-deep"
import { DirectoryInterface, PlotInterface } from "../containers/display/interfaces"

export const getFoldersAndPlots = (data: (DirectoryInterface & PlotInterface)[]) => {
  const directories: DirectoryInterface[] = []
  const plots: string[] = []

  data.forEach((folder_or_plot: DirectoryInterface & PlotInterface) => {
    directories.push({ subdir: folder_or_plot.subdir, me_count: folder_or_plot.me_count })
    plots.push(folder_or_plot.name)
  })
  const sorter = (a: { subdir: string, me_count: number }, b: { subdir: string, me_count: number }) => {
    if (a.subdir < b.subdir) {
      return -1
    } if (a.subdir > b.subdir) {
      return 1
    }
    return 0
  }
  const sortedDorectories = cleanDeep(directories).sort(sorter)
  return { directories: sortedDorectories, plots: cleanDeep(plots) }
}
