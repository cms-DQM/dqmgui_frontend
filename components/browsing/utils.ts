import { getDatasetParts } from '../viewDetailsMenu/utils';
import _ from 'lodash';

export const getRestOptions = (
  availableResultsNames: string[],
  allPossibledatasets: string[],
  part: string
) => {
  const all = Object.keys(getDatasetParts(allPossibledatasets, part));

  return all.filter((item) => !availableResultsNames.includes(item));
};

export const getOneDatasetParts = (dataset: string | undefined) => {
  const parts = dataset ? dataset.split('/') : ['', '', ''];
  return { first: parts[1], second: parts[2], third: parts[3] };
};

export const getAvailableChoices = (
  resultsNames: any,
  name: any,
  part: string
): string[] => {
  // Uniq because more than one item from resultsNames[name] array could have the same resultsNames[name].attribute attribute value

  const available: string[] = resultsNames[name]
    ? _.uniq(resultsNames[name].map((datasetname: any) => datasetname[part]))
    : [];
  if (available.length === 1 && available[0] === name) {
    return Object.keys(resultsNames);
  } else {
    return available;
  }
};
