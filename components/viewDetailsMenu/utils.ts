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

export const getDisabledButtonTitle = (
  overlaidPlotsLimisIsReached: boolean
) => {
  const title = 'Maximum 4 plots could be overlaid!';
  if (overlaidPlotsLimisIsReached) {
    return title;
  }
  return '';
};
