import * as React from 'react';
import { Button, Input, Space, Tooltip } from 'antd';

import { StyledSelectedPlotsTable } from './styledComponents'
import { setLabel } from './utils'
import { PlotProperties } from './interfaces';
import { ParsedUrlQuery } from 'querystring';
import cleanDeep from 'clean-deep';

interface SelectedPlotsTableProps {
  lastSelectedPlot: PlotProperties;
  setSelectedPlots(plots: PlotProperties[]): void;
  selectedPlots: PlotProperties[];
  query: ParsedUrlQuery;
  overlaidGlobally: any[]
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

export const SelectedPlotsTable = ({ lastSelectedPlot, setSelectedPlots, selectedPlots, query, overlaidGlobally }: SelectedPlotsTableProps,) => {
  const colums = [
    {
      title: 'Run',
      dataIndex: 'run_number',
    },
    {
      title: 'Dataset name',
      dataIndex: 'dataset_name',
    },
    {
      title: 'Path',
      dataIndex: 'folders_path',
    },
    {
      title: 'Plot Name',
      dataIndex: 'plot_name',
    },
    {
      title: 'Label',
      // dataIndex: 'label',
      render: (plot: PlotProperties) => {
        const set_label = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
          const plotsWithLabels = setLabel(plot, selectedPlots, encodeURI(value))
          setSelectedPlots(plotsWithLabels)
        }
        if (plot.folders_path && plot.plot_name)
          return <Input
            id={plot.folders_path + plot.plot_name}
            defaultValue={plot.label}
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
      render: (plot: PlotProperties) => {
        const isGloballyOverlaid = overlaidGlobally.findIndex(globallyOverlaidPlot => globallyOverlaidPlot.plot_name === plot.plot_name &&
          globallyOverlaidPlot.folders_path === plot.folders_path &&
          globallyOverlaidPlot.dataset_name === plot.dataset_name &&
          globallyOverlaidPlot.run_number === plot.run_number
        )
        const disabled = isGloballyOverlaid > -1
        return <Space size="small">
          <Tooltip title={disabled ? 'Plot overlaid by default' : ''} >
            <Button
              type='link'
              disabled={disabled}
              onClick={() => {
                setSelectedPlots(removeSelectedPlot(plot, selectedPlots))
              }}
            >Delete</Button>
          </Tooltip>
        </Space>
      }
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

  React.useEffect(() => {
    const globallyAndLocallyOverlaidPlots = overlaidGlobally.filter(globallyOverlaidPlot => {
      const alreadyIncludes = selectedPlots.includes(globallyOverlaidPlot)
      if(!alreadyIncludes){
        return globallyOverlaidPlot
      }
    })
    const dataSource = globallyAndLocallyOverlaidPlots.concat(selectedPlots)
    setSelectedPlots(dataSource)
  }, [query.overlaidGlobally])

  return (selectedPlots.length > 0 ? <StyledSelectedPlotsTable
    pagination={
      {
        defaultPageSize: 1,
        pageSizeOptions: ['1', '2', '3', '4', '5'],
        showSizeChanger: true,
      }}
    columns={colums} dataSource={selectedPlots.reverse()} />
    : <></>
  )
}