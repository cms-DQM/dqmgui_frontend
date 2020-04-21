import React, { FC, useReducer } from 'react';
import Link from 'next/link';
import { Col } from 'antd';
import _ from 'lodash';

import { useRequest } from '../../hooks/useRequest';
import { Plot } from '../../components/plots/plot/plot';
import { ParamsForApiProps } from './interfaces';
import { OverlaidPlot } from '../../components/plots/overlaidPlot';
import { ZoomedPlots } from '../../components/zoomedPlots/';
import {
  displayFolderOrPlotComponentReducer,
  initialState,
  removePlotFromList,
  addPlotToList,
  toggleWorkspaceMenu,
} from '../../reducers/displayFolderOrPlot';
import { ViewDetailsMenu } from '../../components/viewDetailsMenu';
import {
  Icon,
  DirecotryWrapper,
  StyledA,
  Wrapper,
  StyledRowImages,
  DivWrapper,
} from './styledComponents';
import { FolderPath } from './folderPath';
import { Shortcut } from './shortcut'
import { StyledRow } from './styledComponents';
import { isPlotSelected, filterDirestoriesByWorkspace } from './utils';
import cleanDeep from 'clean-deep';
import { SpinnerWrapper, Spinner } from '../search/styledComponents';
import { StyledButton } from '../../components/styledComponents';
import { toggleModal } from '../../reducers/reference';
import { Workspaces } from '../../components/workspaces';
import { worspaces } from '../../workspaces/offline';

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
    ? _.sortBy(
      data.contents.filter(
        (one_item: PlotInterface | DirectoryInterface) =>
          !one_item.hasOwnProperty('streamerinfo')
      ),
      ['subdir']
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

  console.log(state);
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
    if (selected_plots_name.indexOf(plot_name) < 0) {
      addPlotToList(plot_name)(state, dispatch);
    }
  };

  const {
    data,
    isLoading,
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

  const directories = cleanDeep(
    contents.map((content: DirectoryInterface) => content.subdir)
  );

  console.log(filterDirestoriesByWorkspace('', state.workspace.label))
  const plots = cleanDeep(
    contents.map((content: PlotInterface) => content.obj)
  );

  return (
    <>
      <Workspaces visible={state.worskpaceMenu} dispatch={dispatch} />
      <div>
        <div>
          <Shortcut
            run_number={run_number}
            dataset_name={dataset_name} />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <a
              onClick={() => {
                toggleWorkspaceMenu(!state.worskpaceMenu)(dispatch);
              }}>Workspaces:</a>
            <div style={{ width: 'fit-content', paddingLeft: '8px' }}>{state.workspace.label}</div>
          </div>
          <FolderPath folder_path={folder_path} />
        </div>
        {doesPlotExists(contents).length > 0 && (
          <ViewDetailsMenu
            dispatch={dispatch}
            state={state}
            overlay_plot={overlay_plot}
          />
        )}
        <DivWrapper>
          <Wrapper zoomed={selected_plots_name.length} noBorder>
            {isLoading ? (
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
            ) : (
                <>
                  <StyledRow>
                    {directories.map((directory_name: any) => (
                      <Col span={4} key={directory_name}>
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
                    ))}
                  </StyledRow>
                  <StyledRowImages>
                    {plots.map((plot_name: any) => (
                      <Col key={plot_name}>
                        {overlay_plot.length > 0 ? (
                          <OverlaidPlot
                            plot_name={plot_name}
                            params_for_api={params_for_api}
                            addPlotToList={addPlot}
                            dispatch={dispatch}
                            removePlotFromList={removePlot}
                            isPlotSelected={isPlotSelected(
                              selected_plots_name,
                              plot_name
                            )}
                          />
                        ) : (
                            <Plot
                              plot_name={plot_name}
                              params_for_api={params_for_api}
                              addPlotToList={addPlot}
                              dispatch={dispatch}
                              removePlotFromList={removePlot}
                              jsroot_mode={state.jsroot_mode}
                              isPlotSelected={isPlotSelected(
                                selected_plots_name,
                                plot_name
                              )}
                            />
                          )}
                      </Col>
                    ))}
                  </StyledRowImages>
                </>
              )}
          </Wrapper>
          {selected_plots_name.length > 0 && (
            <Wrapper zoomed={selected_plots_name.length}>
              <ZoomedPlots
                selected_plots_name={selected_plots_name}
                params_for_api={params_for_api}
                removePlotFromList={removePlot}
                jsroot_mode={state.jsroot_mode}
                dispatch={dispatch}
                size={state.zoomedPlotSize}
                customizeProps={state.customizeProps}
              />
            </Wrapper>
          )}
        </DivWrapper>
      </div>
    </>
  );
};

export default DiplayFolder;
