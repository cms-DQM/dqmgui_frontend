import * as React from 'react';
import { QueryProperties } from '../../../../plotsLocalOverlayPageComponents/interfaces';
import { Plot } from './plot';

import { getSummaryPlotHeader } from './api/getSummaryPlotHeader';
import { store } from '../../../../contexts/leftSideContext';


interface SummaryPlotProps {
  plot: any
  selected_plots: any
  query: QueryProperties;
  subsystem: string;
  lumi: string;
  run_number: string;
  dataset_name: string;
}

export const SummaryPlot = ({ subsystem, dataset_name, run_number, lumi, plot, query, selected_plots }: SummaryPlotProps) => {
  const [header, setHeader] = React.useState('')
  const imageRef = React.useRef(null);

  React.useEffect(() => {
    getSummaryPlotHeader({ run_number, dataset_name, lumi, subsystem })
      .then(response => setHeader(response.toString()))
  }, [subsystem])

  const { size } = React.useContext(store)
  return (
    <div>
      <div> {header} </div>
      <Plot
        query={query}
        plot={plot}
        onePlotHeight={size.h}
        onePlotWidth={size.w}
        selected_plots={selected_plots}
        imageRef={imageRef} />
    </div>

  )
}