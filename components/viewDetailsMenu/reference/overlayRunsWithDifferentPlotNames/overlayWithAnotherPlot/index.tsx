import * as React from 'react'
import { useRouter } from 'next/router'
import { Col, Row } from 'antd'
import cleanDeep from 'clean-deep'

import { ParamsForApiProps, PlotoverlaidSeparatelyProps, QueryProps } from '../../../../../containers/display/interfaces'
import { choose_api } from '../../../../../containers/display/utils'
import { store } from '../../../../../contexts/leftSideContext'
import { useRequest } from '../../../../../hooks/useRequest'
import { FolderPath } from '../../../../../containers/display/content/folderPath'
import { PlotInterface, DirectoryInterface } from '../../../../../containers/display/interfaces'
import { FoldersRow, ModalContent, StyledModal } from './styledComponents'
import { changeFolderPathByBreadcrumb, makeLinkableOverlay } from './utils'
import { SelectedPlotsTable } from './selectedPlotsTable'
import { get_plot_with_overlay_new_api } from '../../../../../config/config'
import { Reference } from './reference'
import { useChangeRouter } from '../../../../../hooks/useChangeRouter'
import { DirectoriesAndPlots } from './directoriesAndPlots'

interface OverlayWithAnotherPlotProps {
  visible: boolean;
  setOpenOverlayWithAnotherPlotModal: any;
  default_overlay?: string[];
  params_for_api: ParamsForApiProps;
  set_overlaid_plot_url: React.Dispatch<React.SetStateAction<string | undefined>>
  plot: any
}

