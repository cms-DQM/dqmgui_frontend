import { Tooltip } from 'antd';
import * as React from 'react'
import { get_jroot_plot } from '../../../api/oldApi';

import { ImageDiv } from '../../../containers/display/styledComponents'
import { useRequest } from '../../../hooks/useRequest';
import { theme } from '../../../styles/theme';
import { ParametersForApi } from '../../interfaces'

interface JSROOTplotProps {
  params_for_api: ParametersForApi;
  id: string
};
const drawJSROOT = async (id: string, data: any) => {
  //in order to get new JSROOT plot, first of all we need to clean div with old plot
  //@ts-ignore
  if (!!document.getElementById(id)) {
    //on mount we're getting error, because there is nothing to clean yet.
    try {
      //@ts-ignore
      await JSROOT.cleanup(id);
      //@ts-ignore
      JSROOT.draw(id, JSROOT.parse(JSON.stringify(data)), 'hist');
      //after cleanup we can draw a new plot
    }
    catch {
      //on mount error
    }

  }
};

export const SingleJSROOTPlot = ({ params_for_api, id }: JSROOTplotProps) => {
  const imageRef = React.useRef<any>(null)
  const { data } = useRequest(get_jroot_plot(params_for_api as any), {}, [
    params_for_api.plot_name,
  ]);
  const [count, setCount] = React.useState(0)
  const [tooLong, setTooLong] = React.useState(false)
  const plotNameRef = React.useRef<any>(null)
  const plotWrapperRef = React.useRef<any>(null)
  React.useEffect(() => {
    //@ts-ignore
    if (imageRef.current) {
      //@ts-ignore
      drawJSROOT(`${id}`, data);
    }
  }, [data, id, imageRef.current]);

  React.useEffect(() => {
    setCount(count + 1) //2 because on mount, and when size changes. Without count, we're getting infinity loop
    if (plotNameRef.current && count < 3) {
      setTooLong(plotNameRef.current.clientHeight > 24)
    }
  }, [plotNameRef.current && plotNameRef.current.clientHeight])


  return (
    <Tooltip title={tooLong ? params_for_api.plot_name : ''}>
      <div style={{ width: params_for_api.width + 8, height: params_for_api.height + 24, margin: 8, display: 'flex', flexDirection: 'column', background: 'white' }}>
        <div ref={plotNameRef} style={{ background: theme.colors.primary.light, paddingBottom: 8, display: 'flex' }}>{tooLong ? params_for_api.plot_name?.substring(0, 30) + '...' : params_for_api.plot_name}</div>
        <div>      <ImageDiv
          ref={imageRef}
          id={id}
          width={params_for_api.width}
          height={params_for_api.height}
        />
        </div>
      </div>
    </Tooltip>
  )
}