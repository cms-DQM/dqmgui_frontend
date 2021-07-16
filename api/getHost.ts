import axios from 'axios'

import { root_url } from '../config/config'
import { get_host } from './newApi'

export const get_host_ = (setHost) => {
    return axios.get(`${root_url}${get_host()}`).then(reponse => {
        const { host } = reponse.data
        setHost(host)
    })
        .catch(e => console.error(e))
}