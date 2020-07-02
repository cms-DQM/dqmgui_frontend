import { useRequest } from './useRequest';

import { getContents, getDirectories } from '../containers/display/utils';
import {
  DirectoryInterface,
  PlotDataProps,
} from '../containers/display/interfaces';
import { useState, useEffect } from 'react';
import { removeFirstSlash } from '../components/workspaces/utils';
import { PlotInterface } from '../containers/display/DisplayFolderAndPlot';
import { useDisplayedName } from './useDisplayName';

interface usePlotSearchReturn {
  directories: (string | undefined)[];
  isLoading: boolean;
  errors: any[];
  plots: PlotDataProps[];
}

export const usePlotSearch = (
  plot_name: string,
  run_number_value?: string,
  dataset_name?: string,
  folder_path?: string
): usePlotSearchReturn => {
  const [directories, setDirectories] = useState<(string | undefined)[]>([]);
  const [plots, setPlots] = useState<any[]>([]);

  const folders = folder_path ? removeFirstSlash(folder_path) : '';

  const { data, isLoading, errors } = useRequest(
    `/data/json/archive/${run_number_value}${dataset_name}/${folders}?search=${plot_name}`,
    {},
    [plot_name, folders],
    true
  );

  const contents: (PlotInterface & DirectoryInterface)[] = getContents(data);
  const formattedPlotsObject = useDisplayedName(contents, data);

  useEffect(() => {
    setDirectories(getDirectories(contents));
    setPlots(formattedPlotsObject);
  }, [data, folders, isLoading]);
  return { directories, plots, isLoading, errors };
};
