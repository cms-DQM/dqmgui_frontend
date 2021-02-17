import * as React from 'react'

import { ParametersForApi } from '../interfaces';
import { JSROOTPlot } from './jsroot'
import { Plot } from './regular';

interface PlotsProps {
  parameters: ParametersForApi
  plotsAreaWidth: number
}

export const Plots = ({ parameters, plotsAreaWidth }: PlotsProps) => {
  if (parameters.size === 'fill') {
    const ratio = parameters.width / parameters.height
    const newHeight =  Math.floor(plotsAreaWidth / ratio)
    const newWidth =plotsAreaWidth
    parameters.height = newHeight
    parameters.width = newWidth
  }
  return (
    parameters.jsroot ?
      <JSROOTPlot params_for_api={parameters} /> :
      <Plot parameters={parameters} />
  )
}