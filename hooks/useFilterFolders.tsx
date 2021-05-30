import { useContext, useEffect, useMemo, useState, } from 'react'
import { useRouter } from 'next/router';
import { equals } from 'ramda'

import { get_plot_from_layouts } from '../api/get_plots_from_layouts';
import { QueryProps } from '../containers/display/interfaces';
import { choose_api } from '../containers/display/utils';
import { formParamters } from '../utils/constructors/constructParameters';
import { extract_folders_and_plots } from '../utils/extractors/extract_folders_and_plots';
import { useDataFromWorkspaces } from './useDataFromWorkspace';
import { useRequest } from './useRequestForPlotsLocalOverlay';
import { store } from '../contexts/globalStateContext';
import { useRequests } from './useRequests';
import { construct_layout_plot_objects } from '../utils/constructors/contract_layout_plot_object';
import { get_source_and_destination_of_layout } from '../api/newApi';

const setLoaders = async (loader, allLoaders, setAllLoaders) => {
  const copy = [...allLoaders]
  await copy.push(loader)
  setAllLoaders(copy)
}

export const useFolderAndPlots = () => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const parameters = formParamters(query)
  const [finalFoldersSet, setFinalFoldersSet] = useState([])
  const [allLoaders, setAllLoaders] = useState([])
  // const [allPlots, setAllPlots] = useState([])
  const { workspace } = useContext(store)

  const api_for_allPlots_andAllDirs = choose_api(parameters);
  const { data, isLoading } = useRequest(api_for_allPlots_andAllDirs, {}, Object.values(parameters))
  const { folders, plots } = extract_folders_and_plots(data)
  const { filteredFolders, layouts_of_quick_collections, } = useDataFromWorkspaces(folders);

  const urls = layouts_of_quick_collections.map((layout_name) => {
    return (get_source_and_destination_of_layout(layout_name))
  })

  // const { datas_and_layout_name } = 
  useRequests(urls, [workspace])
  // const quick = construct_layout_plot_objects(datas_and_layout_name)
  useEffect(() => {
    setFinalFoldersSet(filteredFolders)
  }, [filteredFolders])

  // const allPlots = quick.concat(plots)
  // useEffect(() => {
  //   setAllPlots(plots.concat(quickCollections))
  // }, [quickCollections])
  // console.log(allPlots)
  // useEffect(() => {
  //   setLoaders(isLoading, allLoaders, setAllLoaders)
  // }, [isLoading])

  return { foldersByPlotSearch: finalFoldersSet, plots: [], isLoading: false, errors: [] }
}