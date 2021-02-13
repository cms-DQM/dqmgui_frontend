import * as React from 'react'
import { ParametersForApi } from '../../interfaces'
import { OnePlot } from './onePlot'
import { OnSide } from './onSide'

interface PlotProps {
  parameters: ParametersForApi
}

export const Plot = ({ parameters }: PlotProps) => {
  const isItMoreThanOnePlot = parameters.overlaidSeparately ? parameters.overlaidSeparately.plots.length > 0 : false
  const isItOnSide = isItMoreThanOnePlot ? parameters.overlaidSeparately.ref === 'onSide' : false

  if (isItOnSide) {
    return <OnSide parameters={parameters} />
  } else {
    return <OnePlot parameters={parameters} />
  }
}