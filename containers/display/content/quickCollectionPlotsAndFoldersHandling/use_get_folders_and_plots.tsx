import { useRouter } from 'next/router';
import * as React from 'react';
import { makeid } from '../../../../components/utils';
import { functions_config } from '../../../../config/config';

import { store } from '../../../../contexts/globalStateContext';
import { store as updateStore } from '../../../../contexts/updateContext';
import { get_filtered_folders_and_plots } from './get_filtered_folders_and_plots';

export const use_get_folders_and_plots = () => {
  const [folders_, set_folders_] = React.useState([])
  const [plots_, set_plots_] = React.useState([])
  const [loading, set_loading] = React.useState(false)
  const [error, set_error] = React.useState('')
  const id_ = makeid()


  const router = useRouter();
  const { query } = router
  const { workspace } = React.useContext(store)
  const { not_older_than, addLoader } = React.useContext(updateStore)
  const watchers = functions_config.mode === "ONLINE" ? [workspace, query.folder_path, query.plot_search, not_older_than] : [workspace, query.folder_path, query.plot_search]

  const fetch_folders_and_plots = () => {
    set_loading(true)
    get_filtered_folders_and_plots(query, workspace)
      .then((response) => {
        set_loading(false)
        const { folders, plots } = response
        set_folders_(folders)
        set_plots_(plots)
      })
      .catch((error) => {
        set_loading(false)
        set_error(error)
        console.error(error)
      })
  }

  React.useEffect(() => {
    if (functions_config.mode === "ONLINE")
      addLoader({ value: loading, id: id_ })
  }, [loading])

  React.useEffect(() => {
    fetch_folders_and_plots()
  }, watchers)

  return { folders: folders_, plots: plots_, isLoading: loading, errors: error }
}