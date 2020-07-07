import * as React from 'react';

import { QueryProps } from '../containers/display/interfaces';
import { usePlotSearch } from './usePlotSearch';
import { useFilterFoldersByWorkspaces } from './useFilterFoldersByWorkspace';
import { getFilteredDirectories } from '../containers/display/utils';

export const useFilterFolders = (query: QueryProps, allDirectories: (string | undefined)[]) => {
  const [foldersByPlotSearch, setFoldersByPlotSearch] = React.useState<string[]>([]);
  const [folders_found_by_dataset_or_run, set_folders_found_by_dataset_or_run] = React.useState<(string | undefined)[]>([])

  const plot_name = query.plot_search ? query.plot_search : '.*';
  const { directories, plots, isLoading, errors } = usePlotSearch(
    plot_name,
    query.run_number,
    query.dataset_name,
    query.folder_path
  );
  const { filteredFolders } = useFilterFoldersByWorkspaces(query);

  React.useEffect(() => {
    set_folders_found_by_dataset_or_run(allDirectories)
  }, [query.dataset_name, query.run_number])

  React.useEffect(() => {
    // if workspaces returns empty array, it means that need to return all possible folders
    const foldersFromWorkspaces =
      filteredFolders.length > 0 ? filteredFolders : folders_found_by_dataset_or_run;

    const folders = getFilteredDirectories(
      directories as any,
      foldersFromWorkspaces
    );

    setFoldersByPlotSearch(folders as any);
  }, [directories, filteredFolders, folders_found_by_dataset_or_run]);

  const isLoadingFolders = isLoading;
  return { foldersByPlotSearch, plots, isLoadingFolders };
};
