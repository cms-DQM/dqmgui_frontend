import { useRouter } from 'next/router';
import * as React from 'react';

import { QueryProps } from '../containers/display/interfaces';
import { functions_config } from '../config/config';

export const useUpdateLiveMode = () => {
  const current_time = Math.floor(new Date().getTime() / 1000);
  const [not_older_than, set_not_older_than] = React.useState(current_time);
  const [not_older_than_in_interval, set_not_older_than_in_interval] = React.useState(current_time);
  const [update, set_update] = React.useState(false)

  const router = useRouter();
  const query: QueryProps = router.query;
  const { run_number, dataset_name } = query
  
  React.useEffect(() => {
    if (run_number === '0' && dataset_name === "/Global/Online/ALL") {
      set_update(true)
    } else if (functions_config.mode === "ONLINE" && Object.keys(query).length === 0) {
      //when query={} it means that users will the lastest runs list, which has to be updated
      set_update(true)
    }
    else {
      set_update(false)
    }
  }, [run_number, dataset_name, functions_config.mode, Object.keys(query).length]);

  const interval = setInterval(() => {
    set_not_older_than_in_interval(() => {
      // 1 sec is 1000 milisec. we dividing by 10000 and multiply by 20, because we need to
      // have rounded sec. for exmaple: if it is 13, we need to have 20, or 36, we need to have 20 and etc.
      const seconds = Math.floor(new Date().getTime() / 1000);
      return seconds;
    });
  }, 20000);
  
  React.useEffect(() => {
    if (update) {
      set_not_older_than(not_older_than_in_interval)
    } else {
      clearInterval(interval);
    }
  }, [update, not_older_than_in_interval]);


  return { not_older_than };
};
