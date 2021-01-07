import * as React from 'react';
import { Input, Space } from 'antd';

import { PlotProps } from '../containers/display/interfaces';
import { StyledSelectedPlotsTable } from './styledComponents'
import { setLabel } from './utils'

interface SelectedPlotsTableProps {
  lastSelectedPlot: PlotProps;
  setSelectedPlots(plots: PlotProps[]): void;
  selectedPlots: PlotProps[];
}

const addToSelectedPlots = (item: PlotProps, allSelectedPlots: PlotProps[],) => {
  if (allSelectedPlots.indexOf(item) === -1) {
    allSelectedPlots.push(item)
  }
  return allSelectedPlots
}

const removeSelectedPlot = (item: PlotProps, allSelectedPlots: PlotProps[]) => {
  const copy = [...allSelectedPlots]
  const index = copy.indexOf(item)
  copy.splice(index, 1)
  return copy
}

export const SelectedPlotsTable = ({ lastSelectedPlot, setSelectedPlots, selectedPlots }: SelectedPlotsTableProps,) => {
  const colums = [
    {
      title: 'Folder Path',
      dataIndex: 'folders_path',
    },
    {
      title: 'Plot Name',
      dataIndex: 'plot_name',
    },
    {
      title: 'Label',
      render: (plot: PlotProps) => {
        const set_label = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
          const plotsWithLabels = setLabel(plot, selectedPlots, value)
          setSelectedPlots(plotsWithLabels)
        }
        if (plot.folders_path && plot.plot_name)
          return <Input
            id={plot.folders_path + plot.plot_name}
            name={plot.folders_path + plot.plot_name}
            placeholder="label"
            value={plot.label}
            onChange={set_label}
          />
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (plot: PlotProps) => (
        <Space size="small">
          <a
            onClick={() => {
              setSelectedPlots(removeSelectedPlot(plot, selectedPlots))
            }}
          >Delete</a>
        </Space>
      ),
    },
  ]

  React.useEffect(() => {
    if (!!lastSelectedPlot && lastSelectedPlot.plot_name) {
      const copy = [...selectedPlots]
      const changedPlotInfoArray = addToSelectedPlots(lastSelectedPlot, copy)
      setSelectedPlots(changedPlotInfoArray)
    }
  }, [lastSelectedPlot])

  return (selectedPlots.length > 0 ? <StyledSelectedPlotsTable
    pagination={
      {
        defaultPageSize: 1,
        pageSizeOptions: ['1', '2', '3', '4', '5'],
        showSizeChanger: true,
      }}
    columns={colums} dataSource={selectedPlots} />
    : <></>
  )
}