import * as React from 'react';
import { Button, Space, Tooltip } from 'antd';

import { sizes } from '../components/constants';
import { root_url } from '../config/config';
import { PlotProperties } from './interfaces';
import { StyledSelectedPlotsTable } from './styledComponents';
import { setPlot } from './utils';
import { chooseApiForGettingPlotUrl } from '../api/utils';

interface PlotsNamesTableProps {
  plotNames: string[];
  setLastSelectedPlot: React.Dispatch<any>;
  lastSelectedPlot: any
  selectedPlots: PlotProperties[]
  dataset_name: string;
  run_number: string;
}

export const PlotsNamesTable = ({ plotNames, setLastSelectedPlot, selectedPlots, lastSelectedPlot, dataset_name, run_number }: PlotsNamesTableProps) => {
  const data = plotNames.map((name, index) => {
    return { key: index, plot_name: name }
  })
  const isProd = process.env.NODE_ENV === 'production'
  const parts = root_url.split('/')
  const index = parts.indexOf('plotsLocalOverlay')
  parts.splice(index, 1)
  const root = parts.join('/')

  const columns = [{
    title: 'Plot name',
    dataIndex: 'plot_name',
    key: 'plot_name',
    render: (plot_name: string) => {
      const current_plot = { folders_path: lastSelectedPlot.folders_path, plot_name }
      const disabledBecauseItsAlreadySelected = selectedPlots.findIndex((selectedPlot) =>
        selectedPlot.folders_path === current_plot.folders_path && selectedPlot.plot_name === current_plot.plot_name) > -1
      const disabledBecauseItsMorethan8IsSelected = selectedPlots.length >= 8
      const disabled = disabledBecauseItsAlreadySelected || disabledBecauseItsMorethan8IsSelected
      const title = disabledBecauseItsMorethan8IsSelected ? 'Cannot be selected more than 8 plots!' : disabledBecauseItsAlreadySelected ? 'This plot is already selected' : ''
      return (
        <Tooltip title={title}>
          <Button
            disabled={disabled}
            onClick={() => setLastSelectedPlot((setPlot(lastSelectedPlot, plot_name)))}
          >
            {plot_name}
          </Button >
        </Tooltip>)
    },
    sorter: (a: { plot_name: string, key: number }, b: { plot_name: string, key: number }) => {
      if (a.plot_name < b.plot_name) {
        return -1
      } if (a.plot_name > b.plot_name) {
        return 1
      }
      return 0
    },
    sortDirections: ['ascend'],
  },
  {
    title: 'Action',
    dataIndex: 'plot_name',
    key: 'plot_name',
    render: (plot: string) => {
      const params ={run_number, dataset_name, folders_path: lastSelectedPlot.folders_path,  plot_name: encodeURIComponent(plot), height: sizes.small.size.h, width: sizes.small.size.w}
      const src = chooseApiForGettingPlotUrl(params as any)
      return(
        <Tooltip title={<img src={`${root}${isProd ? '' : '/'}${src}`}/>}>
        <Space size="small">
          <a>Show plot</a>
        </Space>
      </Tooltip>
      )}
  },
  ]

  return (
    <StyledSelectedPlotsTable
     columns={columns as any} dataSource={data} />
  )

}