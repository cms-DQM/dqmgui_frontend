import { useEffect, useState } from 'react';
import { Image } from '../../containers/display/styledComponents';
import { Spinner } from '../../containers/search/styledComponents';
import { CustomDiv } from '../styledComponents';

export const ImageFallback = ({ src, retryTimes, setImageError, ...props }: any) => {
  delete props.onError;
  const [final_src, setSrc] = useState(src);
  const [tries, setTries] = useState(0);
  const [key, setKey] = useState(new Date())

  const [imageLoading, setImageLoading] = useState(true);
  const displaySpinner = (imageLoading: boolean) => imageLoading && displayImage !== 'none' ? 'flex' : 'none'

  const displayImage = props.style.display

  const onError = () => {
    if (tries + 1 < retryTimes) {
      setTries(tries + 1);
      setSrc(`${src}`);
      setKey(new Date())
    } else {
      setImageLoading(false)
      setImageError(true);
      throw `Image loading failed after ${retryTimes} times`;
    }
  };

  useEffect(() => {
    setSrc(`${src}`);
  }, [src])

  return (<>
    <CustomDiv
      display={displaySpinner(imageLoading)}
      justifycontent="center"
      width="100%">
      <Spinner />
    </CustomDiv>
    <Image
      display={displaySpinner(!imageLoading)}
      src={final_src}
      {...props}
      key={key}
      onError={onError}
      onLoad={() => setImageLoading(false)}
    />
  </>)
};
