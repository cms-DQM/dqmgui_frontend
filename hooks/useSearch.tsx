import { useRequest } from './useRequest';
import _ from 'lodash';

interface ReturnSearch {
  results: any[];
  results_grouped: any[];
  searching: boolean;
  isLoading: boolean;
  errors: any[];
}

export const useSearch = (
  run_number?: number,
  dataset_name?: string
): ReturnSearch => {
  const searching = !!(run_number || dataset_name);
  const run_number_value = run_number ? run_number : '';

  const { data, isLoading, errors } = useRequest(
    `/data/json/samples?match=${dataset_name}&run=${run_number_value}`,
    {},
    [run_number, dataset_name],
    searching
  );

  if (!searching || data === null || (data &&  data.samples && data.samples.length === 0)) {
    return {
      results: [],
      results_grouped: [],
      searching,
      isLoading,
      errors: errors,
    };
  }
  const { samples: results }: { samples: any[] } = data;
  const parsed_results = results.reduce(
    (prev, { items }) => [...prev, ...items],
    []
  );

  const results_grouped = _.chain(parsed_results)
    .sortBy('dataset')
    .groupBy('dataset')
    .map((value, key) => ({ dataset: key, value }))
    .value();

  return { results, results_grouped, searching, isLoading, errors };
};
