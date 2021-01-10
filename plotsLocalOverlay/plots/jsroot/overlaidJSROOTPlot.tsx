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
  //@ts-ignore
  await JSROOT.cleanup(`${histogramParam}${id}`);
  //@ts-ignore
  JSROOT.draw(
    `${histogramParam}${id}`,
    //@ts-ignore
    JSROOT.parse(JSON.stringify(overlaidJSROOTPlot)),
    `${histogramParam}`
  );
};

export const OverlaidJSROOTPlot = ({ params_for_api, id }: JSROOTplotProps) => {
  params_for_api.height = sizes[params_for_api.size].size.h
  params_for_api.width = sizes[params_for_api.size].size.w

  const { data } = useRequest(get_jroot_plot(params_for_api as any), {}, [
    params_for_api.plot_name,
  ]);

  const parametersForJSROOTOverlaidPlots = params_for_api.overlaidSeparately ? params_for_api.overlaidSeparately?.plots.map((plot) => {
    const { run_number, dataset_name, folders_path } = params_for_api
    const { plot_name } = plot
    const parameters = { run_number, dataset_name, folders_path, plot_name }
    const { data } = useRequest(get_jroot_plot(parameters), {}, [params_for_api.plot_name,
    ]);
    return data;
  }) : []

  parametersForJSROOTOverlaidPlots.push(data)
  let overlaidJSROOTPlot: any = {};

  if (parametersForJSROOTOverlaidPlots.length === 0) {
    null;
  } else if (parametersForJSROOTOverlaidPlots.length > 0) {
    //@ts-ignore
    overlaidJSROOTPlot = JSROOT.CreateTHStack(parametersForJSROOTOverlaidPlots[0]);
  }

  const histogramParam = params_for_api.overlaidSeparately?.normalize ? 'hist' : 'nostack';

  React.useEffect(() => {
    if (
      cleanDeep(overlaidJSROOTPlot.fHists.arr).length ===
      overlaidJSROOTPlot.fHists.arr.length
    ) {
      drawJSROOT(histogramParam, id, overlaidJSROOTPlot);
    }
  }, [
    data,
    params_for_api.lumi,
    params_for_api.overlaidSeparately?.plots.length,
    params_for_api.dataset_name,
    params_for_api.run_number,
    params_for_api.overlaidSeparately?.normalize,
    overlaidJSROOTPlot.fHists.arr
  ]);

  return (
    <div>
      <ImageDiv
        id={`${id}`}
        width={params_for_api.width}
        height={params_for_api.height}
      />
      <ImageDiv
        style={{ display: params_for_api.overlaidSeparately?.normalize ? '' : 'none' }}
        id={`hist${id}`}
        width={params_for_api.width}
        height={params_for_api.height}
      />
      <ImageDiv
        style={{ display: params_for_api.overlaidSeparately?.normalize ? 'none' : '' }}
        id={`nostack${id}`}
        width={params_for_api.width}
        height={params_for_api.height}
      />
    </div>)
}