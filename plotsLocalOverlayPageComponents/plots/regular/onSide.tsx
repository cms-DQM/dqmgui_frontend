
import { Tooltip } from 'antd';
import * as React from 'react'

import { ImageFallback } from '../../../components/plots/imageFallback';
import { root_url } from '../../../config/config';
import { get_plot_url } from '../../../api/oldApi';
import { PlotProps } from '../../../containers/display/interfaces';
import { theme } from '../../../styles/theme';
import { ParametersForApi } from '../../interfaces';

interface OnSideProps {
  parameters: ParametersForApi;
}

interface OneOnSidePlotProps extends OnSideProps {
  plot: PlotProps;
}

const OneOnSidePlot = ({ parameters, plot }: OneOnSidePlotProps) => {
  const [imageError, setImageError] = React.useState(false)
  const [count, setCount] = React.useState(0)
  const [tooLong, setTooLong] = React.useState(false)
  const plotNameRef = React.useRef<any>(null)
  const plotWrapperRef = React.useRef<any>(null)

  const { run_number, dataset_name, height, width, stats, error } = parameters
  const { folders_path, plot_name } = plot
  const params = { run_number, dataset_name, folders_path, plot_name, height, width, error, stats }
  const plot_url = get_plot_url(params as any)

  React.useEffect(() => {
    setCount(count+1) //2 because on mount, and when size changes. Without count, we're getting infinity loop
    if (plotNameRef.current && count < 3) {
      setTooLong(plotNameRef.current.clientHeight > 24)
    }
  }, [plotNameRef.current && plotNameRef.current.clientHeight ])

  return (
    <Tooltip  title={tooLong ? plot_name : ''}>
      <div  style={{ width: parameters.width + 8, height: parameters.height + 24, margin: 8, display: 'flex', flexDirection: 'column', background: 'white' }}>
        <div ref={plotNameRef} style={{ background: theme.colors.primary.light, paddingBottom: 8, display: 'flex' }}>{tooLong ? plot_name?.substring(0, 30) + '...' : plot_name}</div>
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

export const OnSide = ({ parameters }: OnSideProps) => {
  const [imageError, setImageError] = React.useState(false)
  const [count, setCount] = React.useState(0)

  const [tooLong, setTooLong] = React.useState(false)
  const copy = { ...parameters }
  const plots = copy.overlaidSeparately ? copy.overlaidSeparately.plots : []
  const { run_number, dataset_name, folders_path, plot_name, height, width, stats, error } = copy
  const params = ({ run_number, dataset_name, folders_path, plot_name, height, width, stats, error } as any)
  const plot_url = get_plot_url(params as any)
  const url = `${root_url}${plot_url}`
  const plotNameRef = React.useRef<any>(null)


  React.useEffect(() => {
    setCount(count+1) //2 because on mount, and when size changes. Without count, we're getting infinity loop
    if (plotNameRef.current && count < 3) {
      setTooLong(plotNameRef.current.clientHeight > 24)
    }
  }, [plotNameRef.current && plotNameRef.current.clientHeight ])


  return (<div style={{ display: 'flex', flexWrap: 'wrap', overflow: 'scroll', height: '100%' }}>
    <>
      <Tooltip title={tooLong ? plot_name : ''}>
        <div style={{ width: parameters.width + 8, height: parameters.height + 24, margin: 8, display: 'flex', flexDirection: 'column', background: 'white' }}>
          <div ref={plotNameRef} style={{  background: theme.colors.primary.light, paddingBottom: 8, display: 'flex' }}>{tooLong ? plot_name?.substring(0, 30) + '...' : plot_name}</div>
          <div>
            <ImageFallback
              key={url}
              retryTimes={3}
              setImageError={setImageError}
              style={{ display: 'display', width: parameters.width, height: parameters.height }}
              src={url}
              width={'auto'}
              height={'auto'}
            />
          </div>
        </div>
      </Tooltip>
      {plots.map((plot: PlotProps) => {
        return (<OneOnSidePlot
          plot={plot}
          parameters={copy}
        />
        )
      })}
    </>
  </div>
  )
}