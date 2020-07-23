import React, { FC, useState, useContext } from 'react';
import { Row, Col, Tooltip } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { chain } from 'lodash';

import { useRequest } from '../../hooks/useRequest';
import { PlotDataProps, QueryProps } from './interfaces';
import { ZoomedPlots } from '../../components/plots/zoomedPlots';
import { ViewDetailsMenu } from '../../components/viewDetailsMenu';
import { Wrapper, DivWrapper, ZoomedPlotsWrapper } from './styledComponents';
import { FolderPath } from './folderPath';
import {
  getSelectedPlots,
  doesPlotExists,
  getContents,
  getDirectories,
  changeRouter,
  getChangedQueryParams,
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
  CustomRow,
  StyledSecondaryButton,
  CustomCol,
} from '../../components/styledComponents';
import { useFilterFolders } from '../../hooks/useFilterFolders';
import { SettingsModal } from '../../components/settings';
import { store } from '../../contexts/leftSideContext';
import { SetRunsToShortcutModal } from '../../components/shortcuts/modal';

interface DirectoryInterface {
  subdir: string;
}

export interface PlotInterface {
  obj: string;
  path: string;
  content: any;
  properties: any;
  layout?: string;
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
    [folder_path, run_number, dataset_name]
  );

  const [openSettings, toggleSettingsModal] = useState(false);
  const [openAddRunsToShortcut, toggleAddRunsToShortcut] = useState(false);

  const contents: (PlotInterface & DirectoryInterface)[] = getContents(data);

  const router = useRouter();
  const query: QueryProps = router.query;

  const current_run = { run_number: query.run_number, dataset_name: query.dataset_name }
  //@ts-ignore
  const old_selected_runs_for_shurtcut = JSON.parse(localStorage.getItem('shortcuts')) || [current_run];
  const [runs_in_shortcut, set_runs_in_shortcut] = React.useState(old_selected_runs_for_shurtcut)
  localStorage.setItem('shortcuts', JSON.stringify(runs_in_shortcut));

  const selectedPlots = query.selected_plots;
  const { viewPlotsPosition, proportion } = useContext(store);

  //filtering directories by selected workspace
  const { foldersByPlotSearch, plots } = useFilterFolders(query, contents);

  const plots_grouped_by_layouts = chain(plots)
    .groupBy('layout')
    .value();

  const filteredFolders: any[] = foldersByPlotSearch ? foldersByPlotSearch : [];
  const selected_plots: PlotDataProps[] = getSelectedPlots(
    selectedPlots,
    plots
  );

  return (
    <>
      <CustomRow space={'2'} width="100%" justifycontent="space-between">
        <SettingsModal
          openSettings={openSettings}
          toggleSettingsModal={toggleSettingsModal}
          isAnyPlotSelected={selected_plots.length === 0}
        />
        <SetRunsToShortcutModal
          runs_in_shortcut={runs_in_shortcut}
          set_runs_in_shortcut={set_runs_in_shortcut}
          openAddRunsToShortcut={openAddRunsToShortcut}
          toggleAddRunsToShortcut={toggleAddRunsToShortcut}
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
        <CustomRow width="100%" justifycontent="space-between">
          <CustomCol display='flex'>
            {runs_in_shortcut.map((run: any) => (
              <CustomCol width= 'fit-content' space={'1'}>
                <Tooltip placement="topLeft" title={run.dataset_name}>
                  <StyledSecondaryButton
                    onClick={() => {
                      changeRouter(
                        getChangedQueryParams(
                          {
                            dataset_name: run.dataset_name,
                            run_number: run.run_number,
                          },
                          query
                        )
                      );
                    }}>
                    {run.run_number}
                  </StyledSecondaryButton>
                </Tooltip>
              </CustomCol>
            ))}
          </CustomCol>
            <Col>
              <StyledSecondaryButton
                onClick={() => toggleAddRunsToShortcut(true)}
              >
                Add run
            </StyledSecondaryButton>
            </Col>
        </CustomRow>
      </CustomRow>
      <CustomRow width="100%">
        {doesPlotExists(contents).length > 0 && (
          <ViewDetailsMenu selected_plots={selected_plots.length > 0} />
        )}
      </CustomRow>
      <>
        <DivWrapper
          selectedPlots={selected_plots.length > 0}
          position={viewPlotsPosition}
        >
          <Wrapper
            any_selected_plots={
              selected_plots.length > 0 && errors.length === 0
            }
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
                          <LeftSidePlots
                            plots={plots}
                            selected_plots={selected_plots}
                            plots_grouped_by_layouts={plots_grouped_by_layouts}
                          />
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
            <ZoomedPlotsWrapper
              any_selected_plots={selected_plots.length && errors.length === 0}
              proportion={proportion}
              position={viewPlotsPosition}
            >
              <ZoomedPlots selected_plots={selected_plots} />
            </ZoomedPlotsWrapper>
          )}
        </DivWrapper>
      </>
    </>
  );
};

export default DiplayFolder;
