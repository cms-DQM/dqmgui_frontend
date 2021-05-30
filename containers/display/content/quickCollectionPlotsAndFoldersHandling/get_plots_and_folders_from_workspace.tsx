import { uniq } from 'ramda';

import { workspaces as online_workspaces } from '../../../../workspaces/online'
import { workspaces as offline_workspaces } from '../../../../workspaces/offline'
import { functions_config } from '../../../../config/config'

const all_workspaces = functions_config.mode === 'ONLINE' ? online_workspaces : offline_workspaces

export const get_plots_and_folders_from_workspace = (selected_workspace, current_path) => {
  let workspaces_section;
  let folders;
  let quickCollections;

  for (workspaces_section of all_workspaces) {
    const workspace_info = workspaces_section.workspaces.filter(workspace => workspace.label === selected_workspace)
    if (workspace_info.length > 0) {
      const all_folders_path = workspace_info[0].foldersPath;
      const layers = current_path ? current_path.split('/').length : 0
      //all_folders_path can be null, when it has no folders in workspace
      if (all_folders_path) {
        folders = all_folders_path.map(folders_path => {
          const folders_in_path = folders_path.split('/')
          if (folders_in_path.length >= layers) {
            return folders_in_path[layers]
          } else {
            return []
          }
        })
      }
      else {
        folders = null
      }
      // quickCollections should be shown just on the top level of folders' structure
      if (layers >= 1) {
        quickCollections = []
      } else {
        quickCollections = workspace_info[0].quickCollections
      }
      break;
    }
  }
  const folders_ = folders ? uniq(folders).filter(Boolean) : null //filter(Boolean) removes empty and undef values from array
  return { folders: folders_, quickCollections }
}