import cleanDeep from 'clean-deep';
import _ from 'lodash';

import {
  PlotDataProps,
  PlotInterface,
  DirectoryInterface,
  QueryProps,
} from './interfaces';
import Router from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { removeFirstSlash } from '../../components/workspaces/utils';

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

export const getSelectedPlots = (
  plotsQuery: string | undefined,
  plots: PlotDataProps[]
) => {
  const plotsWithDirs = plotsQuery ? plotsQuery.split('&') : [];
  return plotsWithDirs.map((plotWithDir: string) => {
    const plotAndDir = plotWithDir.split('/');
    const name = plotAndDir.pop();
    const directories = plotAndDir.join('/');
    const plot = plots.filter(
      (plot) => plot.name === name && plot.path === directories
    );
    const displayedName =
      plot.length > 0 && plot[0].displayedName ? plot[0].displayedName : '';

    const plotObject: PlotDataProps = {
      name: name ? name : '',
      path: directories,
      displayedName: displayedName,
    };
    return plotObject;
  });
};

export const getFolderPathToQuery = (
  previuosFolderPath: string | undefined,
  currentSelected: string
) => {
  return previuosFolderPath
    ? `${previuosFolderPath}/${currentSelected}`
    : `/${currentSelected}`;
};

export const doesPlotExists = (
  contents: (PlotInterface & DirectoryInterface)[]
) =>
  contents.filter((one_item: PlotInterface | DirectoryInterface) =>
    one_item.hasOwnProperty('obj')
  );

// what is streamerinfo? (coming from api, we don't know what it is, so we filtered it out)
// getContent also sorting data that directories should be displayed firstly, just after them- plots images.
export const getContents = (data: any) =>
  data
    ? _.sortBy(
        data.contents
          ? data.contents
          : [].filter(
              (one_item: PlotInterface | DirectoryInterface) =>
                !one_item.hasOwnProperty('streamerinfo')
            ),
        ['subdir']
      )
    : [];

export const getDirectories = (contents: DirectoryInterface[]) =>
  cleanDeep(contents.map((content: DirectoryInterface) => content.subdir));

export const getFormatedPlotsObject = (contents: PlotInterface[]) =>
  cleanDeep(
    contents.map((content: PlotInterface) => {
      return {
        displayedName: content.obj,
        path: content.path && '/' + content.path,
        properties: content.properties,
      };
    })
  ).sort();

export const getFilteredDirectories = (
  plot_search_folders: string[],
  workspace_folders: (string | undefined)[]
) => {
  //if workspaceFolders array from context is not empty we taking intersection between all directories and workspaceFolders
  // workspace folders are fileterd folders array by selected workspace
  if (workspace_folders.length > 0) {
    //@ts-ignore
    const filteredDirectories = workspace_folders.filter((directory: string) =>
      plot_search_folders.includes(directory)
    );
    return filteredDirectories;
  }
  // if folder_path and workspaceFolders are empty, we return all direstories
  else if (workspace_folders.length === 0) {
    return plot_search_folders;
  }
};

export const getChangedQueryParams = (
  params: ParsedUrlQueryInput,
  query: QueryProps
) => {
  params.dataset_name = params.dataset_name
    ? params.dataset_name
    : query.dataset_name;

  params.run_number = params.run_number ? params.run_number : query.run_number;

  params.folder_path = params.folder_path
    ? removeFirstSlash(params.folder_path as string)
    : query.folder_path;

  params.workspace = params.workspace ? params.workspace : query.workspace;

  params.overlay = params.overlay ? params.overlay : query.overlay;

  params.overlay_data =  params.overlay_data === '' ||  params.overlay_data
    ? params.overlay_data
    : query.overlay_data;

  params.selected_plots =
    params.selected_plots === '' || params.selected_plots
      ? params.selected_plots
      : query.selected_plots;

  // if value of search field is empty string, should be retuned all folders.
  // if params.plot_search == '' when request is done, params.plot_search is changed to .*
  params.plot_search =
    params.plot_search === '' || params.plot_search
      ? params.plot_search
      : query.plot_search;

  params.overlay = params.overlay ? params.overlay : query.overlay;

  params.normalize = params.normalize ? params.normalize : query.normalize;

  return params;
};

export const changeRouter = (parameters: ParsedUrlQueryInput) => {
  Router.replace({
    pathname: '/',
    query: parameters,
  });
};

export const getNameAndDirectoriesFromDir = (content: PlotInterface) => {
  const dir = content.path;
  const partsOfDir = dir.split('/');
  const name = partsOfDir.pop();
  const directories = partsOfDir.join('/');

  return { name, directories };
};
