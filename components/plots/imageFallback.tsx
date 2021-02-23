import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Spinner } from '../../containers/search/styledComponents';
import { CustomDiv } from '../styledComponents';
import { PlotUploadIdicator } from './plot/plotsWithLayouts/styledComponents';

export const ImageFallback = ({
  src,
  retryTimes,
  setImageError,
  ...props
}: any) => {
  delete props.onError;
  const [final_src, setSrc] = useState(src);
  const [tries, setTries] = useState(0);
  const [key, setKey] = useState(new Date().getTime());

  const [imageLoading, setImageLoading] = useState(true);
  const displaySpinner = (imageLoading: boolean) =>
    imageLoading && displayImage !== 'none' ? 'flex' : 'none';


  const displayImage = props.style.display;

  const onError = () => {
    if (tries + 1 < retryTimes) {
      setTries(tries + 1);
      setSrc(`${src}`);
      setKey(new Date().getTime());
    } else {
      setImageLoading(false);
      setImageError(true);
      throw `Image loading failed after ${retryTimes} times`;
    }
  };

  useEffect(() => {
    setKey(new Date().getTime())
    setSrc(`${src}`);
  }, [src]);

  return (
    <>
      <PlotUploadIdicator
        uploaded={imageLoading.toString()}>
      <div>
        <img
          src={final_src}
          {...props}
          key={key}
          onError={onError}
          onLoad={
            () => {
              props.onLoad()
              setImageLoading(false)
            }}
        />
      </div>
    </PlotUploadIdicator>
    </>
  );
};