export const OverlayWithAnotherPlot = ({ plot, visible, setOpenOverlayWithAnotherPlotModal, default_overlay, params_for_api, set_overlaid_plot_url }: OverlayWithAnotherPlotProps) => {
  const emptyObject: PlotoverlaidSeparatelyProps = { run_number: plot.run_number, dataset_name: plot.dataset_name, folder_path: '', name: '' }
  //TheLastSelectedPlot leus to make a request for folders and plots which are visible in modal when folder path is changing
  //when the last props (plot name) is selected, TheLastSelectedPlot is added to selected plots table which is visible on
  // the top of modal.
  const [theLastSelectedPlot, setTheLastSelectedPlot] = React.useState<PlotoverlaidSeparatelyProps>(emptyObject)
  const [folders, setFolders] = React.useState<(string | undefined)[]>([])
  const [urls, setUrls] = React.useState<string | null>(null)

  const [disabled, setDisabled] = React.useState<boolean>(false)

  const [currentFolder, setCurrentFolder] = React.useState<string | undefined>('')
  const clear = () => {
    setOpenOverlayWithAnotherPlotModal(false)
    setCurrentFolder('')
    setSelectedPlotsToTable([])
    setTheLastSelectedPlot(emptyObject)
    setFolders([])
  }

  const onOk = () => {
    clear()
    if (selectedPlotsToTable.length > 0) {
      params_for_api.overlaidSeparately = overlaid_separately_before_submit
    }
    else {
      params_for_api.overlaidSeparately = undefined
    }
    setUrls(makeLinkableOverlay(params_for_api.overlaidSeparately, plot, query))
    set_overlaid_plot_url(get_plot_with_overlay_new_api(params_for_api))
  }

  const [selectedPlots, setSelectedPlots] = React.useState<PlotoverlaidSeparatelyProps[]>([])
  const [selectedPlotsToTable, setSelectedPlotsToTable] = React.useState<PlotoverlaidSeparatelyProps[]>([])

  const router = useRouter();
  const query: QueryProps = router.query;

  React.useEffect(() => {
    if (selectedPlotsToTable.length === 0) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [selectedPlotsToTable.length])


  React.useEffect(() => {
    if (theLastSelectedPlot.name) {
      const copy = [...selectedPlotsToTable]
      copy.push(theLastSelectedPlot)
      setSelectedPlotsToTable(copy)
    }
  }, [theLastSelectedPlot])

  React.useEffect(() => {
    set_overlaid_plot_url(get_plot_with_overlay_new_api(params_for_api))
  }, [params_for_api.overlaidSeparately, selectedPlots])

  const { updated_by_not_older_than } = React.useContext(store)

  const params: ParamsForApiProps = {
    dataset_name: query.dataset_name as string,
    run_number: query.run_number as string,
    notOlderThan: updated_by_not_older_than,
    folders_path: theLastSelectedPlot.folder_path,
  }

  const api = choose_api(params)
  const data_get_by_mount = useRequest(api,
    {},
    [theLastSelectedPlot.folder_path]
  );

  React.useEffect(() => {
    const copy = [...folders]
    const index = folders.indexOf(currentFolder)

    if (index >= 0) {
      const rest = copy.splice(0, index + 1)
      setFolders(rest)
      const joinderFolders = rest.join('/')
      setTheLastSelectedPlot(() => {
        emptyObject.folder_path = joinderFolders
        return emptyObject
      })
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
        setTheLastSelectedPlot(() => {
          emptyObject.folder_path = ''
          return emptyObject
        })
      }
      setTheLastSelectedPlot(() => {
        emptyObject.folder_path = joinderFolders
        return emptyObject
      })
    }
  }, [currentFolder])

  const { data } = data_get_by_mount
  const folders_or_plots = data ? data.data : []
  const directories: string[] = []
  const plots_names: string[] = []

  folders_or_plots.forEach((folder_or_plot: DirectoryInterface & PlotInterface) => {
    directories.push(folder_or_plot.subdir)
    plots_names.push(folder_or_plot.name)
  })

  directories.sort()
  plots_names.sort()

  useChangeRouter({ selected_plots: urls },
    [params_for_api.overlaidSeparately?.plots.length,
    params_for_api.overlaidSeparately?.normalize,
    params_for_api.overlaidSeparately?.ref],
    urls !== null)

  const initial_normalize_value = params_for_api.normalize ? params_for_api.normalize : 'True'
  const initial_overlay_value = params_for_api.overlay ? params_for_api.overlay : 'overlay'
  const initial_stats_value = params_for_api.stats ? params_for_api.stats : ''

  const overlaid_separately_before_submit = {
    plots: selectedPlotsToTable,
    normalize: initial_normalize_value,
    ref: initial_overlay_value,
    stats: initial_stats_value,
  }

  return (
    <StyledModal
      centered={true}
      visible={visible}
      onCancel={() => clear()}
      onOk={onOk}
    >
      <Row gutter={16} >
        <FoldersRow>
          <Reference
            overlaid_separately_before_submit={overlaid_separately_before_submit}
            disabled={disabled}
          />
        </FoldersRow>
        <FoldersRow>
          <SelectedPlotsTable
            visible={visible}
            params_for_api={params_for_api}
            default_overlay={default_overlay}
            theLastSelectedPlot={theLastSelectedPlot}
            plot={plot}
            setSelectedPlots={setSelectedPlots}
            selectedPlotsToTable={selectedPlotsToTable}
            setSelectedPlotsToTable={setSelectedPlotsToTable}
          />
        </FoldersRow>
        <Col style={{ padding: 8 }}>
          <FolderPath folder_path={theLastSelectedPlot.folder_path}
            changeFolderPathByBreadcrumb={(items: any) => changeFolderPathByBreadcrumb(items)(setFolders, setCurrentFolder)} />
        </Col>
        <ModalContent>
          <DirectoriesAndPlots
            selectedPlotsToTable={selectedPlotsToTable}
            data_get_by_mount={data_get_by_mount}
            directories={directories}
            theLastSelectedPlot={theLastSelectedPlot}
            plots_names={plots_names}
            selectedPlots={selectedPlots}
            setCurrentFolder={setCurrentFolder}
            setTheLastSelectedPlot={setTheLastSelectedPlot}
          />
        </ModalContent>
      </Row>
    </StyledModal>
  )
}
