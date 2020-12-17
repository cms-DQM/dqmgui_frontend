import React, { FC, useState, useContext } from 'react';
import { Col, Row } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { chain } from 'lodash';

import { PlotDataProps, QueryProps } from '../interfaces';
import { ZoomedPlots } from '../../../components/plots/zoomedPlots';
import { ViewDetailsMenu } from '../../../components/viewDetailsMenu';
import { DivWrapper, ZoomedPlotsWrapper } from '../styledComponents';
import { FolderPath } from './folderPath';
import { changeRouter, getChangedQueryParams, getSelectedPlots } from '../utils';
import {
  CustomRow,
  StyledSecondaryButton,
} from '../../../components/styledComponents';
import { useFilterFolders } from '../../../hooks/useFilterFolders';
import { SettingsModal } from '../../../components/settings';
import { store } from '../../../contexts/leftSideContext';
import { DisplayFordersOrPlots } from './display_folders_or_plots';
import { UsefulLinks } from '../../../components/usefulLinks';
import { ParsedUrlQueryInput } from 'querystring';

export interface PlotInterface {
  obj?: string;
  name?: string;
  path: string;
  content: any;
  properties: any;
  layout?: string;
  report?: any;
  qresults?: [];
  qtstatuses?: [];
  overlay?: string[];
}

export interface FolderPathByBreadcrumbProps {
  folder_path: string;
  name: string;
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
  const {
    viewPlotsPosition,
    proportion,
    updated_by_not_older_than,
  } = useContext(store);

  const router = useRouter();
  const query: QueryProps = router.query;

  const params = {
    run_number: run_number,
    dataset_name: dataset_name,
    folders_path: folder_path,
    notOlderThan: updated_by_not_older_than,
    plot_search: query.plot_search,
  };

  const [openSettings, toggleSettingsModal] = useState(false);

  //filtering directories by selected workspace
  const { foldersByPlotSearch, plots, isLoading, errors } = useFilterFolders(
    query,
    params,
    updated_by_not_older_than
  );
  const plots_with_layouts = plots.filter((plot) => plot.hasOwnProperty('layout'))
  var plots_grouped_by_layouts = chain(plots_with_layouts).sortBy('layout').groupBy('layout').value()
  const filteredFolders: any[] = foldersByPlotSearch ? foldersByPlotSearch : [];
  const selected_plots: PlotDataProps[] = getSelectedPlots(
    query,
    plots
  );

  const changeFolderPathByBreadcrumb = (parameters: ParsedUrlQueryInput) =>
    changeRouter(getChangedQueryParams(parameters, query));

    return (
    <>
      <CustomRow space={'2'} width="100%" justifycontent="space-between">
        <SettingsModal
          openSettings={openSettings}
          toggleSettingsModal={toggleSettingsModal}
          isAnyPlotSelected={selected_plots.length === 0}
        />
        <Col style={{ padding: 8 }}>
          <FolderPath folder_path={folder_path} changeFolderPathByBreadcrumb={changeFolderPathByBreadcrumb} />
        </Col>
        <Row gutter={16}>
          <Col>
            <UsefulLinks />
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
      </CustomRow>
      <CustomRow width="100%">
        <ViewDetailsMenu 
        query={query}
        selected_plots={selected_plots.length > 0} />
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
            query={query}
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
