import cleanDeep from 'clean-deep';
import * as React from 'react'
import { sizes } from '../../../components/constants';
import { get_jroot_plot } from '../../../config/config';

import { ImageDiv } from '../../../containers/display/styledComponents'
import { useRequest } from '../../../hooks/useRequest';
import { ParametersForApi } from '../../interfaces'

interface JSROOTplotProps {
  params_for_api: ParametersForApi;
  id: string
};
const drawJSROOT = async (
  histogramParam: string,
  id: string,
  overlaidJSROOTPlot: any
) => {
  try {
    //@ts-ignore
    await JSROOT.cleanup(`${histogramParam}${id}`);
    //@ts-ignore
    JSROOT.draw(`${histogramParam}${id}`, JSROOT.parse(JSON.stringify(overlaidJSROOTPlot)), `${histogramParam}`);
  }
  catch (e) {
    console.log(e.toString())
  }
};

export const OverlaidJSROOTPlot = ({ params_for_api, id }: JSROOTplotProps) => {
  let overlaidJSROOTPlot: any = {}
  //@ts-ignore
  params_for_api.height = sizes[params_for_api.size].size.h
  //@ts-ignore
  params_for_api.width = sizes[params_for_api.size].size.w

  const parametersForJSROOTOverlaidPlots: any = []

  params_for_api.overlaidSeparately && params_for_api.overlaidSeparately?.plots.forEach(async (plot) => {
    const { run_number, dataset_name } = params_for_api
    const { folders_path, plot_name } = plot
    const parameters = { run_number, dataset_name, folders_path, plot_name }
    parametersForJSROOTOverlaidPlots.push(parameters)
  })

  const { run_number, dataset_name, folders_path, plot_name } = params_for_api
  const initialPlotParameters = { run_number, dataset_name, folders_path, plot_name }
  parametersForJSROOTOverlaidPlots.push(initialPlotParameters as any)

  const parametersForCreateTHStack = parametersForJSROOTOverlaidPlots.map((parameter: any) => {
    const { data } = useRequest(get_jroot_plot(parameter), {}, [parameter.plot_name]);
    return data;
  })

  const histogramParam = params_for_api.normalize ? 'hist' : 'nostack';
  if (cleanDeep(parametersForCreateTHStack).length === params_for_api.overlaidSeparately.plots.length + 1) {
    //@ts-ignore
    overlaidJSROOTPlot = (JSROOT.CreateTHStack(...cleanDeep(parametersForCreateTHStack)))
  }

  React.useEffect(() => {
    if (!!document.getElementById(`${histogramParam}${id}`) && Object.keys(overlaidJSROOTPlot).length > 0) {
      drawJSROOT(histogramParam, id, overlaidJSROOTPlot);
    }
  }, [
    id,
    parametersForCreateTHStack,
    params_for_api.dataset_name,
    params_for_api.run_number,
    params_for_api.normalize,
  ]);

  return (
    <div>
      <ImageDiv
        style={{ display: params_for_api.normalize ? '' : 'none' }}
        id={`hist${id}`}
        width={params_for_api.width}
        height={params_for_api.height}
      />
      <ImageDiv
        style={{ display: params_for_api.normalize ? 'none' : '' }}
        id={`nostack${id}`}
        width={params_for_api.width}
        height={params_for_api.height}
      />
    </div>)
}