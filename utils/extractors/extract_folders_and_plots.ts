import { DirectoryInterface, PlotInterface } from "../../containers/display/interfaces";
import { getContents, getDirectories } from "../../containers/display/utils";
import { construct_full_plot_object } from "../constructors/constructPlotObject";

export const extract_folders_and_plots = (data) => {
  const contents: (PlotInterface & DirectoryInterface)[] = getContents(data);
  const folders = getDirectories(contents);
  const plots = construct_full_plot_object(contents, data)

  return { folders, plots }
}