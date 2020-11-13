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

interface OverlayWithAnotherPlotProps {
  visible: boolean;
  setOpenOverlayWithAnotherPlotModal: any
}

export const OverlayWithAnotherPlot = ({ visible, setOpenOverlayWithAnotherPlotModal }: OverlayWithAnotherPlotProps) => {
  const [data, setData] = React.useState<any>([])
  const [overlaidPlots, setOverlaidPlots] = React.useState<PlotoverlaidSeparatelyProps>({ folder_path: '', name: '' })
  const [folderPath, setFolderPath] = React.useState<string[]>([])
  const [currentFolder, setCurrentFolder] = React.useState('')
  const [plot, setPlot] = React.useState({})

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
    if (data_get_by_mount && data_get_by_mount.data) {
      setData(data_get_by_mount.data.data)
    }
    console.log()
  }, [data_get_by_mount.data])

  React.useEffect(() => {
    const copy = [...folderPath]
    const newItemIndexInFolderPath = copy.indexOf(currentFolder)

    if (newItemIndexInFolderPath > -1) {
      const howManyItemsNeedToRemove = (copy.length - 1) - newItemIndexInFolderPath
      console.log(howManyItemsNeedToRemove)
      copy.splice(newItemIndexInFolderPath, howManyItemsNeedToRemove)
    }
    else {
      copy.push(currentFolder)
    }
    setFolderPath(copy)

    const joinedFoldersForRequest = copy.join('/')
    console.log(joinedFoldersForRequest)
    setOverlaidPlots({ name: '', folder_path: joinedFoldersForRequest })
    
    return () => setFolderPath([])
  }, [currentFolder, folderPath[folderPath.length - 1]]) // when the last folder in path is changed

  React.useEffect(() => {
    const joinedFoldersForRequest = folderPath.join('/')
    console.log(joinedFoldersForRequest)
    setOverlaidPlots({ name: '', folder_path: joinedFoldersForRequest })
  }, folderPath)

  const changeFolderPathByBreadcrumb = (parameters: ParsedUrlQueryInput) => {
    console.log(parameters)
    if (parameters.folder_path === '/') {
      setFolderPath([])
      setCurrentFolder('')
    }
    const folders = overlaidPlots.folder_path.split('/')
    setFolderPath(folders)
  }


  return (
    <Modal
      visible={visible}
      onCancel={() => {
        setOpenOverlayWithAnotherPlotModal(false)
        setFolderPath([])
      }}
    >
      <Row gutter={16}>
        <Col style={{ padding: 8 }}>
          <FolderPath folder_path={overlaidPlots.folder_path} changeFolderPathByBreadcrumb={changeFolderPathByBreadcrumb} />
        </Col>
        <Row style={{ width: '100%' }}>
          {
            data.map((folder_or_plot: any) => {
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
            })
          }
        </Row>
        <Row style={{ width: '100%' }}>
          {
            data.map((folder_or_plot: any) => {
              return (
                <>
                  {folder_or_plot.name &&
                    <Col span={8} onClick={() => setPlot(folder_or_plot)}>
                      <Button >{folder_or_plot.name}</Button>
                    </Col>
                  }
                </>
              )
            })
          }
        </Row>
      </Row>
    </Modal>
  )
}