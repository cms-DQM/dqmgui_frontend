import * as React from 'react';

import {
  QueryProps,
  PlotInterface,
  DirectoryInterface,
} from '../containers/display/interfaces';
import { usePlotSearch } from './usePlotSearch';
import { useFilterFoldersByWorkspaces } from './useFilterFoldersByWorkspace';
import {
  getFilteredDirectories,
  getDirectories,
} from '../containers/display/utils';

export const useFilterFolders = (
  query: QueryProps,
  contents: (PlotInterface & DirectoryInterface)[]
) => {
  const [foldersByPlotSearch, setFoldersByPlotSearch] = React.useState<
    string[]
  >([]);
  const [
    folders_found_by_dataset_or_run,
    set_folders_found_by_dataset_or_run,
  ] = React.useState<(string | undefined)[]>([]);
  const allDirectories = getDirectories(contents);

  const plot_name = query.plot_search ? query.plot_search : '.*';
  const { directories, plots, isLoading, errors } = usePlotSearch(
    plot_name,
    query.run_number,
    query.dataset_name,
    query.folder_path
  );
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
      foldersFromWorkspaces
    );

    setFoldersByPlotSearch(folders as any);
  }, [directories, filteredFolders, folders_found_by_dataset_or_run]);

  const isLoadingFolders = isLoading;
  return { foldersByPlotSearch, plots, isLoadingFolders };
};
