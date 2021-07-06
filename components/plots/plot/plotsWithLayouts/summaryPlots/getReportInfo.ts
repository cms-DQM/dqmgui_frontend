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
  plots_names: string[];
}

export const getReportInfo = async ({ run_number, dataset_name, lumi, subsystem, not_older_than, plots_names }: getSummaryPlotHeaderProps) => {
  const params_for_api = {
    run_number: run_number,
    dataset_name: dataset_name,
    lumi: lumi,
    folders_path: `${subsystem}/EventInfo`,
    notOlderThan: not_older_than
  }

  const requests = plots_names.map((plot_name) => axios.get(`${root_url}${get_jroot_plot(assoc('plot_name', plot_name, params_for_api))}`).catch(() => null))
  //need to return something if request is crashing, otherwise, axios.all returns nothing
  const promises =
    axios.all(requests)
      .catch(() => { console.error('Request failed') })
      .then(axios.spread((...responses) => {
        return responses.map((response, index) => {
          const config = pathOr('', ['config'], response)
          const url = pathOr('', ['url'], config)
          const parts_of_request_url = url.split('?')
          const data_name = parts_of_request_url[0].split('/').pop() // the last argument before ? is plot name (which refrects data name)
          const value = pathOr('-', ['data', 'fString'], response)
          let obj = {}
          if (data_name) {
            obj[data_name] = value
          } else {
            obj['noData'] = '-'
          }
          return obj
        })
      }))
  const array = await promises
  const obj_ = {}
  array.forEach((item) => {
    const key = Object.keys(item)[0]
    const value = Object.values(item)[0]
    obj_[key] = value
  })

  return obj_
}