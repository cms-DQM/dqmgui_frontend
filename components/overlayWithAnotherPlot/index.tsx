import * as React from 'react'
import Modal from 'antd/lib/modal/Modal'
import { useRouter } from 'next/router'

import { ParamsForApiProps, PlotoverlaidSeparatelyProps, QueryProps } from '../../containers/display/interfaces'
import { Icon, StyledA } from '../../containers/display/styledComponents'
import { choose_api } from '../../containers/display/utils'
import { store } from '../../contexts/leftSideContext'
import { useRequest } from '../../hooks/useRequest'
import { Button, Col, Row } from 'antd'
import { FolderPath } from '../../containers/display/content/folderPath'
import { ParsedUrlQueryInput } from 'querystring'
import cleanDeep from 'clean-deep'
import { Spinner } from '../../containers/search/styledComponents'

interface OverlayWithAnotherPlotProps {
  visible: boolean;
  setOpenOverlayWithAnotherPlotModal: any
}

export const OverlayWithAnotherPlot = ({ visible, setOpenOverlayWithAnotherPlotModal }: OverlayWithAnotherPlotProps) => {
  const [overlaidPlots, setOverlaidPlots] = React.useState<PlotoverlaidSeparatelyProps>({ folder_path: '', name: '' })
  const [folders, setFolders] = React.useState<(string | undefined)[]>([])
  const [currentFolder, setCurrentFolder] = React.useState<string | undefined>('')
  const [plot, setPlot] = React.useState({})
  const [height, setHeight] = React.useState()

  const router = useRouter();
  const query: QueryProps = router.query;
  const { updated_by_not_older_than } = React.useContext(store)

  const params: ParamsForApiProps = {
    dataset_name: query.dataset_name as string,
    run_number: query.run_number as string,
    notOlderThan: updated_by_not_older_than,
    folders_path: overlaidPlots.folder_path,
    plot_name: overlaidPlots.name
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
      setOverlaidPlots({ folder_path: joinderFolders, name: '' })
    }
    else {
      copy.push(currentFolder)
      //we're cleaning copy array, because we want to delete empty string. 
      // We need to remove it because when we're joining array with empty string 
      // we're getting a string with '/' in the beginning.
      const cleaned_array = cleanDeep(copy) ? cleanDeep(copy) : []
      setFolders(cleaned_array)
      const joinderFolders = copy.join('/')
      if (cleaned_array.length === 0) {
        setOverlaidPlots({ folder_path: '', name: '' })
      }
      setOverlaidPlots({ folder_path: joinderFolders, name: '' })
    }
  }, [currentFolder])

  const modalRef = React.useRef(null);

  const { data } = data_get_by_mount
  const folders_or_plots = data ? data.data : []
  const changeFolderPathByBreadcrumb = (item: ParsedUrlQueryInput) => {
    const folders_from_breadcrumb = item.folder_path.split('/')
    const cleaned_folders_array = cleanDeep(folders_from_breadcrumb) ? cleanDeep(folders_from_breadcrumb) : []
    setFolders(cleaned_folders_array)
    if (cleaned_folders_array.length > 0) {
      setCurrentFolder(cleaned_folders_array[cleaned_folders_array.length - 1])
    }
    else {
      setCurrentFolder('')
    }
  }

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        setOpenOverlayWithAnotherPlotModal(false)
        setCurrentFolder('')
      }}
    >
      <Row gutter={16} >
        <Col style={{ padding: 8 }}>
          <FolderPath folder_path={overlaidPlots.folder_path} changeFolderPathByBreadcrumb={changeFolderPathByBreadcrumb} />
        </Col>
        {
          !data_get_by_mount.isLoading &&
          <Row style={{ width: '100%', flex: '1 1 auto' }}>
            {folders_or_plots.map((folder_or_plot: any) => {
              return (
                <>
                  {folder_or_plot.subdir &&
                    <Col span={8} onClick={() => setCurrentFolder(folder_or_plot.subdir)}>
                      <Icon />
                      <StyledA>{folder_or_plot.subdir}</StyledA>
                    </Col>
                  }
                </>
              )
            })}
          </Row>
        }
        {data_get_by_mount.isLoading &&
          <Row style={{ width: '100%', display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
            <Spinner />
          </Row>
        }
        {
          <Row>{
            !data_get_by_mount.isLoading && folders_or_plots.map((folder_or_plot: any) => {
              return (
                <>
                  {folder_or_plot.name &&
                    <Col span={16} onClick={() => setPlot(folder_or_plot)}>
                      <Button block>{folder_or_plot.name}</Button>
                    </Col>
                  }
                </>
              )
            })
          }
          </Row>
        }
      </Row>
    </Modal>
  )
}