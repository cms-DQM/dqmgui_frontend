import axios from 'axios';
import { pathOr, assoc } from 'ramda';

import { get_jroot_plot } from '../../../../../api/oldApi';
import { root_url } from '../../../../../config/config';

export interface getSummaryPlotHeaderProps {
  run_number: string;
  dataset_name: string;
  lumi: string;
  subsystem: string;
  not_older_than?: number
}

export const getSummaryPlotHeader = ({ run_number, dataset_name, lumi, subsystem, not_older_than }: getSummaryPlotHeaderProps) => {
  const params_for_api = {
    run_number: run_number,
    dataset_name: dataset_name,
    lumi: lumi,
    folders_path: `${subsystem}/EventInfo`,
    notOlderThan: not_older_than
  }


  const reportSummaryPromise = axios.get(`${root_url}${get_jroot_plot(assoc('plot_name', 'reportSummary', params_for_api))}`).catch(() => null)
  //need to return something if request is crashing, otherwise, axios.all returns nothing
  const eventTimeStampPromise = axios.get(`${root_url}${get_jroot_plot(assoc('plot_name', 'processTimeStamp', params_for_api))}`).catch(() => null)

  const promises =
    axios.all([reportSummaryPromise, eventTimeStampPromise])
      .catch(() => { console.error('Request failed') })
      .then(axios.spread((...resposes) => {
        return resposes.map((response, index) => {
          const value = pathOr('-', ['data', 'fString'], response)
          if (index === 0) {
            const parsed = parseFloat(value)
            console.log(parsed === NaN)
            const reportValue = !isNaN(parsed) ? (Number(parsed) * 100).toFixed(1) : '-'
            return `${subsystem}  ${reportValue}%`
          } else if (index === 1) {
            const milisec = new Date(parseInt(value) * 1000);
            const time = typeof (milisec) === 'number' ? milisec.toUTCString() : '-';
            return time
          }
          return value
        })
      }))

      return promises
}