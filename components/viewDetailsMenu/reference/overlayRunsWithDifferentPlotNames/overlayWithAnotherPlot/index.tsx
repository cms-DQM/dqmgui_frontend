import * as React from 'react'
import { useRouter } from 'next/router'
import Modal from 'antd/lib/modal/Modal'
import { Col, Row } from 'antd'
import cleanDeep from 'clean-deep'

import { ParamsForApiProps, PlotoverlaidSeparatelyProps, QueryProps } from '../../../../../containers/display/interfaces'
import { Icon, StyledA } from '../../../../../containers/display/styledComponents'
import { choose_api } from '../../../../../containers/display/utils'
import { store } from '../../../../../contexts/leftSideContext'
import { useRequest } from '../../../../../hooks/useRequest'
import { FolderPath } from '../../../../../containers/display/content/folderPath'
import { PlotInterface, DirectoryInterface } from '../../../../../containers/display/interfaces'
import { Spinner } from '../../../../../containers/search/styledComponents'
import { FoldersRow, ModalContent, PlotsRow, SpinnerRow } from './styledComponents'
import { changeFolderPathByBreadcrumb, makeLinkableOverlay, setPlot } from './utils'
import { SelectedPlotsTable } from './selectedPlotsTable'
import { get_plot_with_overlay_new_api } from '../../../../../config/config'
import { Reference } from '../../reference'
import { PlotButton } from './plotButton'
import { useChangeRouter } from '../../../../../hooks/useChangeRouter'

interface OverlayWithAnotherPlotProps {
  visible: boolean;
  setOpenOverlayWithAnotherPlotModal: any;
  default_overlay?: string[];
  params_for_api: ParamsForApiProps;
  set_overlaid_plot_url: React.Dispatch<React.SetStateAction<string | undefined>>
  plot: any
}

export const OverlayWithAnotherPlot = ({ plot, visible, setOpenOverlayWithAnotherPlotModal, default_overlay, params_for_api, set_overlaid_plot_url }: OverlayWithAnotherPlotProps) => {
  const emptyObject: PlotoverlaidSeparatelyProps = { run_number: '', dataset_name: '', folder_path: '', name: '' }
  const [overlaidPlots, setOverlaidPlots] = React.useState<PlotoverlaidSeparatelyProps>(emptyObject)
  const [folders, setFolders] = React.useState<(string | undefined)[]>([])
  const [urls, setUrls] = React.useState<string | null>(null)

  const initial_normalize_value = params_for_api.normalize ? params_for_api.normalize : 'True'
  const initial_overlay_value = params_for_api.overlay ? params_for_api.overlay : 'overlay'
  const initial_stats_value = params_for_api.stats ? params_for_api.stats : ''

  const [normalize, setNormaize] = React.useState<string>(initial_normalize_value)
  const [overlayPosition, setOverlayPosition] = React.useState<string>(initial_overlay_value)
  const [stats, setStats] = React.useState<string>(initial_stats_value)
  const [disabled, setDisabled] = React.useState<boolean>()

  const [currentFolder, setCurrentFolder] = React.useState<string | undefined>('')
  const clear = () => {
    setOpenOverlayWithAnotherPlotModal(false)
    setCurrentFolder('')
    setOverlaidPlots(emptyObject)
    setFolders([])
  }

  const [selectedPlots, setSelectedPlots] = React.useState<PlotoverlaidSeparatelyProps[]>([])
  const router = useRouter();
  const query: QueryProps = router.query;

  React.useEffect(() => {
    if (selectedPlots.length === 0 ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [ selectedPlots.length ])

  React.useEffect(() => {
    if (plot.overlaidSeparately) {
      setSelectedPlots(plot.overlaidSeparately.plots)
    }
  }, [visible])

  React.useEffect(() => {
    set_overlaid_plot_url(get_plot_with_overlay_new_api(params_for_api))
  }, [params_for_api.overlaidSeparately, selectedPlots])

  const { updated_by_not_older_than } = React.useContext(store)

  const params: ParamsForApiProps = {
    dataset_name: query.dataset_name as string,
    run_number: query.run_number as string,
    notOlderThan: updated_by_not_older_than,
    folders_path: overlaidPlots.folder_path,
  }

  const api = choose_api(params)
  const data_get_by_mount = useRequest(api,
    {},
    [overlaidPlots.folder_path]
  );

  React.useEffect(() => {
    const copy = [...folders]
    const index = folders.indexOf(currentFolder)

    if (index >= 0) {
      const rest = copy.splice(0, index + 1)
      setFolders(rest)
      const joinderFolders = rest.join('/')
      setOverlaidPlots(() => {
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
        setOverlaidPlots(() => {
          emptyObject.folder_path = ''
          return emptyObject
        })
      }
      setOverlaidPlots(() => {
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

  return (
    <Modal
      visible={visible}
      onCancel={() => clear()}
      onOk={async () => {
        clear()
        if (selectedPlots.length > 0) {
          params_for_api.overlaidSeparately = { plots: selectedPlots, normalize: normalize, ref: overlayPosition }
        }
        else {
          params_for_api.overlaidSeparately = undefined
        }
        setUrls(makeLinkableOverlay(params_for_api.overlaidSeparately, plot, query))
        set_overlaid_plot_url(get_plot_with_overlay_new_api(params_for_api))
      }}
    >
      <Row gutter={16} >
        <FoldersRow>
          <Reference
            setNormalize={setNormaize}
            setPosition={setOverlayPosition}
            setStats={setStats}
            disabled={disabled}
            normalize={normalize}
            stats={stats}
            position={overlayPosition}
          />
        </FoldersRow>
        <FoldersRow>
          <SelectedPlotsTable
            default_overlay={default_overlay}
            overlaidPlots={overlaidPlots}
            plot={plot}
            setSelectedPlots={setSelectedPlots} />
        </FoldersRow>
        <Col style={{ padding: 8 }}>
          <FolderPath folder_path={overlaidPlots.folder_path}
            changeFolderPathByBreadcrumb={(items: any) => changeFolderPathByBreadcrumb(items)(setFolders, setCurrentFolder)} />
        </Col>
        <ModalContent>
          {
            !data_get_by_mount.isLoading &&
            <FoldersRow>
              {directories.map((directory: any) => {
                return (
                  <>
                    {directory &&
                      <Col span={8} onClick={() => setCurrentFolder(directory)}>
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
              !data_get_by_mount.isLoading && plots_names.map((plot_name: any) => {
                const current_plot = { folder_path: overlaidPlots.folder_path, name: plot_name }
                const disabled = selectedPlots.findIndex((selectedPlot) =>
                  selectedPlot.folder_path === current_plot.folder_path && selectedPlot.name === current_plot.name) > -1
                return (
                  <>
                    {plot_name &&
                      <PlotButton
                        disabled={disabled}
                        setOverlaidPlots={setOverlaidPlots}
                        setPlot={setPlot}
                        overlaidPlots={overlaidPlots}
                        plot_name={plot_name} />
                    }
                  </>
                )
              })
            }
            </PlotsRow>
          }
        </ModalContent>
      </Row>
    </Modal>
  )
}