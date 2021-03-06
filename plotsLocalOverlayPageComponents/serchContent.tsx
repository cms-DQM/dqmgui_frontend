import * as React from 'react'
import { useRouter } from 'next/router';
import { Col } from 'antd'
import cleanDeep from 'clean-deep'

import { SelectedPlotsTable } from './selectedPlotsTable'
import { FoldersRow, NotFoundWrapper, SearchContentWrapper, SpinnerRow, StyledRow } from './styledComponents'
import { changeFolderPathByBreadcrumb } from './utils'
import { FolderPath } from '../containers/display/content/folderPath'
import { PlotProps } from '../containers/display/interfaces'
import { StyledA, Icon, DirecotryWrapper } from '../containers/display/styledComponents'
import { choose_api } from '../containers/display/utils'
import { Spinner } from '../containers/search/styledComponents'
import { useRequest } from '../hooks/useRequestForPlotsLocalOverlay'
import { getFoldersAndPlots } from './getters';
import { PlotProperties, ParametersForApi, OverlaidSeparatelyProps } from './interfaces';
import { addOverlaidPlotToURL, cleanOverlaidPlotsFromURL } from './routerChangers';
import { PlotsNamesTable } from './plotsNamesTable';
import { NoResultsFound } from '../containers/search/noResultsFound';
import { root_url } from '../config/config';
import { CustomDiv, CutomBadge } from '../components/styledComponents';
import { MeCountProps } from '../containers/display/content/directories';

interface SearchContentProps {
  setParameters: React.Dispatch<React.SetStateAction<ParametersForApi | undefined>>
  parameters: ParametersForApi
  referenceHeight: number
}


