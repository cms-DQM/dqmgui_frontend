import { useRouter } from 'next/router';
import * as React from 'react';

import { QueryProps } from '../containers/display/interfaces';
import { functions_config } from '../config/config';

const useUpdate = () => {
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

  return { update }
}

export const useUpdateLiveMode = () => {
  const current_time = Math.floor(new Date().getTime() / 1000);
  const [not_older_than, set_not_older_than] = React.useState(current_time);
  const [not_older_than_in_interval, set_not_older_than_in_interval] = React.useState(current_time);
  const { update } = useUpdate()

  const interval = setInterval(() => {
    set_not_older_than_in_interval(() => {
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
