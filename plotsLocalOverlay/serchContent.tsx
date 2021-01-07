import * as React from 'react'
import { Button, Col, Row, Tooltip } from 'antd'
import cleanDeep from 'clean-deep'
import { useRouter } from 'next/router'

import { SelectedPlotsTable } from './selectedPlotsTable'
import { FoldersRow, PlotNameDiv, PlotsRow, SpinnerRow } from './styledComponents'
import { changeFolderPathByBreadcrumb, setPlot } from './utils'
import { FolderPath } from '../containers/display/content/folderPath'
import { DirectoryInterface, ParamsForApiProps, PlotInterface, PlotoverlaidSeparatelyProps, QueryProps } from '../containers/display/interfaces'
import { StyledA, Icon } from '../containers/display/styledComponents'
import { choose_api } from '../containers/display/utils'
import { Spinner } from '../containers/search/styledComponents'
import { store } from '../contexts/leftSideContext'
import { useRequest } from '../hooks/useRequest'
import { get_plot_url, get_plot_with_overlay_new_api } from '../config/config'

const getFoldersAndPlots = (data: (DirectoryInterface & PlotInterface)[]) => {
  const directories: string[] = []
  const plots: string[] = []

  data.forEach((folder_or_plot: DirectoryInterface & PlotInterface) => {
    directories.push(folder_or_plot.subdir)
    plots.push(folder_or_plot.name)
  })
  return { directories, plots }
}

interface SearchContentProps {
  setPlotUrl: React.Dispatch<React.SetStateAction<string>>
  params_for_api: ParamsForApiProps
}

export const SearchContent = ({ setPlotUrl, params_for_api }: SearchContentProps) => {
  const [lastSelectedPlot, setLastSelectedPlot] = React.useState<any>({ folders_path: '', plot_name: '' })
  const [folders, setFolders] = React.useState<(string | undefined)[]>([])
  const [currentFolder, setCurrentFolder] = React.useState<string | undefined>('')
  const [selectedPlots, setSelectedPlots] = React.useState<PlotoverlaidSeparatelyProps[]>([])

  const router = useRouter();
  const query: QueryProps = router.query;
  const { updated_by_not_older_than } = React.useContext(store)

  const params: ParamsForApiProps = {
    dataset_name: query.dataset_name as string,
    run_number: query.run_number as string,
    notOlderThan: updated_by_not_older_than,
    folders_path: lastSelectedPlot.folders_path,
  }

  const api = choose_api(params)
  const data_get_by_mount = useRequest(api,
    {},
    [lastSelectedPlot.folders_path,
    params_for_api.run_number,
    params_for_api.dataset_name,
    params_for_api.plot_name]
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
    console.log('selectedx')
    if (selectedPlots.length > 0) {
      params_for_api.overlaidSeparately = {
        plots: selectedPlots,
        ref: 'overlay',
        normalize: 'True',
        stats: '',
      }
      setPlotUrl(get_plot_with_overlay_new_api(params_for_api))
    }
    else {
      setPlotUrl(get_plot_url(params_for_api))
    }
  }, [selectedPlots.length, selectedPlots])

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
        {
          <PlotsRow gutter={16}>{
            !data_get_by_mount.isLoading && plots.map((plot: any, index: number) => {
              const current_plot = { folders_path: lastSelectedPlot.folders_path, plot_name: plot }
              const disabled = selectedPlots.findIndex((selectedPlot) =>
                selectedPlot.folders_path === current_plot.folders_path && selectedPlot.plot_name === current_plot.plot_name) > -1
              return (
                <>
                  {plot &&
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