export const MeCount = ({ me_count, children }: MeCountProps) => {
  return <CutomBadge count={me_count}>{children}</CutomBadge>;
};
export const SearchContent = ({ setParameters, parameters, referenceHeight }: SearchContentProps) => {
  const [lastSelectedPlot, setLastSelectedPlot] = React.useState<any>({ dataset_name: '', run_number: '', folders_path: '', plot_name: '' })
  const [folders, setFolders] = React.useState<(string | undefined)[]>([])
  const [currentFolder, setCurrentFolder] = React.useState<string | undefined>('')
  const [selectedPlots, setSelectedPlots] = React.useState<PlotProperties[]>([])
  const selectedPlotsTableRef = React.useRef<any>(null)
  const folderPathRef = React.useRef<any>(null)

  const [folderPathAndSelectedPlotsTbaleHeights, setFolderPathAndSelectedPlotsTbaleHeights] = React.useState(0)

  const router = useRouter();
  const query = router.query;

  const params: any = {
    dataset_name: query.dataset_name as string,
    run_number: query.run_number as string,
    folders_path: lastSelectedPlot.folders_path,
    plot_search: query.search,
  }

  const api = choose_api(params)
  const data_get_by_mount = useRequest(api,
    {},
    [root_url,
      lastSelectedPlot.folders_path,
      parameters.run_number,
      query.search,
      parameters.plot_search,
      parameters.dataset_name,
      parameters.plot_name]
  );

  React.useEffect(() => {
    const copy = [...folders]
    const index = folders.indexOf(currentFolder)
    if (index >= 0) {
      const rest = copy.splice(0, index + 1)
      setFolders(rest)
      const joinderFolders = rest.join('/')
      setLastSelectedPlot({ folders_path: joinderFolders, plot_name: '' })
    }
    else {
      copy.push(currentFolder)
      //we're cleaning copy array, because we want to delete empty string as an item from it. 
      // We need to remove it because when we're joining array with empty string 
      // we're getting a string with '/' in the beginning.
      const cleaned_array = cleanDeep(copy) ? cleanDeep(copy) : []
      setFolders(cleaned_array)
      const joinderFolders = copy.join('/')
      if (cleaned_array.length === 0) {
        setLastSelectedPlot({ dataset_name: '', run_number: '', folders_path: '', plot_name: '' })
      }
      setLastSelectedPlot({ dataset_name: query.dataset_name, run_number: query.run_number, folders_path: joinderFolders, plot_name: '' })
    }
  }, [currentFolder])

  React.useEffect(() => {
    const copy = { ...parameters }
    const plots_to_parameters = { overlaidSeparately: { plots: selectedPlots } as OverlaidSeparatelyProps }
    const params = { ...copy, ...plots_to_parameters }
    setParameters(params)
    const plots = selectedPlots.map((plot: PlotProps) => {
      if (plot.label) {
        const onePlotFullPath = [plot.folders_path, plot.plot_name, 'reflabel=' + plot.label].join('/')
        return onePlotFullPath
      }
      const onePlotFullPath = [plot.folders_path, plot.plot_name].join('/')
      return onePlotFullPath
    })

    const plotsString = plots.join('&')
    if (plotsString.length > 0) {
      copy.overlaidSeparately = { ...parameters.overlaidSeparately, plots: selectedPlots }
      setParameters(copy)
    }
    else {
      copy.overlaidSeparately = { ...parameters.overlaidSeparately, plots: [] }
      setParameters(copy)
    }
  }, [selectedPlots.length])

  const labels = parameters.overlaidSeparately.plots.map((plot: PlotProperties) => {
    return plot.label
  })
  const labelsString = labels.join(',')

  React.useEffect(() => {
    const plots = selectedPlots.map((plot: PlotProps) => {
      if (plot.label) {
        const onePlotFullPath = [plot.folders_path, plot.plot_name, 'reflabel=' + plot.label].join('/')
        return onePlotFullPath
      }
      const onePlotFullPath = [plot.folders_path, plot.plot_name].join('/')
      return onePlotFullPath
    })
    const plotsString = plots.join('&')

    if (plotsString.length > 0) {
      addOverlaidPlotToURL(plotsString, parameters, router)
    }
    else {
      cleanOverlaidPlotsFromURL(parameters, router)
    }
  }, [
    parameters.size,
    labelsString,
    parameters.overlaidSeparately.plots,
    parameters.overlaidSeparately && parameters.overlaidSeparately.ref,
    parameters.jsroot,
    parameters.stats,
    parameters.normalize,
    parameters.error])

  React.useEffect(() => {
    if (folderPathRef.current && selectedPlotsTableRef.current) {
      setFolderPathAndSelectedPlotsTbaleHeights(
        folderPathRef.current.clientHeight + selectedPlotsTableRef.current.clientHeight
      )
    }
    else {
      setFolderPathAndSelectedPlotsTbaleHeights(0)
    }
  }, [selectedPlotsTableRef.current && selectedPlotsTableRef.current.clientHeight,
  folderPathRef.current && folderPathRef.current.clientHeight,
  folderPathRef.current, referenceHeight])

  const { data } = data_get_by_mount
  const folders_or_plots = data ? data.data : []
  const { directories, plots } = getFoldersAndPlots(folders_or_plots)
  return (
    <StyledRow
      gutter={16}
      smaller={referenceHeight.toString()}>
      <Col style={{ padding: 8 }} ref={folderPathRef}>
        <FolderPath folder_path={lastSelectedPlot.folders_path}
          changeFolderPathByBreadcrumb={(items: any) => changeFolderPathByBreadcrumb(items)(setFolders, setCurrentFolder)} />
      </Col>
      <FoldersRow ref={selectedPlotsTableRef}>
        <SelectedPlotsTable
          query={query}
          lastSelectedPlot={lastSelectedPlot}
          overlaidGlobally={parameters.overlaidGlobally as any[]}
          selectedPlots={selectedPlots}
          setSelectedPlots={setSelectedPlots} />
      </FoldersRow>
      <SearchContentWrapper
        smaller={folderPathAndSelectedPlotsTbaleHeights.toString()}>
        {
          !data_get_by_mount.isLoading &&
          <FoldersRow>
            {directories.sort().map((directory: any) => {
              return (
                <Col span={4} key={directory.subdir}>
                <DirecotryWrapper>
                  <CustomDiv
                    hover="true"
                    display="flex"
                    space="1"
                    alignitems="center"
                    onClick={() => setCurrentFolder(directory.subdir)}
                  >
                    <MeCount me_count={directory.me_count ? directory.me_count : 0}>
                      <Icon/>
                    </MeCount>
                    <StyledA>{directory.subdir}</StyledA>
                  </CustomDiv>
                </DirecotryWrapper>
              </Col>
              )
            })}
          </FoldersRow>
        }
        {data_get_by_mount.isLoading &&
          <SpinnerRow>
            <Spinner />
          </SpinnerRow>
        }
        {!data_get_by_mount.isLoading && plots.length > 0 &&
          <PlotsNamesTable plotNames={plots as any}
            setLastSelectedPlot={setLastSelectedPlot}
            lastSelectedPlot={lastSelectedPlot}
            selectedPlots={selectedPlots}
            dataset_name={query.dataset_name as string}
            run_number={query.run_number as string}
          />

        }{
          directories.length === 0 && plots.length === 0 &&
          <NotFoundWrapper>
            <NoResultsFound />
          </NotFoundWrapper>
        }
      </SearchContentWrapper>
    </StyledRow>
  )
}