import * as React from 'react';

import { store } from '../contexts/leftSideContext';

export const useUpdateLiveMode = () => {
  const current_time = new Date().getTime();
  const [not_older_than, set_not_older_than] = React.useState(current_time);
  const [blink, set_blink] = React.useState(false);

  const {
    set_updated_by_not_older_than,
    update,
    set_update,
  } = React.useContext(store);

  const create_an_interval = () => {
    const interval = setInterval(() => {
      set_not_older_than(() => {
        // 1 sec is 1000 milisec. we dividing by 10000 and multiply by 20, because we need to
        // have rounded sec. for exmaple: if it is 13, we need to have 20, or 36, we need to have 20 and etc.
        const seconds = Math.floor(new Date().getTime() / 1000) + 10 * 1000;
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
    update
  ]);

  React.useEffect(() => {
    if (update) {
      set_updated_by_not_older_than(not_older_than);
    }
  }, [not_older_than, update]);


  React.useEffect(() => {
    //timeouts in order to get longer and more visible animation
    setTimeout(() => {
      set_blink(true);
    }, 0);
    setTimeout(() => {
      set_blink(false);
    }, 2000);
  }, [not_older_than]);

  return { not_older_than, set_update, update, blink };
};
