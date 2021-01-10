import * as React from 'react'
import { get_jroot_plot } from '../../../config/config';

import { ImageDiv } from '../../../containers/display/styledComponents'
import { useRequest } from '../../../hooks/useRequest';
import { ParametersForApi } from '../../interfaces'

interface JSROOTplotProps {
  params_for_api: ParametersForApi;
  id: string
};
const drawJSROOT = async (id: string, data: any) => {
  //in order to get new JSROOT plot, first of all we need to clean div with old plot
  if (!!document.getElementById(id)) {
    //@ts-ignore
    await JSROOT.cleanup(id);
    //after cleanup we can draw a new plot
    //@ts-ignore
    JSROOT.draw(id, JSROOT.parse(JSON.stringify(data)), 'hist');
  }
};

export const SingleJSROOTPlot = ({ params_for_api, id }: JSROOTplotProps) => {
  const { data } = useRequest(get_jroot_plot(params_for_api as any), {}, [
    params_for_api.plot_name,
  ]);

  React.useEffect(() => {
    if (!!document.getElementById(`${id}`)) {
      //@ts-ignore
      drawJSROOT(`${id}`, data);
    }
  }, [data, params_for_api]);

  return (
    <div>
      <ImageDiv
        id={`${id}`}
        width={params_for_api.width}
        height={params_for_api.height}
      />
    </div>)
}