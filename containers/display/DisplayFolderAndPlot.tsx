import React, { FC, useReducer, useState } from 'react';
import Link from 'next/link';
import { Col, Row, Button } from 'antd';
import _ from 'lodash';

import { useRequest } from '../../hooks/useRequest';
import { Plot } from '../../components/plots/plot/singlePlot/plot';
import { ParamsForApiProps, PlotDataProps, QueryProps } from './interfaces';
import { OverlaidPlot } from '../../components/plots/plot/overlaidPlot';
import { ZoomedPlots } from '../../components/plots/zoomedPlots';
import {
  displayFolderOrPlotComponentReducer,
  initialState,
} from '../../reducers/displayFolderOrPlot';
import { ViewDetailsMenu } from '../../components/viewDetailsMenu';
import {
  Icon,
  DirecotryWrapper,
  StyledA,
  Wrapper,
  DivWrapper,
} from './styledComponents';
import { FolderPath } from './folderPath';
import { isPlotSelected, getSelectedPlots } from './utils';
import cleanDeep from 'clean-deep';
import { SpinnerWrapper, Spinner } from '../search/styledComponents';
import { useRouter } from 'next/router';

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
// getContent also sorting data that directories should be displayed firstly, just after them- plots images.
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

  const router = useRouter();
  const query: QueryProps = router.query;
  const selectedPlots = query.selected_plots;


  const { errorBars, height, width, normalize, overlay_plot, stats } = state;

  const selected_plots: PlotDataProps[] = getSelectedPlots(selectedPlots);

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
    overlay: query.overlay,
    stats: stats,
    normalize: normalize,
    errorBars: errorBars,
  };

  const directories = cleanDeep(
    contents.map((content: DirectoryInterface) => content.subdir)
  );

  const plots = cleanDeep(
    contents.map((content: PlotInterface) => {
      return { name: content.obj, dir: content.dir && '/' + content.dir };
    })
  );

  return (
    <>
      <FolderPath
        folder_path={folder_path}
        run_number={run_number}
        dataset_name={dataset_name}
      />
      <DivWrapper selectedPlots={selected_plots.length > 0}>
        <Wrapper zoomed={selected_plots.length > 0} notZoomedPlot={true}>
          {doesPlotExists(contents).length > 0 && (
            <ViewDetailsMenu
              dispatch={dispatch}
              state={state}
              overlay_plot={overlay_plot}
              selected_plots={selected_plots.length > 0}
            />
          )}
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
                    params_for_api.folders_path = plot.dir;
                    return (
                      <>
                        {overlay_plot.length > 0 ? (
                          <OverlaidPlot
                            key={plot.name}
                            plot={plot}
                            params_for_api={params_for_api}
                            isPlotSelected={isPlotSelected(
                              selected_plots,
                              plot.name
                            )}
                          />
                        ) : (
                            <Plot
                              plot={plot}
                              key={plot.name}
                              params_for_api={params_for_api}
                              isPlotSelected={isPlotSelected(
                                selected_plots,
                                plot.name
                              )}
                            />
                          )}
                      </>
                    );
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
              jsroot_mode={state.jsroot_mode}
              dispatch={dispatch}
              size={state.zoomedPlotSize}
              customizeProps={state.customizeProps}
            />
          </Wrapper>
        )}
      </DivWrapper>
    </>
  );
};

export default DiplayFolder;
