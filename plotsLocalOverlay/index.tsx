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

  return (<ImageFallback
    retryTimes={3}
    style={{ display: 'display' }}
    src={`${root_url}${plotUrl};`}
    width={'auto'}
    height={'auto'}
  />)
}