import React, { FC, useReducer } from 'react';
import Link from 'next/link';
import { Col } from 'antd';
import _ from 'lodash';

import { useRequest } from '../../hooks/useRequest';
import { Plot } from './plot';
import { ParamsForApiProps, PlotDataProps } from './interfaces';
import { OverlaidPlot } from './overlaidPlot';
import { ZoomedPlots } from '../../components/zoomedPlots/';
import {
  displayFolderOrPlotComponentReducer,
  initialState,
  removePlotFromList,
  addPlotToList,
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
import { StyledRow } from './styledComponents';
import { isPlotSelected } from './utils';
import cleanDeep from 'clean-deep';
import { SpinnerWrapper, Spinner } from '../search/styledComponents';

interface DirectoryInterface {
  subdir: string;
}

export interface PlotInterface {
  obj: string;
  dir: string;
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

  const {
    errorBars,
    overlay,
    height,
    width,
    normalize,
    overlay_plot,
    stats,
    selected_plots,
  } = state;

  const removePlot = (plot: PlotDataProps) => {
    removePlotFromList(plot)(state, dispatch);
  };

  const addPlot = (plot: PlotDataProps) => {
    if (selected_plots.indexOf(plot) < 0) {
      addPlotToList(plot)(state, dispatch);
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

  const plots = cleanDeep(
    contents.map((content: PlotInterface) => {
      return { name: content.obj, dir: content.dir && '/' + content.dir }
    })
  );

  return (
    <>
      <FolderPath
        folder_path={folder_path}
        run_number={run_number}
        dataset_name={dataset_name}
      />
      {doesPlotExists(contents).length > 0 && (
        <ViewDetailsMenu
          dispatch={dispatch}
          state={state}
          overlay_plot={overlay_plot}
        />
      )}
      {/* <div 
      style={{ height: '100%', overflow: 'scroll', display: 'flex', flexWrap: 'wrap' }}
      > */}
      <div style={{ height: '100%', overflow: selected_plots.length ? 'hidden' : 'scroll', display: 'flex' }}>
        <Wrapper
          zoomed={selected_plots.length}
          noBorder
          noScroll={selected_plots.length > 0 ? false : true}
        >
          {isLoading ? (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          ) : (
              <>
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
                {plots.map((plot: PlotDataProps | undefined) => {
                  if (plot) {
                    params_for_api.folders_path = plot.dir

                    return (
                      // <Col key={plot?.name} style={{ display: 'felx', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <>  
                      {overlay_plot.length > 0 ? (
                          <OverlaidPlot
                            plot={plot}
                            params_for_api={params_for_api}
                            addPlotToList={addPlot}
                            dispatch={dispatch}
                            removePlotFromList={removePlot}
                            isPlotSelected={isPlotSelected(
                              selected_plots,
                              plot.name
                            )}
                          />
                        ) : (
                            <Plot
                              plot={plot}
                              params_for_api={params_for_api}
                              addPlotToList={addPlot}
                              dispatch={dispatch}
                              removePlotFromList={removePlot}
                              jsroot_mode={state.jsroot_mode}
                              isPlotSelected={isPlotSelected(
                                selected_plots,
                                plot.name
                              )}
                            />
                          )}
                      {/* // </Col> */}
                      </>
                    )
                  }
                })}
              </>
            )}
        </Wrapper>
        {selected_plots.length > 0 && (
          <Wrapper zoomed={selected_plots.length}>
            <ZoomedPlots
              selected_plots={selected_plots}
              params_for_api={params_for_api}
              removePlotFromList={removePlot}
              jsroot_mode={state.jsroot_mode}
              dispatch={dispatch}
              size={state.zoomedPlotSize}
              customizeProps={state.customizeProps}
            />
          </Wrapper>
        )}
      </div>
    </>
  );
};

export default DiplayFolder;
