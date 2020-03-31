import { FC, useReducer } from 'react';
import Link from 'next/link';

import { useRequest } from '../../hooks/useRequest';
import { Plot } from './plot';
import { Reference } from '../../components/reference';
import { ParamsForApiProps } from './interfaces'
import { FOLDERS_OR_PLOTS_REDUCER } from '../../components/constants';
import { OverlaidPlot } from './overlaidPlots';
import { SizeChanger } from '../../components/sizeChanger';
import { ZoomedPlots } from '../../components/zoomedPlots';
import { ViewFiler } from '../../components/viewFilter';
import { displayFolderOrPlotComponentReducer, initialState } from '../../reducers/displayFolderOrPlot';

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

const DiplayFolder: FC<FolderProps> = ({
  folder_path,
  run_number,
  dataset_name
}) => {
  const [state, dispatch] = useReducer(displayFolderOrPlotComponentReducer, initialState);
  const { errorBars, overlay, height, width, normalize, overlay_plot, stats, selected_plots_name } = state

  const removePlotFromList = (plot_name: string) => {
    const copy = [...selected_plots_name]
    const filtered = copy.filter((plot: string) => plot !== plot_name)
    dispatch({
      type: FOLDERS_OR_PLOTS_REDUCER.SET_SELECTED_PLOTS_NAMES,
      payload: filtered
    })

  }

  const addPlotFromList = (plot_name: string) => {
    const copy = [...selected_plots_name]
    copy.push(plot_name)
    dispatch({
      type: FOLDERS_OR_PLOTS_REDUCER.SET_SELECTED_PLOTS_NAMES,
      payload: copy
    })
  }

  const { data, error, isLoading } = useRequest(
    `/data/json/archive/${run_number}${dataset_name}${folder_path}`,
    {},
    [folder_path]
  );

  // what is streamerinfo? (coming from api, we don't know what it is, so we filtered it out)
  const contents: (PlotInterface & DirectoryInterface)[] = data ?
    data.contents.filter((one_item: (PlotInterface | DirectoryInterface)) => !one_item.hasOwnProperty('streamerinfo'))
    : []
  const isPlotExists = contents.filter((one_item: (PlotInterface | DirectoryInterface)) => one_item.hasOwnProperty('obj'))

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
        isPlotExists.length > 0 &&
        <>
          <Reference
            dispatch={dispatch}
          />
          <ViewFiler
            dispatch={dispatch}
          />

          <SizeChanger dispatch={dispatch} />
        </>
      }
      <div style={{ width: `${windows_width}` }}>
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
                : overlay_plot ?
                  <OverlaidPlot
                    plot_name={plot_name}
                    params_for_api={params_for_api}
                    addPlotFromList={addPlotFromList}
                    set_selected_plots_names={dispatch}
                  />
                  :
                  <Plot
                    plot_name={plot_name}
                    params_for_api={params_for_api}
                    addPlotFromList={addPlotFromList}
                    set_selected_plots_names={dispatch}
                  />
              }
            </li>
          )
        }
        )}
      </div>
      {selected_plots_name &&
        <div style={{ width: `${windows_width}` }}>
          <ZoomedPlots
            selected_plots_name={selected_plots_name}
            params_for_api={params_for_api}
            removePlotFromList={removePlotFromList}
          />
        </div>
      }
    </>
  );
};

export default DiplayFolder;
