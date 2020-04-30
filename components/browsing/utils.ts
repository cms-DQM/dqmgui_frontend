import { getDatasetParts } from "../viewDetailsMenu/utils";

export const getRestOptions = (firstResultsNames: string[], datasets: string[], part: string) => {
  const all = Object.keys(getDatasetParts(datasets, part))
  
  return all.filter(item => !firstResultsNames.includes(item));
}

export const getOneDatasetParts = (dataset: string | undefined) => {
  const parts = dataset ? dataset.split('/') : ['', '', '']
  return { first: parts[1], second: parts[2], third: parts[3] }
}