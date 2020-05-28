import { useRequest } from './useRequest'

import { getContents, getDirectories } from '../containers/display/utils'
import { DirectoryInterface } from '../containers/display/interfaces';
import { message } from '../components/notifications/index'

interface usePlotSearchReturn {
  directories: (string | undefined)[];
  isLoading: boolean;
  errors: string;
}

export const usePlotSearch = (plot_name: string, run_number_value?: number, dataset_name?: string, folder_path? :string): usePlotSearchReturn => {
  const searching = !!(plot_name);

  const { data, isLoading, errors } = useRequest(
    `/data/json/archive/${run_number_value}${dataset_name}?search=${plot_name}`,
    { params: { processData: false, contentType: false } },
    [plot_name, folder_path],
    searching
  );

  const contents: DirectoryInterface[] = getContents(data) ? getContents(data) : []
  console.log(contents)
  const directories = getDirectories(contents)
  // if (data && directories.length === 0) {
  //   message("No Plots found by search", 'error')
  // } else if (data && directories.length > 0) {
  //   message("Plot are found by search", 'success')
  // }
  return { directories, isLoading, errors }
}