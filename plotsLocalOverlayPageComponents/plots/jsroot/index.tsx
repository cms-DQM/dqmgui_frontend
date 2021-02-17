import * as React from 'react'
import { makeid } from '../../../components/utils'

import { ParametersForApi } from '../../interfaces'
import { OverlaidJSROOTPlot } from './overlaidJSROOTPlot'
import { SingleJSROOTPlot } from './singleJSROOTPlot'

interface JSROOTplotProps {
  params_for_api: ParametersForApi;
};

export const JSROOTPlot = ({ params_for_api }: JSROOTplotProps) => {
  const isItMoreThanOnePlot =   params_for_api.overlaidSeparately ? params_for_api.overlaidSeparately.plots.length > 0 : false
  const id = makeid();
  if (isItMoreThanOnePlot) {
    return <OverlaidJSROOTPlot id={id} params_for_api={params_for_api} />
  } else {
    return <SingleJSROOTPlot id={id} params_for_api={params_for_api} />
  }
}