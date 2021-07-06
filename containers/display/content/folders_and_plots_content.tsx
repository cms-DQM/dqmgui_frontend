import React, { FC, useState, useContext } from 'react';
import { Col, Row } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

import { PlotDataProps, QueryProps } from '../interfaces';
import { ZoomedPlots } from '../../../components/plots/zoomedPlots';
import { ViewDetailsMenu } from '../../../components/viewDetailsMenu';
import { DivWrapper, ZoomedPlotsWrapper } from '../styledComponents';
import { FolderPath } from './folderPath';
import { changeRouter, getChangedQueryParams, getSelectedPlots, get_plots_grouped_by_layouts } from '../utils';
import {
  CustomRow,
  StyledSecondaryButton,
} from '../../../components/styledComponents';
import { SettingsModal } from '../../../components/settings';
import { store } from '../../../contexts/globalStateContext';
import { DisplayFordersOrPlots } from './display_folders_or_plots';
import { UsefulLinks } from '../../../components/usefulLinks';
import { ParsedUrlQueryInput } from 'querystring';
import Workspaces from '../../../components/workspaces';
import { PlotSearch } from '../../../components/plots/plot/plotSearch';
import { use_get_folders_and_plots } from './quickCollectionPlotsAndFoldersHandling/use_get_folders_and_plots';

export interface PlotInterface {
  obj?: string;
  name?: string;
  path: string;
  content: any;
  properties: any;
  layout?: string;
  report?: any;
  qteststatuses?: []; //in new backend
  qresults?: []; //in old backend
}

export interface FolderPathByBreadcrumbProps {
  folder_path: string;
  name: string;
}

interface FolderProps {
  folder_path?: string;
}

const Content: FC<FolderProps> = ({
  folder_path,
}) => {
  const {
    viewPlotsPosition,
    proportion,
  } = useContext(store);

  const [openSettings, toggleSettingsModal] = useState(false);
  const plotsAreaRef = React.useRef<any>(null)
  const [plotsAreaWidth, setPlotsAreaWidth] = React.useState(0)

  const router = useRouter();
  const query: QueryProps = router.query;

  const selectedPlots = query.selected_plots;

  const { folders, plots, isLoading, errors, blink } = use_get_folders_and_plots()

  var  { plots_with_layouts_, plots_without_layouts_ } = get_plots_grouped_by_layouts(plots)
  const selected_plots: PlotDataProps[] = getSelectedPlots(
    selectedPlots,
    plots
  );

  const changeFolderPathByBreadcrumb = (parameters: ParsedUrlQueryInput) =>
    changeRouter(getChangedQueryParams(parameters, query));

  React.useEffect(() => {
    if (plotsAreaRef.current) {
      setPlotsAreaWidth(plotsAreaRef.current.clientWidth)
    }
  }, [plotsAreaRef.current])
  return (
    <>
      <CustomRow space={'2'} width="100%" justifycontent="space-between">
        <SettingsModal
          openSettings={openSettings}
          onClose={() => toggleSettingsModal(false)}
          isAnyPlotSelected={selected_plots.length === 0}
        />
        <Col style={{ padding: 8 }}>
          <FolderPath folder_path={folder_path} changeFolderPathByBreadcrumb={changeFolderPathByBreadcrumb} />
        </Col>
        <Row gutter={16}>
          <Col>
            <Workspaces />
          </Col>
          <Col>
            <PlotSearch />
          </Col>
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
        <ViewDetailsMenu plotsAreaWidth={plotsAreaWidth} selected_plots={selected_plots.length > 0} />
      </CustomRow>
      <>
        <DivWrapper
          selectedPlots={selected_plots.length > 0}
          position={viewPlotsPosition}
        >
          <DisplayFordersOrPlots
            blink={blink}
            plotsAreaRef={plotsAreaRef}
            plots={plots_without_layouts_}
            selected_plots={selected_plots}
            plots_grouped_by_layouts={plots_with_layouts_}
            isLoading={isLoading}
            viewPlotsPosition={viewPlotsPosition}
            proportion={proportion}
            errors={errors}
            filteredFolders={folders}
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
