import * as React from 'react'

import { ImageFallback } from '../../../components/plots/imageFallback';
import { get_plot_url, get_plot_with_overlay_new_api, root_url } from '../../../config/config';
import { ParametersForApi } from '../../interfaces';

interface PlotProps {
  parameters: ParametersForApi
}

export const OnePlot = ({ parameters }: PlotProps) => {
  const isItMoreThanOnePlot = parameters.overlaidSeparately ? parameters.overlaidSeparately.plots.length > 0 : false
  const plot_url = isItMoreThanOnePlot ? get_plot_with_overlay_new_api(parameters) : get_plot_url(parameters as any)
  const [imageError, setImageError] = React.useState(false)

  return (
    <div style={{ width: parameters.width, height: parameters.height, background: 'black' }}>
      <ImageFallback
        key={`${root_url}${plot_url}`}
        retryTimes={3}
        setImageError={setImageError}
        style={{ display: 'display', width: parameters.width, height: parameters.height }}
        src={`${root_url}${plot_url}`}
        width={'auto'}
        height={'auto'}
      />
    </div>
  )
}