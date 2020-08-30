import * as React from 'react';

import { functions_config } from '../config/config';
import { useRouter } from 'next/router';
import { QueryProps } from '../containers/display/interfaces';
import { store } from '../contexts/leftSideContext';

export const useUpdateLiveMode = (errors: any[]) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const current_time = new Date().getTime();

  const [not_older_than, set_not_older_than] = React.useState(current_time)

  const online_mode = functions_config.mode === 'ONLINE'
  // latest runs list should be updated when online mode is on
  //!query.search_dataset_name && !query.run_number because latest runs list is visible in inital page (when no data is selected)
  const latest_runs_list = online_mode && functions_config.new_back_end.latest_runs && functions_config.new_back_end.new_back_end && !query.search_dataset_name && !query.search_run_number && errors.length === 0
  // live mode - it's when dataset is  "/Global/Online/ALL" and run number is "0"
  const live_mode = query.run_number === "0" && query.dataset_name === "/Global/Online/ALL" && online_mode && errors.length === 0 && functions_config.new_back_end.new_back_end
  //not_older_than seconds should be reachtable globaly 
  const { set_updated_by_not_older_than } = React.useContext(store);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (latest_runs_list || live_mode) {
        set_not_older_than(() => {
          // 1 sec is 1000 milisec. we dividing by 10000 and multiply by 10, because we need to
          // have rounded sec. for exmaple: if it is 13, we need to have 10, or 26, we need to have 20 and etc.
          const seconds = Math.round(new Date().getTime() / 10000) * 10;
          return seconds;
        });
      }
    }, 10000);
    if (!latest_runs_list && !live_mode || errors.length !== 0) {
      clearInterval(interval)
    }
  }, []);

  React.useEffect(() => {
    set_updated_by_not_older_than(not_older_than)
  }, [not_older_than])

  return { not_older_than }
}