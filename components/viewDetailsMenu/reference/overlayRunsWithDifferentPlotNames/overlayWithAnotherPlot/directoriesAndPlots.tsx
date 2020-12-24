import * as React from 'react'
import { Col } from 'antd'

import { Icon, StyledA } from '../../../../../containers/display/styledComponents'
import { Spinner } from '../../../../../containers/search/styledComponents'
import { FoldersRow, PlotsRow, SpinnerRow } from './styledComponents'
import { PlotButton } from './plotButton'
import { PlotoverlaidSeparatelyProps } from '../../../../../containers/display/interfaces'
import { ReturnRequest } from '../../../../../hooks/useRequest'

interface DirectoriesAndPlotsProps {
  data_get_by_mount: ReturnRequest;
  directories: string[];
  setCurrentFolder: (value: React.SetStateAction<string | undefined>) => void;
  plots_names: string[];
  theLastSelectedPlot: PlotoverlaidSeparatelyProps;
  selectedPlots: PlotoverlaidSeparatelyProps[],
  setTheLastSelectedPlot: React.Dispatch<React.SetStateAction<PlotoverlaidSeparatelyProps>>
  selectedPlotsToTable: PlotoverlaidSeparatelyProps[];
}

export const DirectoriesAndPlots = ({
  data_get_by_mount,
  directories,
  theLastSelectedPlot,
  plots_names,
  selectedPlots,
  setCurrentFolder,
  setTheLastSelectedPlot,
  selectedPlotsToTable }: DirectoriesAndPlotsProps) => {

  return <>
    {
      !data_get_by_mount.isLoading &&
      <FoldersRow>
        {directories.map((directory: any) => {
          return (
            <>
              {directory &&
                <Col span={8} onClick={() => setCurrentFolder(directory)}>
                  <Icon />
                  <StyledA>{directory}</StyledA>
                </Col>
              }
            </>
          )
        })}
      </FoldersRow>
    }
    {data_get_by_mount.isLoading &&
      <SpinnerRow>
        <Spinner />
      </SpinnerRow>
    }
    {
      <PlotsRow gutter={16}>{
        !data_get_by_mount.isLoading && plots_names.map((plot_name: any) => {
          const current_plot = { folder_path: theLastSelectedPlot.folder_path, name: plot_name }
          const selectedAndSelectedToTablePlots = selectedPlotsToTable.concat(selectedPlots)
          const disabled = selectedAndSelectedToTablePlots.findIndex((selectedPlot) =>
            selectedPlot.folder_path === current_plot.folder_path && selectedPlot.name === current_plot.name) > -1
          return (
            <>
              {plot_name &&
                <PlotButton
                  disabled={disabled}
                  setTheLastSelectedPlot={setTheLastSelectedPlot}
                  theLastSelectedPlot={theLastSelectedPlot}
                  plot_name={plot_name} />
              }
            </>
          )
        })
      }
      </PlotsRow>
    }
  </>
}