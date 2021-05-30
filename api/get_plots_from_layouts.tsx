import axios from 'axios'
import { unnest } from 'ramda'

import { root_url } from '../config/config'
import { construct_layout_plot_objects } from '../utils/constructors/contract_layout_plot_object'
import { get_source_and_destination_of_layout } from './newApi'

export const get_request = (url) => {
  return axios.get(`${root_url}${url}`)
}

export const get_plot_from_layouts = (layouts_of_quick_collections) => (callback) => {
  const urls_and_names = layouts_of_quick_collections.map((layout_name) => {
    return {
      url: get_source_and_destination_of_layout(layout_name),
      name: layout_name
    }
  })

  const all_quick_collections = urls_and_names.map(url => get_request(url.url))
  const promise = axios.all(all_quick_collections)
  callback([], true)
  promise.then(response => {
    const formatted_data = construct_layout_plot_objects(response)
    const plots = (unnest(formatted_data))
    return callback(plots, false)
  })
    .catch(Error => {
      callback([], false)
      throw Error
    }
    )
}
