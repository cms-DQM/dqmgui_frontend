import * as React from 'react';
import { Input, Space } from 'antd';

import { PlotoverlaidSeparatelyProps } from '../containers/display/interfaces';
import { StyledSelectedPlotsTable } from './styledComponents'
import { setLabel } from './utils'

interface SelectedPlotsTableProps {
  lastSelectedPlot: PlotoverlaidSeparatelyProps;
  setSelectedPlots(plots: PlotoverlaidSeparatelyProps[]): void;
  selectedPlots: PlotoverlaidSeparatelyProps[];
}

const addToSelectedPlots = (item: PlotoverlaidSeparatelyProps, allSelectedPlots: PlotoverlaidSeparatelyProps[],) => {
  if (allSelectedPlots.indexOf(item) === -1) {
    allSelectedPlots.push(item)
  }
  return allSelectedPlots
}

const removeSelectedPlot = (item: PlotoverlaidSeparatelyProps, allSelectedPlots: PlotoverlaidSeparatelyProps[]) => {
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
      title: 'Action',
      key: 'action',
      render: (plotInfo: PlotoverlaidSeparatelyProps) => (
        <Space size="small">
          <a
            onClick={() => {
              setSelectedPlots(removeSelectedPlot(plotInfo, selectedPlots))
            }}
          >Delete</a>
        </Space>
      ),
    },
    {
      title: 'Label',
      render: (plot: PlotoverlaidSeparatelyProps) => {
        const set_label = ({ target: { value } }) => {
          const plotsWithLabels = setLabel(plot, selectedPlots, value)
          console.log('ss s', value)
          setSelectedPlots(plotsWithLabels)
        }
        return <Input
          id={plot.folder_path + plot.name}
          name={plot.folder_path + plot.name}
          placeholder="label"
          value={plot.label}
          onChange={set_label}
        />
      }
    },
  ]

  React.useEffect(() => {
    if (!!lastSelectedPlot.plot_name) {
      const copy = [...selectedPlots]
      const changedPlotInfoArray = addToSelectedPlots(lastSelectedPlot, copy)
      console.log(changedPlotInfoArray)
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