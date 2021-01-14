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

  React.useEffect(() => {
    //@ts-ignore
    if (imageRef.current) {
      //@ts-ignore
      drawJSROOT(`${id}`, data);
    }
  }, [data, id, imageRef.current]);

  return (
    <div>
      <ImageDiv
        ref={imageRef}
        id={id}
        width={params_for_api.width}
        height={params_for_api.height}
      />
    </div>)
}