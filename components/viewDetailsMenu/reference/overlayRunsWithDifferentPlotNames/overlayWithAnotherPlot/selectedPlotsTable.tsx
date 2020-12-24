import * as React from 'react';
import { Button, Space, Tooltip, Input } from 'antd';

import { PlotDataProps, PlotoverlaidSeparatelyProps } from '../../../../../containers/display/interfaces';
import { StyledSelectedPlotsTable } from './styledComponents'
import { addToSelectedPlots, removeSelectedPlot, setLabel } from './utils';

interface SelectedPlotsTableProps {
  theLastSelectedPlot: PlotoverlaidSeparatelyProps;
  setSelectedPlots(plots: PlotoverlaidSeparatelyProps[]): void;
  default_overlay?: string[];
  plot: PlotDataProps;
  globallyOverlaid?: PlotoverlaidSeparatelyProps[];
  selectedPlotsToTable: PlotoverlaidSeparatelyProps[],
  setSelectedPlotsToTable: React.Dispatch<React.SetStateAction<PlotoverlaidSeparatelyProps[]>>
}

const getTitle = (default_overlay_index: number, globally_overlay_index: number) => {
  if (default_overlay_index !== -1) {
    return ("This plot is added because of layout configuration")
  } else if (globally_overlay_index !== -1) {
    return ("This plot is added because of global overlay in 'Options' section")
  }
  return ''
}
export const SelectedPlotsTable = ({
  theLastSelectedPlot,
  setSelectedPlots,
  default_overlay, plot,
  globallyOverlaid,
  selectedPlotsToTable,
  setSelectedPlotsToTable,
   }: SelectedPlotsTableProps,) => {
  const default_plots_overlay = default_overlay ? default_overlay.map((overlay_string: string): PlotoverlaidSeparatelyProps => {
    const parts = overlay_string.split('/')
    const name = parts.pop() as string
    const folder_path = parts.join('/')
    return { name, folder_path }
  })
    : []

  const colums = [
    {
      title: 'Run number',
      dataIndex: 'run_number',
    }, {
      title: 'Dataset',
      dataIndex: 'dataset_name',
    },
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
          setLabel(plotInfo, selectedPlotsToTable, value)
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
        const globally_overlay_index = globallyOverlaid ? globallyOverlaid.findIndex((gloablly_plot_overlay) => gloablly_plot_overlay.name === plotInfo.name && gloablly_plot_overlay.folder_path === plotInfo.folder_path) : -1
        const title = getTitle(default_overlay_index, globally_overlay_index)
        return (!!title ?
          <Tooltip title={title}>
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
              disabled={!!title}
              onClick={() => {
                setSelectedPlotsToTable(removeSelectedPlot(plotInfo, selectedPlotsToTable))
                setSelectedPlots(removeSelectedPlot(plotInfo, selectedPlotsToTable))
              }}
            >Delete</Button>
          </Space>
        )
      },
    },
  ]

  React.useEffect(() => {
    if (!!theLastSelectedPlot.name) {
      const copy = [...selectedPlotsToTable]
      const changedPlotInfoArray = addToSelectedPlots(theLastSelectedPlot, copy)
      setSelectedPlotsToTable(changedPlotInfoArray)
    }
  }, [theLastSelectedPlot])
  
  return (selectedPlotsToTable.length > 0 ? <StyledSelectedPlotsTable
    pagination={
      {
        defaultPageSize: 1,
        pageSizeOptions: ['1', '2', '3', '4', '5'],
        showSizeChanger: true,
      }}
    columns={colums} dataSource={selectedPlotsToTable} />
    : <></>
  )
}