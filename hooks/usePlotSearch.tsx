import { useRequest } from './useRequest'

import { getContents, getDirectories, getFormatedPlotsObject } from '../containers/display/utils'
import { DirectoryInterface, PlotDataProps } from '../containers/display/interfaces';
import { useState, useEffect } from 'react';
import { removeFirstSlash } from '../components/workspaces/utils';
import { PlotInterface } from '../containers/display/DisplayFolderAndPlot';

interface usePlotSearchReturn {
  directories: (string | undefined)[];
  isLoading: boolean;
  errors: string;
  plots: PlotDataProps[]
}

export const usePlotSearch = (plot_name: string, run_number_value?: number, dataset_name?: string, folder_path?: string): usePlotSearchReturn => {
  const [directories, setDirectories] = useState<(string | undefined)[]>([])
  const [plots, setPlots] = useState<any[]>([])

  const folders = folder_path ? removeFirstSlash(folder_path) : ''

  const { data, isLoading, errors } = useRequest(
    `/data/json/archive/${run_number_value}${dataset_name}/${folders}?search=${plot_name}`,
    {},
    [plot_name, folders],
    true
  );

  const contents: (PlotInterface & DirectoryInterface)[] = getContents(data);
  useEffect(() => {
    setDirectories(getDirectories(contents))
    setPlots(getFormatedPlotsObject(contents))
  }, [data, folders, isLoading])
  return { directories, plots, isLoading, errors }
}