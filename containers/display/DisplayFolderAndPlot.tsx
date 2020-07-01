import React, { FC, useState, useContext, useRef } from 'react';
import { Row, Col, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import { useRouter } from 'next/router';

import { useRequest } from '../../hooks/useRequest';
import { PlotDataProps, QueryProps } from './interfaces';
import { ZoomedPlots } from '../../components/plots/zoomedPlots';
import { ViewDetailsMenu } from '../../components/viewDetailsMenu';
import { Wrapper, DivWrapper } from './styledComponents';
import { FolderPath } from './folderPath';
import {
  getSelectedPlots,
  doesPlotExists,
  getContents,
  getDirectories,
} from './utils';
import {
  SpinnerWrapper,
  Spinner,
  StyledAlert,
} from '../search/styledComponents';
import { LeftSidePlots } from '../../components/plots/plot';
import { Directories } from './directories';
import { NoResultsFound } from '../search/noResultsFound';
import {
  CustomDiv,
  CustomRow,
  StyledSecondaryButton,
} from '../../components/styledComponents';
import { useFilterFolders } from '../../hooks/useFilterFolders';
import { SettingsModal } from '../../components/settings';
import { store } from '../../contexts/leftSideContext';

interface DirectoryInterface {
  subdir: string;
}

export interface PlotInterface {
  obj: string;
  path: string;
  content: any;
  properties: any;
}

interface FolderProps {
  folder_path?: string;
  run_number: string;
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
    errors,
  } = useRequest(
    `/data/json/archive/${run_number}${dataset_name}/${folder_path}`,
    {},
    [folder_path]
  );

  const [openSettings, toggleSettingsModal] = useState(false);
  const contents: (PlotInterface & DirectoryInterface)[] = getContents(data);
  const allDirectories = getDirectories(contents);
  const router = useRouter();
  const query: QueryProps = router.query;
  const selectedPlots = query.selected_plots;
  const { viewPlotsPosition, proportion } = useContext(store);

  //filtering directories by selected workspace
  const { foldersByPlotSearch, plots } = useFilterFolders(
    query,
    allDirectories
  );

  const filteredFolders: any[] = foldersByPlotSearch ? foldersByPlotSearch : [];
  const selected_plots: PlotDataProps[] = getSelectedPlots(
    selectedPlots,
    plots
  );

  return (
    <>
      <Row
        style={{ padding: 8, width: '100%', justifyContent: 'space-between' }}
      >
        <SettingsModal
          openSettings={openSettings}
          toggleSettingsModal={toggleSettingsModal}
          isAnyPlotSelected={selected_plots.length === 0}
        />
        <Col style={{ padding: 8 }}>
          <FolderPath folder_path={folder_path} />
        </Col>
        <Col>
          <StyledSecondaryButton
            icon={<SettingOutlined />}
            onClick={() => toggleSettingsModal(true)}
          >
            Settings
          </StyledSecondaryButton>
        </Col>
      </Row>
      <Row style={{ width: '100%' }}>
        {doesPlotExists(contents).length > 0 && (
          <ViewDetailsMenu selected_plots={selected_plots.length > 0} />
        )}
      </Row>
      <>
        <DivWrapper
          selectedPlots={selected_plots.length > 0}
          position={viewPlotsPosition}
        >
          <Wrapper
            zoomed={selected_plots.length > 0 && errors.length === 0}
            notZoomedPlot={true}
            position={viewPlotsPosition}
            proportion={proportion}
          >
            {isLoading ? (
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
            ) : (
              <>
                {!isLoading &&
                filteredFolders.length === 0 &&
                plots.length === 0 &&
                errors.length === 0 ? (
                  <NoResultsFound />
                ) : !isLoading && errors.length === 0 ? (
                  <>
                    <CustomRow width="100%">
                      <Directories directories={filteredFolders} />
                    </CustomRow>
                    <Row>
                      {plots.map((plot: PlotDataProps | undefined) => {
                        if (plot) {
                          return (
                            <div key={plot.name}>
                              <LeftSidePlots
                                plot={plot}
                                selected_plots={selected_plots}
                              />
                            </div>
                          );
                        }
                        return <></>;
                      })}
                    </Row>
                  </>
                ) : (
                  !isLoading &&
                  errors.length > 0 &&
                  errors.map((error) => (
                    <StyledAlert
                      key={error}
                      message={error}
                      type="error"
                      showIcon
                    />
                  ))
                )}
              </>
            )}
          </Wrapper>
          {selected_plots.length > 0 && errors.length === 0 && (
            <Wrapper
              zoomed={selected_plots.length && errors.length === 0}
              position={viewPlotsPosition}
            >
              <ZoomedPlots selected_plots={selected_plots} />
            </Wrapper>
          )}
        </DivWrapper>
      </>
    </>
  );
};

export default DiplayFolder;
