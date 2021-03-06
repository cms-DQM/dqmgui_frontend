import { useRequest } from './useRequest';
import _ from 'lodash';

import { choose_api_for_run_search } from '../containers/display/utils';
import { get_runs_by_search } from './selector';
// import { useUpdateLiveMode } from './useUpdateInLiveMode';

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
  // const { not_older_than } = useUpdateLiveMode()
  const current_api = choose_api_for_run_search({
    dataset_name: dataset_name_value,
    run_number: run_number_value,
    // notOlderThan: not_older_than,
    lumi: '',
  });

  const { data, isLoading, errors } = useRequest(
    current_api,
    {},
    [run_number, dataset_name, 
      // not_older_than
    ],
    searching
  );

  const data_get_by_api = get_runs_by_search(data);

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
