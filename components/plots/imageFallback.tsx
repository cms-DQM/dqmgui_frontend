import { useEffect, useState } from 'react';
import { Image } from '../../containers/display/styledComponents';

export const ImageRetry = ({ src, retryTimes, ...props }: any) => {
  delete props.onError;
  const [final_src, setSrc] = useState(src);
  const [tries, setTries] = useState(0);

  const onError = (error: any) => {
    if (tries + 1 < retryTimes) {
      setTries(tries + 1);
      setSrc(`${src}`);
    } else {
      console.log('big error, retyr failed more than ', retryTimes);
      throw 'this error';
    }
  };
  return <Image src={final_src} {...props} />;
};
