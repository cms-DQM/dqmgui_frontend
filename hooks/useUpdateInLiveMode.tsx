import * as React from 'react';

import { store } from '../contexts/leftSideContext';
import { useRouter } from 'next/router';
import { QueryProps } from '../containers/display/interfaces';

export const useUpdateLiveMode = () => {
  const current_time = new Date().getTime();

  const [not_older_than, set_not_older_than] = React.useState(current_time);
  const {
    set_updated_by_not_older_than,
    update,
    set_update,
  } = React.useContext(store);
  const router = useRouter();
  const query: QueryProps = router.query;

  const create_an_interval = () => {
    const interval = setInterval(() => {
      set_not_older_than(() => {
        // 1 sec is 1000 milisec. we dividing by 10000 and multiply by 20, because we need to
        // have rounded sec. for exmaple: if it is 13, we need to have 20, or 36, we need to have 20 and etc.
        const seconds = Math.round(new Date().getTime() / 10000) * 20;
        return seconds;
      });
    }, 20000);
    return interval;
  };

  React.useEffect(() => {
    const interval = create_an_interval();
    if (!update) {
      clearInterval(interval);
    }
  }, [
    update,
    query.run_number,
    query.dataset_name,
    query.folder_path,
    query.search_dataset_name,
    query.search_run_number,
  ]);

  React.useEffect(() => {
    if (update) {
      set_updated_by_not_older_than(not_older_than);
    }
  }, [not_older_than, update]);

  return { not_older_than, set_update, update };
};
