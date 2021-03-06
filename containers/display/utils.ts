import cleanDeep from 'clean-deep';
import _ from 'lodash';
import qs from 'qs';

import {
  PlotDataProps,
  PlotInterface,
  DirectoryInterface,
  QueryProps,
  ParamsForApiProps,
} from './interfaces';
import Router from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { removeFirstSlash } from '../../components/workspaces/utils';
import {
  functions_config,
  root_url_
} from '../../config/config';
import {
  get_folders_and_plots_old_api,
  get_run_list_by_search_old_api,
} from '../../api/oldApi';
import {
  get_folders_and_plots_new_api,
  get_folders_and_plots_new_api_with_live_mode,
  get_run_list_by_search_new_api,
} from '../../api/newApi'
import { isItLiveMode } from '../../utils';

export const getFolderPath = (folders: string[], clickedFolder: string) => {
  const folderIndex = folders.indexOf(clickedFolder);
  const restFolders: string[] = folders.slice(0, folderIndex + 1);
  const foldersString = restFolders.join('/');
  return foldersString;
};

export const isPlotSelected = (
  selected_plots: PlotDataProps[],
  plot: PlotDataProps,
) => {
  return selected_plots.find((selected_plot) => selected_plot.name === plot.name
    && selected_plot.path === plot.path
    && selected_plot.run_number === plot.run_number
    && selected_plot.dataset_name === plot.dataset_name) ?
    true : false
};

export const getSelectedPlots = (
  plotsQuery: string | undefined,
  plots: PlotDataProps[]
) => {
  const plotsWithDirs = plotsQuery ? plotsQuery.split('&') : [];
  return plotsWithDirs.map((plotWithDir: string) => {
    const parts = plotWithDir.split('/')
    const run_number = parts.shift()
    const pathAndName = parts.splice(3)
    const dataset_name = '/' + parts.join('/')
    const name = pathAndName.pop() as string
    const path = pathAndName.join('/')

    const plot = plots.filter(
      (plot) => plot.name === decodeURI(name) && plot.path === path
    );

    const plotObject: PlotDataProps = {
      ...plot[0],
      name: decodeURI(name) as string,
      path: path,
      run_number: run_number as string,
      dataset_name: dataset_name,
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

// what is streamerinfo? (coming from api, we don't know what it is, so we filtered it out)
// getContent also sorting data that directories should be displayed firstly, just after them- plots images.
export const getContents = (data: any) => {
  if (functions_config.new_back_end.new_back_end) {
    return data ? _.sortBy(data.data ? data.data : [], ['subdir']) : [];
  }
  return data
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
};

export const getDirectories: any = (contents: DirectoryInterface[]) => {
  return cleanDeep(
    contents.map((content: DirectoryInterface) => {
      if (functions_config.new_back_end.new_back_end) {
        return { subdir: content.subdir, me_count: content.me_count };
      }
      return { subdir: content.subdir };
    })
  );
};

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
  plot_search_folders: DirectoryInterface[],
  workspace_folders: (DirectoryInterface | undefined)[]
) => {
  //if workspaceFolders array from context is not empty we taking intersection between all directories and workspaceFolders
  // workspace folders are fileterd folders array by selected workspace
  if (workspace_folders.length > 0) {
    const names_of_folders = plot_search_folders.map(
      (folder: DirectoryInterface) => folder.subdir
    );
    //@ts-ignore
    const filteredDirectories = workspace_folders.filter(
      (directory: DirectoryInterface | undefined) =>
        directory && names_of_folders.includes(directory.subdir)
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
    : decodeURIComponent(query.dataset_name as string);

  params.run_number = params.run_number ? params.run_number : query.run_number;

  params.folder_path = params.folder_path
    ? removeFirstSlash(params.folder_path as string)
    : query.folder_path;

  params.workspaces = params.workspaces ? params.workspaces : query.workspaces;

  params.overlay = params.overlay ? params.overlay : query.overlay;

  params.overlay_data =
    params.overlay_data === '' || params.overlay_data
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

  params.lumi = params.lumi || params.lumi === 0 ? params.lumi : query.lumi;

  //cleaning url: if workspace is not set (it means it's empty string), it shouldn't be visible in url
  const cleaned_parameters = cleanDeep(params);

  return cleaned_parameters;
};

export const changeRouter = (parameters: ParsedUrlQueryInput) => {
  const stringified = qs.stringify(parameters, {});
  const url_which_is_visible = root_url_ !== '/' ? `${root_url_}?${stringified}` : undefined

  Router.push({
    pathname: '',
    query: parameters,
  },
    url_which_is_visible
  );
};

export const getNameAndDirectoriesFromDir = (content: PlotInterface) => {
  const dir = content.path;
  const partsOfDir = dir.split('/');
  const name = partsOfDir.pop();
  const directories = partsOfDir.join('/');

  return { name, directories };
};

export const is_run_selected_already = (
  run: { run_number: string; dataset_name: string },
  query: QueryProps
) => {
  return (
    run.run_number === query.run_number &&
    run.dataset_name === query.dataset_name
  );
};

export const choose_api = (params: ParamsForApiProps) => {
  const current_api = !functions_config.new_back_end.new_back_end
    ? get_folders_and_plots_old_api(params)
    : chooseNewApiForGettingFolders(params);
  return current_api;
};

const chooseNewApiForGettingFolders = (params: ParamsForApiProps) => {
  if (isItLiveMode(params as any)) {
    return get_folders_and_plots_new_api_with_live_mode(params)
  } else {
    return get_folders_and_plots_new_api(params);
  }
}

export const choose_api_for_run_search = (params: ParamsForApiProps) => {
  const current_api = !functions_config.new_back_end.new_back_end
    ? get_run_list_by_search_old_api(params)
    // : params.run_number === '0' && params.dataset_name === "/Global/Online/ALL"
    //   ? get_run_list_by_search_new_api_with_no_older_than(params)
    : get_run_list_by_search_new_api(params);

  return current_api;
};

export var get_plots_grouped_by_layouts = (plots) => {
  const plots_with_layouts = plots.filter((plot) => plot.hasOwnProperty('layout'))
  const plots_with_layouts_ = _.chain(plots_with_layouts).sortBy('layout').groupBy('layout').value()

  const plots_without_layouts_ = plots.filter((plot) => !plot.hasOwnProperty('layout'))
  return { plots_with_layouts_, plots_without_layouts_ }
}