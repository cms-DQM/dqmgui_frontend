import { getDatasetParts } from "../viewDetailsMenu/utils";

export const getRestOptions = (firstResultsNames: string[], datasets: string[], part: string) => {
  const all = Object.keys(getDatasetParts(datasets, part))
  firstResultsNames.map((result: string) => {
    const index = all.indexOf(result)
    if (index > -1) {
      all.splice(index, 1);
    }
  })
  return all
}

export const getOneDatasetParts = (dataset: string | undefined) => {
  const parts = dataset ? dataset.split('/') : ['', '', '']
  return { first: parts[1], second: parts[2], third: parts[3] }
}