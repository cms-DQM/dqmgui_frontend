import { Tooltip } from 'antd';
import * as React from 'react'

import { ImageFallback } from '../../../components/plots/imageFallback';
import { root_url } from '../../../config/config';
import { get_plots_with_overlay_new_api } from '../../../api/newApi'
import { theme } from '../../../styles/theme'
import { ParametersForApi } from '../../interfaces';
import { chooseApiForGettingPlotUrl } from '../../../api/utils';

interface PlotProps {
  parameters: ParametersForApi
}

export const OnePlot = ({ parameters }: PlotProps) => {
  const isItMoreThanOnePlot = parameters.overlaidSeparately ? parameters.overlaidSeparately.plots.length > 0 : false
  const plot_url = isItMoreThanOnePlot ? get_plots_with_overlay_new_api(parameters) : chooseApiForGettingPlotUrl(parameters as any)
  const [imageError, setImageError] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const [tooLong, setTooLong] = React.useState(false)
  const plotNameRef = React.useRef<any>(null)
  const plotWrapperRef = React.useRef<any>(null)

  React.useEffect(() => {
    setCount(count + 1) //2 because on mount, and when size changes. Without count, we're getting infinity loop
    if (plotNameRef.current && count < 3) {
      setTooLong(plotNameRef.current.clientHeight > 24)
    }
  }, [plotNameRef.current && plotNameRef.current.clientHeight])
  
  const parts = root_url.split('/')
  const index = parts.indexOf('plotsLocalOverlay')
  parts.splice(index, 1)
  const root = parts.join('/')
  const isProd = process.env.NODE_ENV === 'production'

  return (
    <Tooltip title={tooLong ? parameters.plot_name : ''}>
      <div style={{ width: parameters.width + 8, height: parameters.height + 24, margin: 8, display: 'flex', flexDirection: 'column', background: 'white' }}>
        <div ref={plotNameRef} style={{ background: theme.colors.primary.light, paddingBottom: 8, display: 'flex' }}>{tooLong ? parameters.plot_name?.substring(0, 30) + '...' : parameters.plot_name}</div>
        <div>
          <ImageFallback
            ref={plotWrapperRef}
            key={`${root}${plot_url}`}
            onLoad={() => { }}
            retryTimes={3}
            setImageError={setImageError}
            style={{ display: 'display', width: parameters.width, height: parameters.height }}
            src={`${root}${isProd ? '' : '/'}${plot_url}`}
            width={'auto'}
            height={'auto'}
          />
        </div>
      </div>
    </Tooltip>
  )
}