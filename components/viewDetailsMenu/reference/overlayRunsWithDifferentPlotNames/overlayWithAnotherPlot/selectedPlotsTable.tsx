import * as React from 'react';
import { Button, Space, Tooltip, Input } from 'antd';

import { PlotDataProps, PlotoverlaidSeparatelyProps } from '../../../../../containers/display/interfaces';
import { StyledSelectedPlotsTable } from './styledComponents'
import { addToSelectedPlots, removeSelectedPlot, setLabel } from './utils';

interface SelectedPlotsTableProps {
  overlaidPlots: PlotoverlaidSeparatelyProps;
  setSelectedPlots(plots: PlotoverlaidSeparatelyProps[]): void;
  default_overlay?: string[];
  plot: PlotDataProps;
}

export const SelectedPlotsTable = ({ overlaidPlots, setSelectedPlots, default_overlay, plot }: SelectedPlotsTableProps,) => {
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
    plot.overlaidSeparately?.plots.forEach((overlaid_plot) => {
      setSelectedPlotsInfo(addToSelectedPlots(overlaid_plot, copy))
    })
    setSelectedPlots(selectedPlotsInfo)
  }, [])

  const colums = [
    // {
    //   title: 'Run number',
    //   dataIndex: 'run_number',
    // },{
    //   title: 'Data set',
    //   dataIndex: 'data_set',
    // },
    {
      title: 'Folder Path',
      dataIndex: 'folder_path',
    },
    {
      title: 'Plot Name',
      dataIndex: 'name',
    },
    {
      title: 'Label',
      render: (plotInfo: PlotoverlaidSeparatelyProps) => {
        const set_label = ({ target: { value } }) => {
          setLabel(plotInfo, selectedPlotsInfo, value)
        }

        return <Input
          id={plotInfo.folder_path + plotInfo.name}
          name={plotInfo.folder_path + plotInfo.name}
          placeholder="label"
          value={plotInfo.label}
          onChange={set_label}
        />
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (plotInfo: PlotoverlaidSeparatelyProps) => {
        const default_overlay_index = default_plots_overlay.findIndex((default_plot_overlay) => default_plot_overlay.name === plotInfo.name && default_plot_overlay.folder_path === plotInfo.folder_path)
        return (default_overlay_index !== -1 ?
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