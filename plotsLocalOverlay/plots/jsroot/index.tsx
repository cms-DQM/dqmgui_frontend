import * as React from 'react'

import { ParametersForApi } from '../../interfaces'
import { OverlaidJSROOTPlot } from './overlaidJSROOTPlot'
import { SingleJSROOTPlot } from './singleJSROOTPlot'

interface JSROOTplotProps {
  params_for_api: ParametersForApi;
  id: string
};

export const JSROOTPlot = ({ params_for_api, id }: JSROOTplotProps) => {
  const isItMoreThanOnePlot =  params_for_api.overlaidSeparately ? params_for_api.overlaidSeparately.hasOwnProperty('plots') : false

  if (isItMoreThanOnePlot) {
    return <OverlaidJSROOTPlot id={id} params_for_api={params_for_api} />
  } else {
    return <SingleJSROOTPlot id={id} params_for_api={params_for_api} />
  }
}