import * as React from 'react';
import { QueryProps } from '../containers/display/interfaces';
import _ from 'lodash';
import { removeFirstSlash } from '../components/workspaces/utils';
import { store } from '../contexts/leftSideContext';


export const useFilterFoldersByWorkspaces = (query: QueryProps) => {
  const [availableFolders, setAvailableFolders] = React.useState<string[]>([])
  const filteredInnerFolders: string[] = []

  const workspace = query.workspace
  const folderPathFromQuery = query.folder_path

  const globalState = React.useContext(store)
  const { setWorkspaceFolders } = globalState

  React.useEffect(() => {
    if (workspace && !folderPathFromQuery) {
      const firstLayerFolders = _.uniq(availableFolders.map((foldersPath: string) => {
        const firstLayer = foldersPath.split('/')[0]
        return firstLayer
      }))
      setWorkspaceFolders(firstLayerFolders)
    }
    else if (!!workspace && !!folderPathFromQuery) {


      availableFolders.forEach((foldersPath: string) => {
        const folderPathFromQueryWithoutFirstSlash = removeFirstSlash(folderPathFromQuery) //if folderPath has a slash in the begining- removing it
        const matchBeginingInAvailableFolders = foldersPath.search(folderPathFromQueryWithoutFirstSlash) //searching in available folders, is clicked folder is part of availableFolders path

        if (matchBeginingInAvailableFolders >= 0) {

          // if selected folder is a part of available folderspath, we trying to get further layer folders.
          //matchEnd is the index, which indicates the end of seleced folder path string (we can see it in url) in available path
          // (availble path we set with setAvailableFolders action)
          const matchEnd = matchBeginingInAvailableFolders + folderPathFromQueryWithoutFirstSlash.length
          const restFolders = foldersPath.substring(matchEnd, foldersPath.length)
          const firstLayerFolderOfRest = restFolders.split('/')[1]

          //if it is the last layer firstLayerFolderOfRest will be undef.
          // in this case filteredInnerFolders will be empty array
          if (firstLayerFolderOfRest) {
            filteredInnerFolders.push(firstLayerFolderOfRest)
          }
        }
      })
      setWorkspaceFolders(filteredInnerFolders)
    }
  }, [query.folder_path, query.workspace])

  return { setAvailableFolders }
}