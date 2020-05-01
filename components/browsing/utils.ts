import { getDatasetParts } from "../viewDetailsMenu/utils";

export const getRestOptions = (availableResultsNames: string[], allPossibledatasets: string[], part: string) => {
  const all = Object.keys(getDatasetParts(allPossibledatasets, part))
  
  return all.filter(item => !availableResultsNames.includes(item));
}

export const getOneDatasetParts = (dataset: string | undefined) => {
  const parts = dataset ? dataset.split('/') : ['', '', '']
  return { first: parts[1], second: parts[2], third: parts[3] }
}