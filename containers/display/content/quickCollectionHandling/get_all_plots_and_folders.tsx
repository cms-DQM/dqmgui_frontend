import axios from 'axios'

import { choose_api } from '../../../display/utils'
import { root_url } from '../../../../config/config';
import { formParamters } from '../../../../utils/constructors/constructParameters';
import { extract_folders_and_plots } from '../../../../utils/extractors/extract_folders_and_plots';

export const get_all_plots_and_folders = (parameters) => {
  const formed_parameters = formParamters(parameters);
  const get_plots_and_folders_api = choose_api(formed_parameters);

  return axios.get(`${root_url}${get_plots_and_folders_api}`)
    .then(
      response => {
        const { data } = response
        const { folders, plots } = extract_folders_and_plots(data)
        return { folders, plots }
      }
    )
    .catch(error => console.error(error))
}