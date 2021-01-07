import { NextPage } from 'next'
import { useRouter } from 'next/router';
import * as React from 'react'
import { sizes } from '../components/constants';
import { ImageFallback } from '../components/plots/imageFallback';
import { get_plot_url, root_url } from '../config/config';
import { ParamsForApiProps, QueryProps } from '../containers/display/interfaces';

interface PlotsLocalOverlayContentProps {
  plotUrl: string;
  params_for_api: ParamsForApiProps
}

export const PlotsLocalOverlayContent = ({ plotUrl, params_for_api }: PlotsLocalOverlayContentProps) => {
  const [url, setUrl] = React.useState(`${root_url}${plotUrl};`)

  React.useEffect(() => {
    console.log(url, 'sss', `${root_url}${get_plot_url(params_for_api)};`, params_for_api)
    setUrl(`${root_url}${get_plot_url(params_for_api)};`)
  }, [params_for_api])

  React.useEffect(() => {
    console.log(url, 'ooo', `${root_url}${plotUrl};`)
    setUrl(`${root_url}${plotUrl};`)
  }, [plotUrl])

  return (<ImageFallback
    retryTimes={3}
    style={{ display: 'display' }}
    src={url}
    // setImageError={setImageError}
    width={'auto'}
    height={'auto'}
  />)
}