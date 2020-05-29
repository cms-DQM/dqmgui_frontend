import * as React from 'react'
import Router, { useRouter } from 'next/router';

import { QueryProps } from '../containers/display/interfaces'
import { ParsedUrlQueryInput } from 'querystring';

export const useChangeRouter = (params: ParsedUrlQueryInput, watchers: (string | number | undefined)[] = [], condition: boolean) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  
  params.dataset_name = params.dataset_name ? params.dataset_name : query.dataset_name
  params.run_number = params.run_number ? params.run_number : query.run_number
  params.folder_path = params.folder_path ? params.folder_path : query.folder_path
  params.workspace = params.workspace ? params.workspace : query.workspace
  params.overlay = params.overlay ? params.overlay : query.overlay
  params.overlay_data = params.overlay_data ? params.overlay_data : query.overlay_data
  params.selected_plots = params.selected_plots ? params.selected_plots : query.selected_plots

  React.useEffect(() => {
    if (condition) {
      Router.replace({
        pathname: '/',
        query: params,
      });
    }
  }, watchers)
}