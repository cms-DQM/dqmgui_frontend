import * as React from 'react';

export const useBlink = (not_older_than: number) => {
  const [blink, set_blink] = React.useState(false);

  React.useEffect(() => {
    //timeouts in order to get longer and more visible animation
    setTimeout(() => {
      set_blink(true);
    }, 0);
    setTimeout(() => {
      set_blink(false);
    }, 2000);
  }, [not_older_than]);
  
  return { blink }
}