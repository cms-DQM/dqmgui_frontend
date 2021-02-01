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
    return undefined;
  });

export const filter_plots = (triples: TripleProps[], id: any) => {
  return triples.filter((triple: TripleProps) => {
    if (triple.id !== id && triple.run_number) {
      return triple;
    }
  });
};

export const formTriples = (overlay_data: string | undefined) => {
  if (!!overlay_data) {
    const data = overlay_data?.split('&');
    const triples = data?.map((oneRun: string) => {
      const id = uuidv4();
      const splitedParams = oneRun ? cleanDeep(oneRun.split('/')) : undefined;
      const label = splitedParams ? splitedParams.pop() : '';
      const run_number = splitedParams ? splitedParams.shift() : '';
      const dataset_name = splitedParams ? '/' + splitedParams?.join('/') : '';
      const triple_object: TripleProps = {
        id: id,
        checked: true,
        run_number: run_number as any,
        dataset_name: dataset_name,
        label: label as any,
      };

      return triple_object;
    });
    return triples;
  }
  return [];
};

export const getDatasetParts = (datasets: string[], part: string) => {
  const parts: DatasetPartsProps[] = datasets.map((dataset: string) =>
    getDatasetNameSplitBySlashIntoObject(dataset)
  );
  return _.chain(parts).groupBy(part).value();
};

export const concatArrays = (arrays: any[]) => {
  let concatedArray: any = [];
  arrays.forEach((array) => {
    concatedArray = concatedArray.concat(array);
  });
  return concatedArray;
};

export const changeRunsForOverlayPropsValues = (
  value: string | number,
  key: string,
  id: string | number | boolean,
  runs: TripleProps[],
  set_action: any
) => {
  const current_line: TripleProps = runs.filter(
    (line: TripleProps) => line.id === id
  )[0];
  const index_of_line: number = runs.indexOf(current_line);
  current_line[key] = value;
  runs[index_of_line] = current_line;
  return set_action(runs as any);
};

export const getDisabledButtonTitle = (
  overlaidPlotsLimisIsReached: boolean
) => {
  const title = 'Maximum 4 plots could be overlaid!';
  if (overlaidPlotsLimisIsReached) {
    return title;
  }
  return '';
};
