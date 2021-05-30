import * as React from 'react';
import _ from 'lodash';

import {
  QueryProps,
  DirectoryInterface,
} from '../containers/display/interfaces';
import { removeFirstSlash } from '../components/workspaces/utils';
import { WorkspaceProps, workspaces } from '../workspaces/offline';
import { useRouter } from 'next/router';
import { getFilteredDirectories } from '../containers/display/utils';
import { store } from '../contexts/globalStateContext';

export const useDataFromWorkspaces = (
  allFolders: DirectoryInterface[],
  watchers?: any[]
) => {
  const [availableFolders, setAvailableFolders] = React.useState<string[]>([]);
  const [layouts_of_quick_collections, set_layouts_of_quick_collections] = React.useState<string[]>([]);
  const [folders_from_workspace_config, set_folders_from_workspace_config] = React.useState<
    DirectoryInterface[]
  >([]);
  const [filteredFolders, setFilteredFolders] = React.useState<
    DirectoryInterface[]
  >([]);
  const router = useRouter();
  const query: QueryProps = router.query;

  const filteredInnerFolders: string[] = [];

  const { workspace } = React.useContext(store)
  const folderPathFromQuery = query.folder_path;
  const plot_search = query.plot_search;

  React.useEffect(() => {
    //getting folderPath by selected workspace
    workspaces.forEach((workspaceFromList: any) => {
      workspaceFromList.workspaces.forEach((oneWorkspace: WorkspaceProps) => {
        if (oneWorkspace.label === workspace) {
          setAvailableFolders(oneWorkspace.foldersPath);
          set_layouts_of_quick_collections(oneWorkspace.quickCollections)
        }
      });
    });
  }, [workspace]);

  React.useEffect(() => {
    if (!availableFolders) {
      set_folders_from_workspace_config([{ subdir: null }])
    }
    else if (workspace && !folderPathFromQuery) {
      const firstLayerFolders = _.uniq(
        availableFolders.map((foldersPath: string) => {
          const firstLayer = foldersPath.split('/')[0];
          return firstLayer;
        })
      );
      const folders_object = firstLayerFolders.map((folder: string) => {
        return { subdir: folder };
      });
      set_folders_from_workspace_config(folders_object);
    } else if (!!workspace && !!folderPathFromQuery) {
      availableFolders.forEach((foldersPath: string) => {
        const folderPathFromQueryWithoutFirstSlash = removeFirstSlash(
          folderPathFromQuery
        ); //if folderPath has a slash in the begining- removing it
        const matchBeginingInAvailableFolders = foldersPath.search(
          folderPathFromQueryWithoutFirstSlash
        ); //searching in available folders, is clicked folder is part of availableFolders path

        if (matchBeginingInAvailableFolders >= 0) {
          // if selected folder is a part of available folderspath, we trying to get further layer folders.
          //matchEnd is the index, which indicates the end of seleced folder path string (we can see it in url) in available path
          // (availble path we set with setAvailableFolders action)
          const matchEnd =
            matchBeginingInAvailableFolders +
            folderPathFromQueryWithoutFirstSlash.length;
          const restFolders = foldersPath.substring(
            matchEnd,
            foldersPath.length
          );
          const firstLayerFolderOfRest = restFolders.split('/')[1];

          //if it is the last layer firstLayerFolderOfRest will be undef.
          // in this case filteredInnerFolders will be empty array
          if (firstLayerFolderOfRest) {
            filteredInnerFolders.push(firstLayerFolderOfRest);
          }
        }
      });
      const folders_object = filteredInnerFolders.map((folder: string) => {
        //need to have the same format as directories got from api or by plot search
        return { subdir: folder };
      });
      set_folders_from_workspace_config(folders_object);
    }
  }, [folderPathFromQuery, availableFolders, plot_search]);


  // Filter folders from all accessible at current moment
  React.useEffect(() => {
    if (folders_from_workspace_config.length === 0) {
      setFilteredFolders(allFolders)
    } else if (folders_from_workspace_config.length === 1 && folders_from_workspace_config[0].subdir === null) {
      setFilteredFolders([])
    } else {
      const folders = getFilteredDirectories(
        allFolders as any,
        folders_from_workspace_config as any
      );
      setFilteredFolders(folders)
    }
  }, [folders_from_workspace_config])

  return { filteredFolders, layouts_of_quick_collections };
};
