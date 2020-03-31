import { useState, useEffect } from 'react';
import { useRequest } from './useRequest';
import _ from 'lodash';
import { log } from 'util';

interface ReturnSearch {
  results: any[];
  results_grouped: any[];
  searching: boolean;
  isLoading: boolean;
}

export const useSearch = (
  run_number: string,
  dataset_name: string
): ReturnSearch => {
  const [touched, setTouched] = useState(false);
  const searching = !!(run_number || dataset_name) || touched;

  useEffect(() => {
    if (searching) {
      setTouched(true);
    }
  }, [searching]);

  const { data, isLoading } = useRequest(
    `data/json/samples?match=${dataset_name}&run=${run_number}`,
    {},
    [run_number, dataset_name],
    searching
  );

  if (!searching || data === null || (data && data.samples.length === 0)) {
    return { results: [], results_grouped: [], searching, isLoading };
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

  return { results, results_grouped, searching, isLoading };
};
