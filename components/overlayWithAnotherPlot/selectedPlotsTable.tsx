import * as React from 'react';
import { Space } from 'antd';

import { PlotoverlaidSeparatelyProps } from '../../containers/display/interfaces';
import { StyledSelectedPlotsTable } from './styledComponents'

interface SelectedPlotsTableProps {
  overlaidPlots: PlotoverlaidSeparatelyProps;
  setSelectedPlots(plots: PlotoverlaidSeparatelyProps[]): void;
}

const addToSelectedPlots = (item: PlotoverlaidSeparatelyProps, allSelectedPlots: PlotoverlaidSeparatelyProps[]) => {
  if (allSelectedPlots.indexOf(item) === -1) {
    allSelectedPlots.push(item)
  }
  return allSelectedPlots.reverse()
}

const removeSelectedPlot = (item: PlotoverlaidSeparatelyProps, allSelectedPlots: PlotoverlaidSeparatelyProps[]) => {
  const copy = [...allSelectedPlots]
  const index = copy.indexOf(item)
  copy.splice(index, 1)
  return copy
}

export const SelectedPlotsTable = ({ overlaidPlots, setSelectedPlots }: SelectedPlotsTableProps,) => {
  const [selectedPlotsInfo, setSelectedPlotsInfo] = React.useState<PlotoverlaidSeparatelyProps[]>([])
  const colums = [
    {
      title: 'Folder Path',
      dataIndex: 'folder_path',
    },
    {
      title: 'Plot Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (plotInfo: PlotoverlaidSeparatelyProps) => (
        <Space size="small">
          <a
            onClick={() => {
              setSelectedPlotsInfo(removeSelectedPlot(plotInfo, selectedPlotsInfo))
              setSelectedPlots(removeSelectedPlot(plotInfo, selectedPlotsInfo))
            }}
          >Delete</a>
        </Space>
      ),
    },
  ]

  React.useEffect(() => {
    if (!!overlaidPlots.name) {
      const copy = [...selectedPlotsInfo]
      const changedPlotInfoArray = addToSelectedPlots(overlaidPlots, copy)
      setSelectedPlotsInfo(changedPlotInfoArray)
      setSelectedPlots(changedPlotInfoArray)
    }
    return () =>{
      setSelectedPlotsInfo([])
      setSelectedPlots([])
    }
  }, [overlaidPlots])

  return (selectedPlotsInfo.length > 0 ? <StyledSelectedPlotsTable
    pagination={
      {
        defaultPageSize: 1,
        pageSizeOptions: ['1', '2', '3', '4', '5'],
        showSizeChanger: true,
      }}
    columns={colums} dataSource={selectedPlotsInfo} />
    : <></>
  )
}