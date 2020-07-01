import { getDatasetParts } from '../viewDetailsMenu/utils';
import _ from 'lodash';
import cleanDeep from 'clean-deep';

export const getRestOptions = (
  availableResultsNames: string[],
  allPossibledatasets: string[],
  part: string
) => {
  const all = Object.keys(getDatasetParts(allPossibledatasets, part));
  return all.filter((item) => !availableResultsNames.includes(item));
};

export const getDatasetNameSplitBySlashIntoObject = (
  dataset: string | undefined
) => {
  const parts = dataset ? dataset.split('/') : ['', '', ''];
  //cleanDeep deletes all empty strings, undefined, nulls, NaN, empty obj.
  const cleanedParts = cleanDeep(parts);

  //split dataset to parts and add them to an object
  const datasetParts: any = cleanedParts.reduce((acc, cur) => {
    const index = cleanedParts.indexOf(cur);
    const partName = `part_${index}`;
    return { ...acc, [partName]: cur };
  }, {});

  return datasetParts;
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
  //
  if (available.length === 1 && available[0] === name) {
    return Object.keys(resultsNames);
  } else {
    return available;
  }
};
