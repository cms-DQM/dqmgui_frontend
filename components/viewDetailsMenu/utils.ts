import cleanDeep from 'clean-deep';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import { TripleProps } from '../../containers/display/interfaces';
import { DatasetPartsProps } from '../browsing/datasetsBrowsing/datasetNameBuilder';
import { getDatasetNameSplitBySlashIntoObject } from '../browsing/utils';

export const filter_valid_runs = (triples: TripleProps[]) =>
  triples.filter((triple: TripleProps) => {
    if (triple.run_number && triple.checked) {
      return triple;
    }
  });

export const filter_plots = (triples: TripleProps[], id: any) => {
  return triples.filter((triple: TripleProps) => {
    if (triple.id !== id && triple.run_number) {
      return triple;
    }
  });
};

export const formTriples = (overlay_data: string | undefined) => {
  const data = overlay_data?.split('&');
  return data?.map((oneRun: string) => {
    const id = uuidv4();

    const splitedParams = oneRun ? cleanDeep(oneRun.split('/')) : undefined;
    const label = splitedParams ? splitedParams.pop() : '';
    const run_number = splitedParams ? splitedParams.shift() : '';
    const dataset_name = splitedParams ? '/' + splitedParams?.join('/') : '';
    const triple_object: TripleProps = {
      id: id,
      run_number: run_number as any,
      dataset_name: dataset_name,
      label: label as any,
    };
    return triple_object;
  });
};

export const getDatasetParts = (datasets: string[], part: string) => {
  const parts: DatasetPartsProps[] = datasets.map((dataset: string) =>
    getDatasetNameSplitBySlashIntoObject(dataset)
  );
  return _.chain(parts).groupBy(part).value();
};
