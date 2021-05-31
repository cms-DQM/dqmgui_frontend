import { pathOr } from 'ramda'

export const formParamters = (query) => {
  const run_number = pathOr('', ['run_number'], query)
  const lumi = pathOr('', ['lumi'], query)
  const dataset_name = pathOr('', ['dataset_name'], query)
  const folders_path = pathOr('', ['folder_path'], query)
  const plot_search = pathOr('', ['plot_search'], query)

  const parameters = {
    run_number,
    lumi,
    dataset_name,
    folders_path,
    plot_search,
  };
  return parameters
}