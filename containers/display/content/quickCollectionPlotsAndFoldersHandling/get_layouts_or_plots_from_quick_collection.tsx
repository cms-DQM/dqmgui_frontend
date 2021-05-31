import axios from 'axios';
import { pathOr } from 'ramda';

import { get_source_and_destination_of_layout } from '../../../../api/newApi';
import { root_url } from '../../../../config/config';

export const get_layouts_or_plots_from_quick_collection = (quick_collection_name) => {
  const api = get_source_and_destination_of_layout(quick_collection_name)
  return axios.get(`${root_url}${api}`)
    .then(response => {
      const { data: { data } } = response
      if (data.length > 0) {
        const plots = data.map(item => {
          const parts = pathOr('', ['source'], item).split('/')
          const plot_name = parts.pop()
          const plot_path = parts.join('/')
          const layout = quick_collection_name
          return { name: plot_name, path: plot_path, layout, quickCollection: true }
        })
        return plots
      }
      else {
        return []
      }
    })
    .catch(error => console.error(error))

}