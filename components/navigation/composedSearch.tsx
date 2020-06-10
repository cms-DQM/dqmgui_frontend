import * as React from 'react';
import { Col, Button } from 'antd';
import { useRouter } from 'next/router';

import Workspaces from '../workspaces';
import { CustomRow, StyledButton } from '../styledComponents';
import { Browser } from '../browsing';
import { PlotSearch } from '../plots/plot/plotSearch';
import Nav from '../Nav';
import { QueryProps } from '../../containers/display/interfaces';
import { FreeSeacrhModal } from './freeSearchResultModal';

export const ComposedSearch = () => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const [freeSearch, setFreeSearch] = React.useState(false)
  const [search_run_number, setSearchRunNumber] = React.useState(query.run_number);
  const [search_dataset_name, setSearchDatasetName] = React.useState(query.dataset_name);
  const [modalState, setModalState] = React.useState(false)

  const navigationHandler = (
    search_by_run_number: number,
    search_by_dataset_name: string
  ) => {
    setSearchRunNumber(search_by_run_number)
    setSearchDatasetName(search_by_dataset_name)
    setModalState(true)
  }

  return (
    <CustomRow
      width="100%"
      display="flex"
      justifycontent="space-between"
    >
      <FreeSeacrhModal
        modalState={modalState}
        setModalState={setModalState}
        setSearchRunNumber={setSearchRunNumber}
        setSearchDatasetName={setSearchDatasetName}
        search_run_number={search_run_number}
        search_dataset_name={search_dataset_name}
      />
      <CustomRow width="fit-content"
      >
        <Col>
          <Workspaces />
        </Col>
        {freeSearch ?
          <Col>
            <Nav
              initial_search_run_number={search_run_number}
              initial_search_dataset_name={search_dataset_name}
              defaultDatasetName={search_dataset_name}
              defaultRunNumber={search_run_number}
              handler={navigationHandler}
              type="top"
            />
          </Col> :
          <Col>
            <Browser />
          </Col>
        }
        <StyledButton onClick={() => setFreeSearch(!freeSearch)}>{
          freeSearch ? "Set composed search" : "Set free search"
        }</StyledButton>
      </CustomRow>
      <Col>
        <PlotSearch isLoadingFolders={false} />
      </Col>
    </CustomRow >
  )
}