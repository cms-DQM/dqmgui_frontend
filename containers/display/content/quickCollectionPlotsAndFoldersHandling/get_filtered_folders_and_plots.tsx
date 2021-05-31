import { pathOr } from 'ramda';

import { get_all_plots_and_folders } from './get_all_plots_and_folders';
import { get_filter_folders_and_plots } from './get_filter_folders_and_plots';
import { get_plots_and_folders_from_workspace } from './get_plots_and_folders_from_workspace';
import { get_plots_from_quick_collection } from './get_plots_friom_quick_collection';

export const get_filtered_folders_and_plots = async (query, workspace) => {
    
    const all_folders_and_plots = await get_all_plots_and_folders(query).then(resp => resp)
    const all_folders = pathOr(null, ['folders'], all_folders_and_plots)
    const all_plots = pathOr('', ['plots'], all_folders_and_plots)

    const all_folders_and_plots_form_workspace = await get_plots_and_folders_from_workspace(workspace, query.folder_path)
    const quickCollections = pathOr('', ['quickCollections'], all_folders_and_plots_form_workspace) //if all_folders_and_plots_form_workspace.quickCollections is undef/null - it will return empty string
    const folders_from_workspace = pathOr(null, ['folders'], all_folders_and_plots_form_workspace)

    const plots_from_quick_collection = await get_plots_from_quick_collection(quickCollections)
    const filter_folders_and_plots = get_filter_folders_and_plots(folders_from_workspace, all_folders, plots_from_quick_collection, all_plots)

    const folders = pathOr([], ['folders'], filter_folders_and_plots)
    const plots = pathOr([], ['plots'], filter_folders_and_plots)

    return { folders, plots }
}