import * as React from 'react';

import {
  QueryProps,
  PlotInterface,
  DirectoryInterface,
} from '../containers/display/interfaces';
import { useFilterFoldersByWorkspaces } from './useFilterFoldersByWorkspace';
import {
  getFilteredDirectories,
  getDirectories,
  choose_api,
  getContents,
} from '../containers/display/utils';
import { useNewer } from './useNewer';
import { useRequest } from './useRequest';
import { useConstructFullPlotObject } from './useConstructFullPlotObject';
import { functions_config } from '../config/config';
import cleanDeep from 'clean-deep';

export const useFilterFolders = (
  query: QueryProps,
  params: any,
  updated_by_not_older_than: any
) => {
  const [foldersByPlotSearch, setFoldersByPlotSearch] = React.useState<
    string[]
  >([]);
  const [
    folders_found_by_dataset_or_run,
    set_folders_found_by_dataset_or_run,
  ] = React.useState<DirectoryInterface[]>([]);
  const [directories, setDirectories] = React.useState<DirectoryInterface[]>(
    []
  );
  const [plots, setPlots] = React.useState<any[]>([]);
  const [isLoading, setLoading] = React.useState(false);

  const current_api = choose_api(params);

  const data_get_by_not_older_than_update = useRequest(
    current_api,
    {},
    [updated_by_not_older_than],
    functions_config.mode.onlineode
  );

  const data_get_by_folder_run_dataset_update = useRequest(current_api, {}, [
    query.folder_path,
    query.run_number,
    query.dataset_name,
    query.plot_search,
  ]);
  // with useNewer hook we distinguish witch data is newer: got by
  // notOlderThan param change or by dataset, run number, folder path change.
  const data = useNewer(
    data_get_by_folder_run_dataset_update.data,
    data_get_by_not_older_than_update.data
  );
  const errors = useNewer(
    data_get_by_folder_run_dataset_update.errors,
    data_get_by_not_older_than_update.errors
  );

  const contents: (PlotInterface & DirectoryInterface)[] = getContents(data);
  const allDirectories = getDirectories(contents);

  const formattedPlotsObject = useConstructFullPlotObject(contents, data);

  React.useEffect(() => {
    setDirectories(getDirectories(contents));
    setPlots(cleanDeep(formattedPlotsObject));
  }, [
    data,
    query.folder_path,
    isLoading,
    query.dataset_name,
    formattedPlotsObject,
  ]);

  const { filteredFolders } = useFilterFoldersByWorkspaces(query);

  React.useEffect(() => {
    set_folders_found_by_dataset_or_run(allDirectories);
    //need to check is allDirectories is changed. Stringify, because allDirectories
    //updates to often. TODO: find out why
  }, [query.dataset_name, query.run_number, JSON.stringify(allDirectories)]);

  React.useEffect(() => {
    // if workspaces returns empty array, it means that need to return all possible folders
    const foldersFromWorkspaces =
      filteredFolders.length > 0
        ? filteredFolders
        : folders_found_by_dataset_or_run;

    const folders = getFilteredDirectories(
      directories as any,
      foldersFromWorkspaces as any
    );

    //isLoading got by dataset name, run and folder path change calls spinner.
    // we don't want to have a spinner when data is updating on notOlderThan
    //param change (i.e. every 10 sec.)
    const isLoading = data_get_by_folder_run_dataset_update.isLoading;

    //need to setLoading in this useEffect, because we want to see spinner
    // until all folders and plots will be filtered accroding to a plot search or workspace.

    // if we use just const isLoading = data_get_by_folder_run_dataset_update.isLoading;
    // then we see spinner just until useRequest will be finished. It means, that when spinner won't
    // be visible anymore, for some seconds we will see previuos content of folder and just
    // afet it the real content offolder will be shown.
    setLoading(isLoading);

    setFoldersByPlotSearch(folders as any);
  }, [directories, filteredFolders, folders_found_by_dataset_or_run, errors]);

  return { foldersByPlotSearch, plots, isLoading, errors };
};
