import * as React from 'react';
import { Input, Space } from 'antd';

import { StyledSelectedPlotsTable } from './styledComponents'
import { setLabel } from './utils'
import { PlotProperties } from './interfaces';
import { ParsedUrlQuery } from 'querystring';
import cleanDeep from 'clean-deep';

interface SelectedPlotsTableProps {
  lastSelectedPlot: PlotProperties;
  setSelectedPlots(plots: PlotProperties[]): void;
  selectedPlots: PlotProperties[];
  query: ParsedUrlQuery
}

const addToSelectedPlots = (item: PlotProperties, allSelectedPlots: PlotProperties[],) => {
  if (allSelectedPlots.indexOf(item) === -1) {
    allSelectedPlots.push(item)
  }
  return allSelectedPlots
}

const removeSelectedPlot = (item: PlotProperties, allSelectedPlots: PlotProperties[]) => {
  const copy = [...allSelectedPlots]
  const index = copy.indexOf(item)
  copy.splice(index, 1)
  return copy
}

export const SelectedPlotsTable = ({ lastSelectedPlot, setSelectedPlots, selectedPlots, query }: SelectedPlotsTableProps,) => {
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
      render: (plot: PlotProperties) => {
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
      render: (plot: PlotProperties) => (
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
    if (query.overlayPlots) {
      const plots = (query.overlayPlots as string).split('&')
      const formattedSelectedPlotObjects: PlotProperties[] = plots.map((plot: string) => {
        const labelAndOtherPart = plot.split('reflabel=')
        const label = labelAndOtherPart.length === 2 ? labelAndOtherPart[1] : ''
        const parts = labelAndOtherPart[0].split('/')
        const plot_name = parts.pop() as string
        const folders_path = cleanDeep(parts).join('/')
        const finalObject: PlotProperties = { folders_path, plot_name, label }
        return finalObject
      })
      setSelectedPlots(formattedSelectedPlotObjects)
    }
  }, [])

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