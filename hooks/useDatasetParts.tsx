import { useSearch } from "./useSearch";
import { getDatasetParts } from "../components/viewDetailsMenu/utils";
import { getAvailableChoices, getRestOptions } from "../components/browsing/utils";

export const useDatasetPart = (
  run_number: number, datasetParts: string[], lastSelectedPartName: string, lastSelectedPart: string) => {
  const { results, results_grouped, searching, isLoading, error } = useSearch(
    run_number,
    ''
  );

  const allDatasets = results_grouped.map((result) => result.dataset);
  //lastSelectedPart grouping by last selected part of dataset
  const partsObjectArray = getDatasetParts(allDatasets, lastSelectedPart);

  //getAvailableChoices finds first part of dataset name, which exists by last selected part;
  //if the last selected part was the first one, it returns all possible forst choices
  const availableAndNotAvailableDatasetPats = datasetParts.map((part: string) => {
    const availableChoices: string[] = getAvailableChoices(
      partsObjectArray,
      lastSelectedPartName,
      part
    );
    //notAvailableChoices: all existing first/second/third parts of dataset without available ones
    const notAvailableChoices = getRestOptions(availableChoices, allDatasets, part);

    return {
      [part]: {
        availableChoices: availableChoices,
        notAvailableChoices: notAvailableChoices
      }
    }
  })

  return availableAndNotAvailableDatasetPats
}