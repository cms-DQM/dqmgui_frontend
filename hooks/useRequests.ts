import axios from 'axios'
import { useEffect, useState } from 'react'
import { pathOr, assoc } from 'ramda'

import { get_source_and_destination_of_layout } from '../api/newApi'
import { root_url } from '../config/config'

export const request = (url, method) => {
  return axios[method](`${root_url}${url}`)
}


export const useRequests = (urls: string[], watchers: any[], method: string = 'get') => {
  // const [datas_and_layout_name, set_datas_and_layout_name] = useState([])
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [error, setError] = useState<string>()

  useEffect(() => {
    const all_quick_collections = urls.map(url => request(url, method))
    // setIsLoading(true)
     axios.all(all_quick_collections)
      .then(axios.spread((...responses) => {
        // setIsLoading(false)
        const data = responses.map((response) => {
          const data = pathOr([], ['data', 'data'], response)
          const url = pathOr([], ['data', 'request', 'responseURL'], response)
          const urls_parts = url.split('?')
          const layout_name = urls_parts.pop()
          return { data, layout_name }
        })
        // set_datas_and_layout_name(data)
      })
      )
      .catch((error) => {
        // setIsLoading(false)
        // setError(error.toString())
      })
  },[watchers] )
  // return { datas_and_layout_name, isLoading, error }
}