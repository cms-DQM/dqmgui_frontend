import * as React from 'react';

import { store } from '../../../../contexts/updateContext';
import { useBlink } from '../../../../hooks/useBlink';
import { getSummaryPlotHeader } from './api/getSummaryPlotHeader';


interface SummaryPlotProps {
  subsystem: string;
  run_number: string;
  dataset_name: string;
  lumi: string;
}

export const SummaryPlot = ({ subsystem, dataset_name, run_number, lumi }: SummaryPlotProps) => {
  const { not_older_than, addLoader } = React.useContext(store)
  const { blink } = useBlink(not_older_than)

  const header =  async () => await  getSummaryPlotHeader({ run_number, dataset_name, lumi, subsystem, not_older_than })
  return (
    <div>
     {''}
    </div>

  )
}