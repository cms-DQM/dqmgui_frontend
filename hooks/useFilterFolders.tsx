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
import { useRequest } from './useRequest';
import { useConstructFullPlotObject } from './useConstructFullPlotObject';
import cleanDeep from 'clean-deep';
import { makeid } from '../components/utils';
import { useBlink } from './useBlink';
import { store } from '../contexts/updateContext';
import { isItLiveMode } from '../utils';

export const useFilterFolders = (
  query: QueryProps,
  params: any,
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
  const [loading, setLoading] = React.useState(false);
  const [id, setId] = React.useState<string>()
  const { not_older_than, addLoader } = React.useContext(store)
  const { blink } = useBlink(not_older_than)
  params.notOlderThan = not_older_than
  const current_api = choose_api(params);

  const { data, isLoading, errors } = 
  isItLiveMode(params) ?
  useRequest(current_api, {}, [
    query.folder_path,
    query.run_number,
    query.dataset_name,
    query.plot_search,
    not_older_than
  ]):
  useRequest(current_api, {}, [
    query.folder_path,
    query.run_number,
    query.dataset_name,
    query.plot_search,
  ])


  React.useEffect(() => {
    const id_ = makeid()
    setId(id_)
  }, [])

  React.useEffect(() => {
    addLoader({ value: loading, id })
  }, [loading])

  const contents: (PlotInterface & DirectoryInterface)[] = getContents(data);
  const allDirectories = getDirectories(contents);

  const formattedPlotsObject = useConstructFullPlotObject(contents, data);

  React.useEffect(() => {
    setDirectories(getDirectories(contents));
    setPlots(cleanDeep(formattedPlotsObject));
  }, [
    data,
    query.folder_path,
    loading,
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
    // const isLoading = data_get_by_folder_run_dataset_update.isLoading;

    //need to setLoading in this useEffect, because we want to see spinner
    // until all folders and plots will be filtered accroding to a plot search or workspace.

    // if we use just const isLoading = data_get_by_folder_run_dataset_update.isLoading;
    // then we see spinner just until useRequest will be finished. It means, that when spinner won't
    // be visible anymore, for some seconds we will see previuos content of folder and just
    // afet it the real content offolder will be shown.
    setLoading(isLoading);

    setFoldersByPlotSearch(folders as any);
  }, [directories, filteredFolders, folders_found_by_dataset_or_run, errors]);

  return { foldersByPlotSearch, plots, isLoading, errors, blink };
};
