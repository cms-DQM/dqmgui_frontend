import * as React from 'react';
import { Button, Space, Tooltip } from 'antd';

import { PlotoverlaidSeparatelyProps } from '../../containers/display/interfaces';
import { StyledSelectedPlotsTable } from './styledComponents'

interface SelectedPlotsTableProps {
  overlaidPlots: PlotoverlaidSeparatelyProps;
  setSelectedPlots(plots: PlotoverlaidSeparatelyProps[]): void;
  default_overlay?: string[];
}

const addToSelectedPlots = (item: PlotoverlaidSeparatelyProps, allSelectedPlots: PlotoverlaidSeparatelyProps[]) => {
  if (allSelectedPlots.findIndex((selected_plot) => selected_plot.name === item.name && selected_plot.folder_path === item.folder_path)) {
    allSelectedPlots.push(item)
    return allSelectedPlots.reverse()
  }
  return allSelectedPlots
}

const removeSelectedPlot = (item: PlotoverlaidSeparatelyProps, allSelectedPlots: PlotoverlaidSeparatelyProps[]) => {
  const copy = [...allSelectedPlots]
  const index = copy.indexOf(item)
  copy.splice(index, 1)
  return copy
}

export const SelectedPlotsTable = ({ overlaidPlots, setSelectedPlots, default_overlay }: SelectedPlotsTableProps,) => {
  const default_plots_overlay = default_overlay ? default_overlay.map((overlay_string: string): PlotoverlaidSeparatelyProps => {
    const parts = overlay_string.split('/')
    const name = parts.pop() as string
    const folder_path = parts.join('/')
    return { name, folder_path }
  })
    : []
  const [selectedPlotsInfo, setSelectedPlotsInfo] = React.useState<PlotoverlaidSeparatelyProps[]>([])

  React.useEffect(() => {
    const copy = [...selectedPlotsInfo]
    default_plots_overlay.forEach((overlaid_plot) => {
      setSelectedPlotsInfo(addToSelectedPlots(overlaid_plot, copy))
    })
  }, [])

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
      render: (plotInfo: PlotoverlaidSeparatelyProps) => {
        const default_overlay_index = default_plots_overlay.findIndex((default_plot_overlay) => default_plot_overlay.name === plotInfo.name && default_plot_overlay.folder_path === plotInfo.folder_path)
       return( default_overlay_index !== -1 ?
        <Tooltip title="This plot is added because of layout configuration">
          <Space size="small">
            <Button
              type='link'
              disabled={true}
            >Delete</Button>
          </Space>
          </Tooltip>
          :
          <Space size="small">
            <Button
              type='link'
              disabled={default_overlay_index !== -1}
              onClick={() => {
                setSelectedPlotsInfo(removeSelectedPlot(plotInfo, selectedPlotsInfo))
                setSelectedPlots(removeSelectedPlot(plotInfo, selectedPlotsInfo))
              }}
            >Delete</Button>
          </Space>
        )
      },
    },
  ]

  React.useEffect(() => {
  if (!!overlaidPlots.name) {
    const copy = [...selectedPlotsInfo]
    const changedPlotInfoArray = addToSelectedPlots(overlaidPlots, copy)
    setSelectedPlotsInfo(changedPlotInfoArray)
    setSelectedPlots(changedPlotInfoArray)
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