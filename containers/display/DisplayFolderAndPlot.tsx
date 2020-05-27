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
import { getSelectedPlots, doesPlotExists, getContents, getDirectories, getFormatedPlotsObject } from './utils';
import cleanDeep from 'clean-deep';
import { SpinnerWrapper, Spinner } from '../search/styledComponents';
import { useRouter } from 'next/router';
import { RightSideStateProvider } from '../../contexts/rightSideContext';
import { LeftSidePlots } from '../../components/plots/plot';
import { Directories } from './directories'
import { NoResultsFound } from '../search/noResultsFound';

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



const DiplayFolder: FC<FolderProps> = ({
  folder_path,
  run_number,
  dataset_name,
}) => {
  const {
    data,
    isLoading,
  } = useRequest(
    `/data/json/archive/${run_number}${dataset_name}${folder_path}`,
    {},
    [folder_path]
  );

  const contents: (PlotInterface & DirectoryInterface)[] = getContents(data);
  const directories = getDirectories(contents)
  const plots = getFormatedPlotsObject(contents)

  const router = useRouter();
  const query: QueryProps = router.query;
  const selectedPlots = query.selected_plots;
  const selected_plots: PlotDataProps[] = getSelectedPlots(selectedPlots);

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
                {directories && directories.length > 0 &&
                  <Directories directories={directories} />
                }
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
            )}{
            !directories || directories.length === 0 && plots.length === 0 &&
            <NoResultsFound />
          }
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
