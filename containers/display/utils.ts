import cleanDeep from 'clean-deep';
import _ from 'lodash';

import { PlotDataProps, PlotInterface, DirectoryInterface, QueryProps } from './interfaces';

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
    const plot = plots.filter(plot => plot.name === name && plot.path === directories)
    const displayedName = plot.length > 0 && plot[0].displayedName ? plot[0].displayedName : ''

    const plotObject: PlotDataProps = {
      name: name ? name : '',
      path: directories,
      displayedName: displayedName
    };
    return plotObject;
  });
};

export const getFolderPathToQuery = (previuosFolderPath: string | undefined, currentSelected: string) => {
  return previuosFolderPath ? `${previuosFolderPath}/${currentSelected}` : `/${currentSelected}`
}

export const doesPlotExists = (contents: (PlotInterface & DirectoryInterface)[]) =>
  contents.filter((one_item: PlotInterface | DirectoryInterface) =>
    one_item.hasOwnProperty('obj')
  );

// what is streamerinfo? (coming from api, we don't know what it is, so we filtered it out)
// getContent also sorting data that directories should be displayed firstly, just after them- plots images.
export const getContents = (data: any) =>
  data
    ? _.sortBy(
      data.contents.filter(
        (one_item: PlotInterface | DirectoryInterface) =>
          !one_item.hasOwnProperty('streamerinfo')
      ),
      ['subdir']
    )
    : [];

export const getDirectories = (contents: DirectoryInterface[]) => cleanDeep(
  contents.map((content: DirectoryInterface) => content.subdir)
);

export const getFormatedPlotsObject = (contents: PlotInterface[]) => (
  cleanDeep(
    contents.map((content: PlotInterface) => {
      return { name: content.obj, path: content.path && '/' + content.path, properties: content.properties };
    })
  ).sort()
)

export const getFilteredDirectories = (query: QueryProps, workspaceFolders: string[], directories: (string | undefined)[]) => {
  //if workspaceFolders array from context is not empty we taking intersection between all directories and workspaceFolders
  // workspace folders are fileterd folders array by selected workspace
  if (workspaceFolders.length > 0) {
    //@ts-ignore
    const filteredDirectories = directories.filter((directory: string) => workspaceFolders.includes(directory))
    return filteredDirectories
  }
  // if folder_path and workspaceFolders are empty, we return all direstories 
  else if (workspaceFolders.length === 0) {
    return directories
  }
}

export const getNameAndDirectoriesFromDir = (content: PlotInterface) => {
  const path = content.path
  const partsOfDir = path.split('/')
  const name = partsOfDir.pop()
  const directories = partsOfDir.join('/')

  return { name, directories }
} 