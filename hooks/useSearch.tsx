import { useContext } from 'react';

import { useRequest } from './useRequest';
import _ from 'lodash';
import { store } from '../contexts/leftSideContext';
import { get_runs_by_search } from './selector';
import { choose_api_for_run_search } from '../config/apis/utils/choose_api';

interface ReturnSearch {
  results_grouped: any[];
  searching: boolean;
  isLoading: boolean;
  errors: any[];
}

export const useSearch = (
  run_number?: string,
  dataset_name?: string
): ReturnSearch => {
  const searching = !!(run_number || dataset_name);
  const run_number_value = run_number ? run_number : '';
  const dataset_name_value = dataset_name ? dataset_name : '';

  const { updated_by_not_older_than, configuration } = useContext(store);
  const { functions_config } = configuration

  const current_api = choose_api_for_run_search({
    dataset_name: dataset_name_value,
    run_number: run_number_value,
    notOlderThan: updated_by_not_older_than,
    lumi: '',
    functions_config: functions_config
  });

  const { data, isLoading, errors } = useRequest(
    current_api,
    {},
    [run_number, dataset_name, updated_by_not_older_than],
    searching
  );
  const data_get_by_api = get_runs_by_search(data, functions_config?.new_back_end);

  if (!searching || data === null || data_get_by_api.lenght === 0) {
    return {
      results_grouped: [],
      searching,
      isLoading,
      errors,
    };
  }

  const results_grouped = _.chain(data_get_by_api)
    .sortBy('dataset')
    .groupBy('dataset')
    .map((value, key) => {
      const runs = value.map((set: any) => set.run);
      runs.sort((a, b) => a - b);
      return { dataset: key, runs: runs };
    })
    .value();

  return { results_grouped, searching, isLoading, errors };
};
