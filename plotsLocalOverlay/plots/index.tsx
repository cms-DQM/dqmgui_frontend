import * as React from 'react'

import { ParametersForApi } from '../interfaces';
import { JSROOTPlot } from './jsroot'
import { Plot } from './regular';

interface PlotsProps {
  parameters: ParametersForApi
}

export const Plots = ({ parameters }: PlotsProps) => {
  return (
    parameters.jsroot ?
      <JSROOTPlot params_for_api={parameters} /> :
        <Plot parameters={parameters} />
  )
}