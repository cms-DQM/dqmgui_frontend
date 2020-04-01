import { FC, useReducer } from 'react';
import Link from 'next/link';

import { useRequest } from '../../hooks/useRequest';
import { Plot } from './plot';
import { ParamsForApiProps } from './interfaces'
import { OverlaidPlot } from './overlaidPlots';
import { ZoomedPlots } from '../../components/zoomedPlots/zoomedPlots';
import { displayFolderOrPlotComponentReducer, initialState, setSelectedPlotsName, removePlotFromList, addPlotToList } from '../../reducers/displayFolderOrPlot';
import { ViewDetailsMenu } from '../../components/viewDetailsMenu';

interface DirectoryInterface {
  subdir: string;
}

interface PlotInterface {
  obj: string,
}

interface FolderProps {
  folder_path?: string;
  run_number: number;
  dataset_name: string;
}

const isPlotExists = (contents: (PlotInterface | DirectoryInterface)[]) => contents.filter((one_item: (PlotInterface | DirectoryInterface)) => one_item.hasOwnProperty('obj'))

// what is streamerinfo? (coming from api, we don't know what it is, so we filtered it out)
const getContents = (data: any) => data ?
  data.contents.filter((one_item: (PlotInterface | DirectoryInterface)) => !one_item.hasOwnProperty('streamerinfo'))
  : []

const DiplayFolder: FC<FolderProps> = ({
  folder_path,
  run_number,
  dataset_name
}) => {
  const [state, dispatch] = useReducer(displayFolderOrPlotComponentReducer, initialState);
  const { errorBars, overlay, height, width, normalize, overlay_plot, stats, selected_plots_name } = state

  const removePlot = (plot_name: string) => {
    removePlotFromList(plot_name)(state, dispatch)
  }

  const addPlot = (plot_name: string) => {
    addPlotToList(plot_name)(state, dispatch)
  }


  const { data, error, isLoading } = useRequest(
    `/data/json/archive/${run_number}${dataset_name}${folder_path}`,
    {},
    [folder_path]
  );

  const contents: (PlotInterface & DirectoryInterface)[] = getContents(data)

  const params_for_api: ParamsForApiProps = {
    overlay_plot: overlay_plot,
    run_number: run_number,
    folders_path: folder_path,
    dataset_name: dataset_name,
    width: width,
    height: height,
    overlay: overlay,
    stats: stats,
    normalize: normalize,
    errorBars: errorBars
  }
  const windows_width = selected_plots_name ? '50%' : '100%'

  return (
    <>
      <div >
        folder path: {folder_path}, {run_number}, {dataset_name}
      </div>{
        isPlotExists(contents).length > 0 &&
        <ViewDetailsMenu dispatch={dispatch} />
      }
      <div style={{ width: `${windows_width}` }} id="aa">
        {contents.map((directory_or_plot) => {
          const directory_name = directory_or_plot?.subdir
          const plot_name = directory_or_plot?.obj

          return (
            <li key={directory_name || plot_name}>
              {directory_name ?
                <Link
                  href={{
                    pathname: '/',
                    query: {
                      run_number: run_number,
                      dataset_name: dataset_name,
                      folder_path: `${folder_path}/${directory_name}`
                    }
                  }}
                >
                  <a>{directory_name}</a>
                </Link>
                : overlay_plot.length > 0 ?
                  <OverlaidPlot
                    plot_name={plot_name}
                    params_for_api={params_for_api}
                    addPlotToList={addPlot}
                    dispatch={dispatch}
                  />
                  :
                  <Plot
                    plot_name={plot_name}
                    params_for_api={params_for_api}
                    addPlotToList={addPlot}
                    dispatch={dispatch}
                  />
              }
            </li>
          )
        }
        )}
      </div>
      {selected_plots_name.length > 0 &&
        <div style={{ width: `${windows_width}` }}>
          <ZoomedPlots
            selected_plots_name={selected_plots_name}
            params_for_api={params_for_api}
            removePlotFromList={removePlot}
            jsroot_mode={state.jsroot_mode}
          />
        </div>
      }
    </>
  );
};

export default DiplayFolder;
