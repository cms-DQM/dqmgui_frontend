import { useRouter } from 'next/router';
import * as React from 'react';
import { makeid } from '../../../../components/utils';

import { store } from '../../../../contexts/globalStateContext';
import { store as updateStore } from '../../../../contexts/updateContext';
import { useBlink } from '../../../../hooks/useBlink';
import { isItLiveMode } from '../../../../utils';
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

  const live_mode_is_on = isItLiveMode({ run_number: query.run_number as string, dataset_name: query.dataset_name as string})
  const watchers = live_mode_is_on ? [workspace, query.folder_path, query.plot_search, not_older_than] : [workspace, query.folder_path, query.plot_search]
  const { blink } = useBlink(not_older_than)

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
    if (live_mode_is_on)
      addLoader({ value: loading, id: id_ })
  }, [loading])

  React.useEffect(() => {
    fetch_folders_and_plots()
  }, watchers)

  return { folders: folders_, plots: plots_, isLoading: loading, errors: error, blink: blink }
}