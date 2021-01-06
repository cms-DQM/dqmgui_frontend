import * as React from 'react';
import { Button, Space, Tooltip, Input } from 'antd';

import { ParamsForApiProps, PlotDataProps, PlotoverlaidSeparatelyProps } from '../../../../../containers/display/interfaces';
import { StyledSelectedPlotsTable } from './styledComponents'
import { addToSelectedPlots, removeSelectedPlot, setLabel } from './utils';

interface SelectedPlotsTableProps {
  theLastSelectedPlot: PlotoverlaidSeparatelyProps;
  setSelectedPlots(plots: PlotoverlaidSeparatelyProps[]): void;
  default_overlay?: string[];
  plot: PlotDataProps;
  selectedPlotsToTable: PlotoverlaidSeparatelyProps[],
  setSelectedPlotsToTable: React.Dispatch<React.SetStateAction<PlotoverlaidSeparatelyProps[]>>
  visible: boolean;
  params_for_api: ParamsForApiProps;
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
  selectedPlotsToTable,
  setSelectedPlotsToTable,
  params_for_api,
  visible
}: SelectedPlotsTableProps,) => {

  const default_plots_overlay = default_overlay ? default_overlay.map((overlay_string: string): PlotoverlaidSeparatelyProps => {
    const parts = overlay_string.split('/')
    const name = parts.pop() as string
    const folder_path = parts.join('/')
    return { name, folder_path }
  })
    : []

  const globallyOverlaid: PlotoverlaidSeparatelyProps[] = params_for_api.overlay_plot ? params_for_api.overlay_plot.map((plot) => {
    const { run_number, dataset_name, label } = plot
    const folder_path = params_for_api.folders_path
    const name = params_for_api.plot_name
    return {
      run_number,
      dataset_name: dataset_name.slice(1, dataset_name.length),
      folder_path,
      name,
      label
    } as PlotoverlaidSeparatelyProps
  }) : []

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

  React.useEffect(() => {
    if (visible) {
      if (params_for_api.overlaidSeparately) {
        const gloabllyOverlaidNotDuplicated: PlotoverlaidSeparatelyProps[] = globallyOverlaid
        if (gloabllyOverlaidNotDuplicated && gloabllyOverlaidNotDuplicated?.length > 0) {
          plot.overlaidSeparately?.plots.forEach((one_plot) => {
            const index = gloabllyOverlaidNotDuplicated.findIndex(globally_overlaid =>
              globally_overlaid.run_number === one_plot.run_number
              && globally_overlaid.dataset_name === one_plot.dataset_name
              && globally_overlaid.folder_path === one_plot.folder_path
              && globally_overlaid.name === one_plot.name
            )
            if (index < 0) {
              return gloabllyOverlaidNotDuplicated.push(one_plot)
            }
            return undefined
          })
        }
        setSelectedPlotsToTable(gloabllyOverlaidNotDuplicated)
      }
      else if (!params_for_api.overlaidSeparately && globallyOverlaid && globallyOverlaid?.length > 0) {
        setSelectedPlotsToTable(globallyOverlaid)
      } else if (!params_for_api.overlaidSeparately && globallyOverlaid && globallyOverlaid?.length === 0) {
        setSelectedPlotsToTable([])
      }
    }
    else {
      setSelectedPlotsToTable([])
    }
  }, [visible])


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