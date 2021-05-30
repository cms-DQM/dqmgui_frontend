import {  unnest } from 'ramda';

export const get_filter_folders_and_plots = (folders_from_workspace, all_folders, quick_collections, plots) => {
  const plots_from_quick_collections = unnest(quick_collections)
  const all_plots = plots_from_quick_collections.concat(plots)

  if (!folders_from_workspace) {
    return { folders: [], plots: all_plots }
  } else if (folders_from_workspace.length === 0) {
    return { folders: all_folders, plots: all_plots }
  } else {
    const filtered = all_folders.filter(folder => folders_from_workspace.includes(folder.subdir))
    return { folders: filtered, plots: all_plots }
  }
}