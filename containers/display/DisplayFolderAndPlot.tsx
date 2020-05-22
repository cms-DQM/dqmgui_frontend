import React, { FC } from 'react';
import Link from 'next/link';
import { Col } from 'antd';
import _ from 'lodash';

import { useRequest } from '../../hooks/useRequest';
import { PlotDataProps, QueryProps } from './interfaces';
import { ZoomedPlots } from '../../components/plots/zoomedPlots';;
import { ViewDetailsMenu } from '../../components/viewDetailsMenu';
import {
  Wrapper,
  DivWrapper,
} from './styledComponents';
import { FolderPath } from './folderPath';
import { getSelectedPlots } from './utils';
import cleanDeep from 'clean-deep';
import { SpinnerWrapper, Spinner } from '../search/styledComponents';
import { useRouter } from 'next/router';
import { RightSideStateProvider } from '../../contexts/rightSideContext';
import { LeftSidePlots } from '../../components/plots/plot';
import {Directories } from './directories'
interface DirectoryInterface {
  subdir: string;
}

export interface PlotInterface {
  obj: string;
  dir: string;
  content: any;
  properties: any;
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

  const router = useRouter();
  const query: QueryProps = router.query;
  const selectedPlots = query.selected_plots;

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

  const directories = cleanDeep(
    contents.map((content: DirectoryInterface) => content.subdir)
  );

  const plots = cleanDeep(
    contents.map((content: PlotInterface) => {
      return { name: content.obj, dir: content.dir && '/' + content.dir, properties: content.properties };
    })
  ).sort();

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
              selected_plots={selected_plots.length > 0}
            />
          )}
          {isLoading ? (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          ) : (
              <>
              <Directories directories={directories ? directories: []}/>
                {plots.map((plot: PlotDataProps | undefined) => {
                  if (plot) {
                    return (
                      <div key={plot.name}>
                        <LeftSidePlots plot={plot} />
                      </div>
                    );
                  }
                })}
              </>
            )}
        </Wrapper>
        {selected_plots.length > 0 && (
          <Wrapper zoomed={selected_plots.length}>
            <RightSideStateProvider>
              <ZoomedPlots
                selected_plots={selected_plots}
              />
            </RightSideStateProvider>
          </Wrapper>
        )}
      </DivWrapper>
    </>
  );
};

export default DiplayFolder;
