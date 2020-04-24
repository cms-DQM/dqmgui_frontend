import { PlotDataProps } from './interfaces';

export const getFolderPath = (folders: string[], clickedFolder: string) => {
  const folderIndex = folders.indexOf(clickedFolder);
  const restFolders: string[] = folders.slice(0, folderIndex + 1);
  const foldersString = restFolders.join('/');
  return foldersString;
};

export const isPlotSelected = (
  selected_plots: PlotDataProps[],
  plot_name: string
) =>
  selected_plots.some(
    (selected_plot: PlotDataProps) => selected_plot.name === plot_name
  );
