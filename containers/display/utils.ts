import { PlotDataProps } from './interfaces';
import cleanDeep from 'clean-deep';
import { PlotInterface } from './DisplayFolderAndPlot';

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
  const plots = plotsNames ? plotsNames.split('/') : [];

  return plots;
};

export const getSelectedPlots = (plotsQuery: string | undefined, plots: PlotDataProps[]) => {
  const plotsWithDirs = plotsQuery ? plotsQuery.split('&') : [];
  return plotsWithDirs.map((plotWithDir: string) => {
    const plotAndDir = plotWithDir.split('/');
    const name = plotAndDir.pop();
    const directories = plotAndDir.join('/');
    const plot = plots.filter(plot => plot.name === name && plot.dir === directories)
    const displayedName = plot.length > 0 && plot[0].displayedName ? plot[0].displayedName : ''

    const plotObject: PlotDataProps = {
      name: name ? name : '',
      dir: directories,
      displayedName: displayedName
    };
    return plotObject;
  });
};

export const getNameAndDirectoriesFromDir = (content: PlotInterface) => {
  const dir = content.dir
  const partsOfDir = dir.split('/')
  const name = partsOfDir.pop()
  const directories = partsOfDir.join('/')

  return { name, directories }
}