import { useState } from 'react';

import { useSearch } from './useSearch';
import { getDatasetParts } from '../components/viewDetailsMenu/utils';
import {
  getAvailableChoices,
  getRestOptions,
  getDatasetNameSplitBySlashIntoObject,
} from '../components/browsing/utils';
import { DatasetPartsProps } from '../components/browsing/datasetsBrowsing/datasetNameBuilder';

export const useAvailbleAndNotAvailableDatasetPartsOptions = (
  run_number: number,
  currentDataset: any
) => {
  const selectedDatasetParts = getDatasetNameSplitBySlashIntoObject(
    currentDataset
  );

  const datasetPartsPositions = Object.keys(selectedDatasetParts).sort();
  const { results_grouped } = useSearch(run_number, '');
  //allDatasets are all possible datasets
  const allDatasets = results_grouped.map((result) => result.dataset);

  const firstPosition = datasetPartsPositions[0];
  //lastSelectedDatasetPartPosition: is POSITION of last selected dataset part
  //lastSelectedDatasetPartPosition is use for grouping all dataset parts possible variants.
  const [
    lastSelectedDatasetPartPosition,
    setLastSelectedDatasetPartPosition,
  ] = useState(firstPosition);

  //lastSelectedDatasetPartOption: is VALUE of last selected dataset part
  const [
    lastSelectedDatasetPartValue,
    setLastSelectedDatasetPartValue,
  ] = useState(selectedDatasetParts[firstPosition]);

  //selectedParts: is SLECTED dataset parts, from whom could be formed full datasetname
  // by defaut selectedParts is formed from currentDataset
  const [selectedParts, setSelectedParts] = useState<DatasetPartsProps>(
    getDatasetNameSplitBySlashIntoObject(currentDataset)
  );

  //allDatasets is string array. One string from this array is FULL dataset name. We need to
  //separated each dataset name to parts. One part of dataset name in FULL string is separated by slash.
  //getDatasetParts function separates dataset names to parts and group them by LAST SELECTED DATASET PART POSITION.
  //getDatasetParts returns LAST SELECTED POSITION VALUE and it possible combinations with other parts
  const partsObjectArray = getDatasetParts(
    allDatasets,
    lastSelectedDatasetPartPosition
  );

  //from all selected dataset name's parts we form full dataset name.

  //Values of selected dataset parts are in datasetParts array
  //The first element of array is empty string, because dataset name should start with slash.
  const datasetParts = Object.values(selectedParts);
  datasetParts.unshift('');
  const fullDatasetName = datasetParts.join('/');
  //We check is dataset name combined from parts is exits in all possible dataset names.
  // rename doesCombinationOfSelectedDatasetPartsExists to datasetExists or resultingDatasetNameCombinationExists
  const doesCombinationOfSelectedDatasetPartsExists = allDatasets.includes(
    fullDatasetName
  );

  const availableAndNotAvailableDatasetParts = datasetPartsPositions.map(
    (part: string) => {
      const availableChoices: string[] = getAvailableChoices(
        partsObjectArray,
        lastSelectedDatasetPartValue,
        part
      );

      const notAvailableChoices = getRestOptions(
        availableChoices,
        allDatasets,
        part
      );

      return {
        [part]: {
          availableChoices: availableChoices,
          notAvailableChoices: notAvailableChoices,
        },
      };
    }
  );

  return {
    availableAndNotAvailableDatasetParts,
    setSelectedParts,
    selectedParts,
    setLastSelectedDatasetPartValue,
    lastSelectedDatasetPartValue,
    setLastSelectedDatasetPartPosition,
    doesCombinationOfSelectedDatasetPartsExists,
    fullDatasetName,
  };
};
