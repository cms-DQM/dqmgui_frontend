import * as React from 'react';
import { QueryProps } from '../containers/display/interfaces';
import { usePlotSearch } from './usePlotSearch';
import { useFilterFoldersByWorkspaces } from './useFilterFoldersByWorkspace';
import { getFilteredDirectories } from '../containers/display/utils';

export const useFilterFolders = (query: QueryProps, allDirectories: any[]) => {
  const [foldersByPlotSearch, setFoldersByPlotSearch] = React.useState([]);

  const plot_name = query.plot_search ? query.plot_search : '.*';
  const { directories, plots, isLoading, errors } = usePlotSearch(
    plot_name,
    query.run_number,
    query.dataset_name,
    query.folder_path
  );
  const { filteredFolders } = useFilterFoldersByWorkspaces(query);

  React.useEffect(() => {
    // if workspaces returns empty array, it means that need to return all possible folders
    const foldersFromWorkspaces =
      filteredFolders.length > 0 ? filteredFolders : allDirectories;
    const folders = getFilteredDirectories(
      directories as any,
      foldersFromWorkspaces
    );
    setFoldersByPlotSearch(folders as any);
  }, [directories, filteredFolders]);

  const isLoadingFolders = isLoading;
  return { foldersByPlotSearch, plots, isLoadingFolders };
};
