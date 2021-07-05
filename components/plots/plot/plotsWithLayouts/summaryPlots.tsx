import * as React from 'react'
import axios from 'axios'
import { unnest } from 'ramda';

import { PlotsGroupedByLayoutsInterface, QueryProps } from '../../../../containers/display/interfaces'
import { SummaryPlot } from './summaryPlot'
import { isItLiveMode } from '../../../../utils';

interface PlotsWithLayoutPorps {
  plots_grouped_by_layouts: PlotsGroupedByLayoutsInterface;
  selected_plots: any;
  query: QueryProps;
}

export const SummaryPlots = ({ plots_grouped_by_layouts, selected_plots, query }: PlotsWithLayoutPorps) => {
  const report_summary_path = 'EvenInfo/reportSummary'
  // I need to get all plots paths
  // the firts dir is indication of subsystem
  // I need to go to that subsystem folder, /info/reportSummary is that procetnage
  // so subsystems has reportSummaryContent, from which we can create report (on click will be shown?)
  const plots = unnest(Object.values(plots_grouped_by_layouts))
  return <>{
    plots.map(plot => {
      const { path } = plot
      const parts = path.split('/')
      const subsystem = parts.shift()
      const live = isItLiveMode({ run_number: query.run_number, dataset_name: query.dataset_name })
      // if(live){
      //   <>
      // }
      return <SummaryPlot
        plot={plot}
        selected_plots={selected_plots}
        query={query}
        key={subsystem}
        subsystem={subsystem}
        lumi={query.lumi}
        run_number={query.run_number}
        dataset_name={query.dataset_name}
      />
    })}</>
}
