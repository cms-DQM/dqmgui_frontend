import React, { FC, useState, useContext } from 'react';
import { Col } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { chain } from 'lodash';

import { functions_config, get_folders_and_plots_old_api, get_folders_and_plots_new_api } from '../../config/config'
import { useRequest } from '../../hooks/useRequest';
import { PlotDataProps, QueryProps } from './interfaces';
import { ZoomedPlots } from '../../components/plots/zoomedPlots';
import { ViewDetailsMenu } from '../../components/viewDetailsMenu';
import { DivWrapper, ZoomedPlotsWrapper } from './styledComponents';
import { FolderPath } from './folderPath';
import {
  getSelectedPlots,
  doesPlotExists,
  getContents,
  choose_api,
} from './utils';
import {
  CustomRow,
  StyledSecondaryButton,
} from '../../components/styledComponents';
import { useFilterFolders } from '../../hooks/useFilterFolders';
import { SettingsModal } from '../../components/settings';
import { store } from '../../contexts/leftSideContext';
import { Shortucts } from '../../components/shortcuts/shortcut_tag';
import { DisplayFordersOrPlots } from './display_folders_or_plots'

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

const Content: FC<FolderProps> = ({
  folder_path,
  run_number,
  dataset_name,
}) => {
  const current_time = new Date().getTime();
  const [not_older_than, set_not_older_than] = useState(current_time)

  const params = { run_number: run_number, dataset_name: dataset_name, folders_path: folder_path, notOlderThan: not_older_than }
  const current_api = choose_api(params)

  React.useEffect(() => {
    if (functions_config.modes.online_mode) {
      const interval = setInterval(() => { set_not_older_than(()=>{
        // 1 sek is 1000 milisec. we dividing by 10000 and multiply by 10, because we need to
        // have rounded sec. for exmaple: if it is 13, we need to have 10, or 26, we need to have 20 and etc.
        const secounds = Math.round(new Date().getTime()/10000) * 10 
        return secounds
      }) }, 10000)
      return () => clearInterval(interval)
    }
  }, []) //should be like this

  const {
    data,
    isLoading,
    errors,
  } = useRequest(
    current_api,
    {},
    [folder_path, run_number, dataset_name, not_older_than]
  );

  const [openSettings, toggleSettingsModal] = useState(false);
  const router = useRouter();
  const query: QueryProps = router.query;

  const contents: (PlotInterface & DirectoryInterface)[] = getContents(data);

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
        <Col style={{ padding: 8 }}>
          <FolderPath folder_path={folder_path} />
        </Col>
        <Col>
          <StyledSecondaryButton
            icon={<SettingOutlined />}
            onClick={() => toggleSettingsModal(true)}>
            Settings
          </StyledSecondaryButton>
        </Col>
        {/* <Shortucts query={query} /> */}
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
          <DisplayFordersOrPlots
            plots={plots}
            selected_plots={selected_plots}
            plots_grouped_by_layouts={plots_grouped_by_layouts}
            isLoading={isLoading}
            viewPlotsPosition={viewPlotsPosition}
            proportion={proportion}
            errors={errors}
            filteredFolders={filteredFolders}
          />
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

export default Content;
