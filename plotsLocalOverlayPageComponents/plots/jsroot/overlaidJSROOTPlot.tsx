import cleanDeep from 'clean-deep';
import * as React from 'react'
import { sizes } from '../../../components/constants';
import { get_jroot_plot } from '../../../api/oldApi';

import { ImageDiv } from '../../../containers/display/styledComponents'
import { useRequest } from '../../../hooks/useRequestForPlotsLocalOverlay';
import { ParametersForApi } from '../../interfaces'
import { root_url } from '../../../config/config';

interface JSROOTplotProps {
  params_for_api: ParametersForApi;
  id: string
};
const drawJSROOT = async (
  histogramParam: string,
  id: string,
  overlaidJSROOTPlot: any
) => {
  if (!!document.getElementById(id)) {
      const cleanUpPreviousJSROOTPlot = () => {
        //@ts-ignore
        if (JSROOT.cleanup) {
          //@ts-ignore
          JSROOT.cleanup(id);
        }
      }
      //after cleanup we can draw a new plot
      await cleanUpPreviousJSROOTPlot
      //@ts-ignore
      JSROOT.draw(`${histogramParam}${id}`, JSROOT.parse(JSON.stringify(overlaidJSROOTPlot)), `${histogramParam}`);
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
    const { data } = useRequest(get_jroot_plot(parameter), {}, [parameter.plot_name, root_url]);
    return data;
  })

  const histogramParam = params_for_api.normalize ? 'hist' : 'nostack';
  if (cleanDeep(parametersForCreateTHStack).length === params_for_api.overlaidSeparately.plots.length + 1) {
    //@ts-ignore
    overlaidJSROOTPlot = (JSROOT.CreateTHStack(...cleanDeep(parametersForCreateTHStack)))
  }

  React.useEffect(() => {
      drawJSROOT(histogramParam, id, overlaidJSROOTPlot);
  }, [
    id,
    params_for_api.jsroot,
    parametersForCreateTHStack,
    params_for_api.dataset_name,
    params_for_api.run_number,
    params_for_api.normalize,
  ]);

  return (
    <div>
      <ImageDiv
        // style={{ display: params_for_api.normalize ? '' : 'none' }}
        id={`${histogramParam}${id}`}
        width={params_for_api.width}
        height={params_for_api.height}
      />
      <ImageDiv
        // style={{ display: params_for_api.normalize ? 'none' : '' }}
        id={`${histogramParam}${id}`}
        width={params_for_api.width}
        height={params_for_api.height}
      />
    </div>)
}