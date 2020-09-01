import * as React from 'react';
import { Col, Button, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { PauseOutlined, PlayCircleOutlined } from '@ant-design/icons';

import Workspaces from '../workspaces';
import { CustomRow, CustomCol, CustomDiv } from '../styledComponents';
import { Browser } from '../browsing';
import { PlotSearch } from '../plots/plot/plotSearch';
import { QueryProps } from '../../containers/display/interfaces';
import { SearchModal } from './freeSearchResultModal';
import { SearchButton } from '../searchButton';
import { WrapperDiv } from '../../containers/display/styledComponents';
import { theme } from '../../styles/theme';
import { useUpdateLiveMode } from '../../hooks/useUpdateInLiveMode';

export const ComposedSearch = () => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const run = query.run_number ? query.run_number : '';
  const [search_run_number, setSearchRunNumber] = React.useState(run);
  const [search_dataset_name, setSearchDatasetName] = React.useState(
    query.dataset_name
  );
  const [modalState, setModalState] = React.useState(false);

  React.useEffect(() => {
    //when modal is open, run number and dataset search fields are filled with values from query
    if (modalState) {
      const run = query.run_number ? query.run_number : '';
      setSearchDatasetName(query.dataset_name);
      setSearchRunNumber(run);
    }
  }, [modalState]);

  const set_on_live_mode =
    query.run_number === '0' && query.dataset_name === '/Global/Online/ALL';
  const { update, set_update } = useUpdateLiveMode();

  return (
    <CustomRow
      width="100%"
      display="flex"
      justifycontent="space-between"
      alignitems="center"
    >
      {set_on_live_mode ? (
        <>
          <CustomCol
            width="50%"
            justifycontent="flex-end"
            display="flex"
            alignitems="center"
            texttransform="uppercase"
            color={update ? theme.colors.notification.success : theme.colors.notification.error}
          >
            Live Mode
          <CustomDiv space="2">
              <Tooltip title={`Updating mode is ${update ? 'on' : 'off'}`} >
                {update ? <Button
                  type="primary" shape="circle"
                  onClick={() => {
                    set_update(false)
                  }}
                  icon={<PauseOutlined />}></Button>
                  :
                  <Button
                    type="primary"
                    shape="circle"
                    onClick={() => {
                      set_update(true)
                    }}
                    icon={<PlayCircleOutlined />}>
                  </Button>
                }
              </Tooltip>
            </CustomDiv>
          </CustomCol>
        </>

      ) : (
          <CustomCol display="flex" alignitems="center">
            <SearchModal
              modalState={modalState}
              setModalState={setModalState}
              setSearchRunNumber={setSearchRunNumber}
              setSearchDatasetName={setSearchDatasetName}
              search_run_number={search_run_number}
              search_dataset_name={search_dataset_name}
            />
            <CustomRow width="fit-content">
              <Browser />
              <SearchButton onClick={() => setModalState(true)} />
            </CustomRow>
          </CustomCol>
        )}
      <WrapperDiv>
        <Col>
          <Workspaces />
        </Col>
        <Col>
          <PlotSearch isLoadingFolders={false} />
        </Col>
      </WrapperDiv>
    </CustomRow>
  );
};
