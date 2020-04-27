import { PlotDataProps } from './interfaces';
import cleanDeep from 'clean-deep';

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

export const getSelectedPlotsNames = (plotsNames: string | undefined) => {
  const plots = plotsNames ? plotsNames.split('/') : []

  return plots
}

export const getSelectedPlots = (plotsQuery: string | undefined) => {
  const plotsWithDirs = plotsQuery ? plotsQuery.split('&') : []
  return plotsWithDirs.map((plotWithDir: string) => {
    console.log(plotWithDir)
    const plotAndDir = plotWithDir.split('/')
    const name = plotAndDir.pop()
    const directories = plotAndDir.join('/')
    const plotObject: PlotDataProps = { name: name ? name : '', dir: directories }
    return plotObject
  })
}