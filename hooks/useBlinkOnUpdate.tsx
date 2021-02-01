import * as React from 'react';

import { store } from '../contexts/leftSideContext';

export const useBlinkOnUpdate = () => {
  const { updated_by_not_older_than } = React.useContext(store);
  const [blink, set_blink] = React.useState(updated_by_not_older_than);

  React.useEffect(() => {
    //timeouts in order to get longer and more visible animation
    setTimeout(() => {
      set_blink(true);
    }, 0);
    setTimeout(() => {
      set_blink(false);
    }, 2000);
  }, [updated_by_not_older_than]);
  return { blink, updated_by_not_older_than };
};
