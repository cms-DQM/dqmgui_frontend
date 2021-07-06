import * as React from 'react'
import axios from 'axios'
import { unnest } from 'ramda';

import { SummaryPlot } from './summaryPlot'
import { isItLiveMode } from '../../../../../utils';
import { PlotsGroupedByLayoutsInterface, QueryProps } from '../../../../../containers/display/interfaces';
import { ReportsTable } from './reportsTable'
import { getReportsData } from './getReportsData';

interface PlotsWithLayoutPorps {
  plots_grouped_by_layouts: PlotsGroupedByLayoutsInterface;
  selected_plots: any;
  query: QueryProps;
}

export const SummaryPlots = ({ plots_grouped_by_layouts, selected_plots, query }: PlotsWithLayoutPorps) => {
  // I need to get all plots paths
  // the firts dir is indication of subsystem
  // I need to go to that subsystem folder, /info/reportSummary is that procetnage
  // so subsystems has reportSummaryContent, from which we can create report (on click will be shown?)
  const [report_info, set_report_info] = React.useState([])
  const [open, toggle_modal] = React.useState(false)
  const [modal_id, set_modal_id] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setLoading(true)
      getReportsData({ subsystem: modal_id, run_number: query.run_number, lumi: query.lumi, dataset_name: query.dataset_name })
        .then(response => {
          setLoading(false)
          set_report_info(response)
        })
        .catch(error => {
          setLoading(false)
          console.error(error)
        })
    }
  }, [open])

  const plots = unnest(Object.values(plots_grouped_by_layouts))
  return <>
    <ReportsTable
      loading={loading}
      dataSource={report_info}
      open={open}
      modal_id={modal_id}
      toggleModal={toggle_modal}
    />
    {
      plots.map(plot => {
        const { path } = plot
        const parts = path.split('/')
        const subsystem = parts.shift()
        const live = isItLiveMode({ run_number: query.run_number, dataset_name: query.dataset_name })
        //reportds data bus and live and ne live moeplotu. tai siusim not older than tik su live
        //  
        // if(live){
        //   <>
        // }
        return <SummaryPlot
          plot={plot}
          set_report_info={set_report_info}
          toggle_modal={toggle_modal}
          open={open}
          set_modal_id={set_modal_id}
          modal_id={modal_id}
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
