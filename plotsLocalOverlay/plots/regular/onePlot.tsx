import { Tooltip } from 'antd';
import * as React from 'react'

import { ImageFallback } from '../../../components/plots/imageFallback';
import { get_plot_url, get_plot_with_overlay_new_api, root_url } from '../../../config/config';
import { theme } from '../../../styles/theme';
import { ParametersForApi } from '../../interfaces';

interface PlotProps {
  parameters: ParametersForApi
}

export const OnePlot = ({ parameters }: PlotProps) => {
  const isItMoreThanOnePlot = parameters.overlaidSeparately ? parameters.overlaidSeparately.plots.length > 0 : false
  const plot_url = isItMoreThanOnePlot ? get_plot_with_overlay_new_api(parameters) : get_plot_url(parameters as any)
  const [imageError, setImageError] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const [tooLong, setTooLong] = React.useState(false)
  const plotNameRef = React.useRef<any>(null)
  const plotWrapperRef = React.useRef<any>(null)

  React.useEffect(() => {
    setCount(count + 1) //2 because on mount, and when size changes. Without count, we're getting infinity loop
    if (plotNameRef.current && count < 3) {
      console.log(plotNameRef.current.clientHeight > 24)
      setTooLong(plotNameRef.current.clientHeight > 24)
    }
  }, [plotNameRef.current && plotNameRef.current.clientHeight])

  return (
    <Tooltip title={tooLong ? parameters.plot_name : ''}>
      <div style={{ width: parameters.width + 8, height: parameters.height + 24, margin: 8, display: 'flex', flexDirection: 'column', background: 'white' }}>
        <div ref={plotNameRef} style={{ background: theme.colors.primary.light, paddingBottom: 8, display: 'flex' }}>{tooLong ? parameters.plot_name?.substring(0, 30) + '...' : parameters.plot_name}</div>
        <div>
          <ImageFallback
            ref={plotWrapperRef}
            key={`${root_url}${plot_url}`}
            retryTimes={3}
            setImageError={setImageError}
            style={{ display: 'display', width: parameters.width, height: parameters.height }}
            src={`${root_url}${plot_url}`}
            width={'auto'}
            height={'auto'}
          />
        </div>
      </div>
    </Tooltip>
  )
}