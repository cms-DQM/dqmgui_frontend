import React, { FC, useReducer } from 'react';
import Link from 'next/link';
import { Col } from 'antd';

import { useRequest } from '../../hooks/useRequest';
import { Plot } from './plot';
import { ParamsForApiProps } from './interfaces';
import { OverlaidPlot } from './overlaidPlot';
import { ZoomedPlots } from '../../components/zoomedPlots/';
import {
  displayFolderOrPlotComponentReducer,
  initialState,
  removePlotFromList,
  addPlotToList,
} from '../../reducers/displayFolderOrPlot';
import { ViewDetailsMenu } from '../../components/viewDetailsMenu';
import { Icon, DirecotryWrapper, StyledA, Wrapper } from './styledComponents';
import { FolderPath } from './folderPath';
import { StyledRow } from './styledComponents';

interface DirectoryInterface {
  subdir: string;
}

interface PlotInterface {
  obj: string;
}

interface FolderProps {
  folder_path?: string;
  run_number: number;
  dataset_name: string;
}

const doesPlotExists = (contents: (PlotInterface & DirectoryInterface)[]) =>
  contents.filter((one_item: PlotInterface | DirectoryInterface) =>
    one_item.hasOwnProperty('obj')
  );

// what is streamerinfo? (coming from api, we don't know what it is, so we filtered it out)
const getContents = (data: any) =>
  data
    ? data.contents.filter(
      (one_item: PlotInterface | DirectoryInterface) =>
        !one_item.hasOwnProperty('streamerinfo')
    )
    : [];

const DiplayFolder: FC<FolderProps> = ({
  folder_path,
  run_number,
  dataset_name,
}) => {
  const [state, dispatch] = useReducer(
    displayFolderOrPlotComponentReducer,
    initialState
  );
  const {
    errorBars,
    overlay,
    height,
    width,
    normalize,
    overlay_plot,
    stats,
    selected_plots_name,
  } = state;

  const removePlot = (plot_name: string) => {
    removePlotFromList(plot_name)(state, dispatch);
  };

  const addPlot = (plot_name: string) => {
    addPlotToList(plot_name)(state, dispatch);
  };

  const {
    data,
  } = useRequest(
    `/data/json/archive/${run_number}${dataset_name}${folder_path}`,
    {},
    [folder_path]
  );

  const contents: (PlotInterface & DirectoryInterface)[] = getContents(data);

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
    errorBars: errorBars,
  };
  return (
    <>
      <div>
        <FolderPath folder_path={folder_path} />
        {/* folder path: {folder_path}, {run_number}, {dataset_name} */}
      </div>
      {doesPlotExists(contents).length > 0 && (
        <ViewDetailsMenu dispatch={dispatch} state={state} overlay_plot={overlay_plot} />
      )}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Wrapper zoomed={selected_plots_name.length}>
          <StyledRow>
            {contents.map((directory_or_plot) => {
              const directory_name = directory_or_plot?.subdir;
              const plot_name = directory_or_plot?.obj;

              return (
                <>
                  {directory_name ? (
                    <Col span={4} key={directory_name || plot_name}>
                      <DirecotryWrapper>
                        <Icon />
                        <Link
                          href={{
                            pathname: '/',
                            query: {
                              run_number: run_number,
                              dataset_name: dataset_name,
                              folder_path: `${folder_path}/${directory_name}`,
                            },
                          }}
                        >
                          <StyledA>{directory_name}</StyledA>
                        </Link>
                      </DirecotryWrapper>
                    </Col>
                  ) : overlay_plot.length > 0 ? (
                    <OverlaidPlot
                      plot_name={plot_name}
                      params_for_api={params_for_api}
                      addPlotToList={addPlot}
                      dispatch={dispatch}
                      selected_plots_name={selected_plots_name}
                    />
                  ) : (
                        <Plot
                          plot_name={plot_name}
                          params_for_api={params_for_api}
                          addPlotToList={addPlot}
                          dispatch={dispatch}
                          selected_plots_name={selected_plots_name}
                        />
                      )}
                </>
              );
            })}
          </StyledRow>
        </Wrapper>
        {selected_plots_name.length > 0 && (
          <Wrapper style={{ borderLeft: '1px solid' }} zoomed={selected_plots_name.length}>
            {/* <div > */}
              <ZoomedPlots
                selected_plots_name={selected_plots_name}
                params_for_api={params_for_api}
                removePlotFromList={removePlot}
                jsroot_mode={state.jsroot_mode}
              />
            {/* </div> */}
          </Wrapper>
        )}
      </div>
    </>
  );
};

export default DiplayFolder;
