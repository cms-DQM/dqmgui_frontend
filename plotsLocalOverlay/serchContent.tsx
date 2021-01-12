import * as React from 'react'
import { useRouter } from 'next/router';
import { Button, Col, Row, Tooltip } from 'antd'
import cleanDeep from 'clean-deep'

import { SelectedPlotsTable } from './selectedPlotsTable'
import { FoldersRow, PlotNameDiv, PlotsRow, SpinnerRow } from './styledComponents'
import { changeFolderPathByBreadcrumb, setPlot } from './utils'
import { FolderPath } from '../containers/display/content/folderPath'
import { ParamsForApiProps, PlotProps } from '../containers/display/interfaces'
import { StyledA, Icon } from '../containers/display/styledComponents'
import { choose_api } from '../containers/display/utils'
import { Spinner } from '../containers/search/styledComponents'
import { useRequest } from '../hooks/useRequest'
import { getFoldersAndPlots } from './getters';
import { PlotProperties, ParametersForApi, OverlaidSeparatelyProps } from './interfaces';
import { addOverlaidPlotToURL, cleanOverlaidPlotsFromURL } from './routerChangers';

interface SearchContentProps {
  setParameters: React.Dispatch<React.SetStateAction<ParametersForApi | undefined>>
  parameters: ParametersForApi
}

export const SearchContent = ({ setParameters, parameters }: SearchContentProps) => {
  const [lastSelectedPlot, setLastSelectedPlot] = React.useState<any>({ folders_path: '', plot_name: '' })
  const [folders, setFolders] = React.useState<(string | undefined)[]>([])
  const [currentFolder, setCurrentFolder] = React.useState<string | undefined>('')
  const [selectedPlots, setSelectedPlots] = React.useState<PlotProperties[]>([])

  const router = useRouter();
  const query = router.query;

  const params: ParamsForApiProps = {
    dataset_name: query.dataset_name as string,
    run_number: query.run_number as string,
    folders_path: lastSelectedPlot.folders_path,
  }

  const api = choose_api(params)
  const data_get_by_mount = useRequest(api,
    {},
    [lastSelectedPlot.folders_path,
    parameters.run_number,
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
        setLastSelectedPlot({ folders_path: '', plot_name: '' })
      }
      setLastSelectedPlot({ folders_path: joinderFolders, plot_name: '' })
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
  }, [
    selectedPlots.length,
  ])

  const labels = parameters.overlaidSeparately.plots.map((plot: PlotProperties) => {
    return plot.label
  })
const labelsString = labels.join(',')
  React.useEffect(() => {
    console.log('label')
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

  const { data } = data_get_by_mount
  const folders_or_plots = data ? data.data : []
  const { directories, plots } = getFoldersAndPlots(folders_or_plots)

  return (
    <Row gutter={16} >
      <Col style={{ padding: 8 }}>
        <FolderPath folder_path={lastSelectedPlot.folders_path}
          changeFolderPathByBreadcrumb={(items: any) => changeFolderPathByBreadcrumb(items)(setFolders, setCurrentFolder)} />
      </Col>
      <FoldersRow>
        <SelectedPlotsTable
          query={query}
          lastSelectedPlot={lastSelectedPlot}
          selectedPlots={selectedPlots}
          setSelectedPlots={setSelectedPlots} />
      </FoldersRow>
      <>
        {
          !data_get_by_mount.isLoading &&
          <FoldersRow>
            {directories.map((directory: any) => {
              return (
                <>
                  {directory &&
                    <Col key={directory} span={8} onClick={() => setCurrentFolder(directory)}>
                      <Icon />
                      <StyledA>{directory}</StyledA>
                    </Col>
                  }
                </>
              )
            })}
          </FoldersRow>
        }
        {data_get_by_mount.isLoading &&
          <SpinnerRow>
            <Spinner />
          </SpinnerRow>
        }
        {selectedPlots.length >= 8 && <p>Cannot be selected more than 8 plots!</p>}
        {
          <PlotsRow gutter={16}>{
            !data_get_by_mount.isLoading && plots.map((plot: any, index: number) => {
              const current_plot = { folders_path: lastSelectedPlot.folders_path, plot_name: plot }
              const disabled = selectedPlots.findIndex((selectedPlot) =>
                selectedPlot.folders_path === current_plot.folders_path && selectedPlot.plot_name === current_plot.plot_name) > -1 ||
                selectedPlots.length >= 8
              return (<>
                  {plot && selectedPlots.length < 8 &&
                    <Tooltip key={index} title={disabled ? 'This plot is already selected' : ''}>
                      <Button
                        type='text'
                        block
                        disabled={disabled}
                        onClick={() => setLastSelectedPlot(setPlot(lastSelectedPlot, plot))}>
                        <PlotNameDiv
                        >{plot}</PlotNameDiv>
                      </Button>
                    </Tooltip>
                  }
                    </>
              )
            })
          }
          </PlotsRow>
        }
      </>
    </Row>
  )
}