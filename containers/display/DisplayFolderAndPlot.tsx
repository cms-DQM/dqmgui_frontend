import React, { FC } from 'react';
import _ from 'lodash';
import { Row, Col } from 'antd';

import { useRequest } from '../../hooks/useRequest';
import { PlotDataProps, QueryProps } from './interfaces';
import { ZoomedPlots } from '../../components/plots/zoomedPlots';;
import { ViewDetailsMenu } from '../../components/viewDetailsMenu';
import {
  Wrapper,
  DivWrapper,
} from './styledComponents';
import { FolderPath } from './folderPath';
import {
  getSelectedPlots,
  doesPlotExists,
  getContents,
  getDirectories,
  getFormatedPlotsObject,
  getFilteredDirectories
} from './utils';
import { SpinnerWrapper, Spinner } from '../search/styledComponents';
import { useRouter } from 'next/router';
import { RightSideStateProvider } from '../../contexts/rightSideContext';
import { LeftSidePlots } from '../../components/plots/plot';
import { Directories } from './directories'
import { NoResultsFound } from '../search/noResultsFound';
import { store } from '../../contexts/leftSideContext';
import { CustomDiv } from '../../components/styledComponents';
import { PlotSearch } from '../../components/plots/plot/plotSearch';

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

  const globalState = React.useContext(store)
  const { workspaceFolders } = globalState;
  //filtering directories by selected workspace
  const filteredDirectories = getFilteredDirectories(query, workspaceFolders, directories)
console.log(filteredDirectories)
  return (
    <>
      <Row style={{ padding: 8 }}>
        <Col span={6}>
          <FolderPath
            folder_path={folder_path}
          />
        </Col>
        <Col>
          <PlotSearch />
        </Col>
      </Row>
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
                <Directories directories={filteredDirectories} />
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
          {
            !isLoading && filteredDirectories.length === 0 && plots.length === 0 &&
            <CustomDiv fullwidth="true">
              <NoResultsFound />
            </CustomDiv>
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
