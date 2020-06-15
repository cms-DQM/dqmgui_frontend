import * as React from 'react';
import { Col } from 'antd';
import { useRouter } from 'next/router';

import Workspaces from '../workspaces';
import { CustomRow } from '../styledComponents';
import { Browser } from '../browsing';
import { PlotSearch } from '../plots/plot/plotSearch';
import Nav from '../Nav';
import { QueryProps } from '../../containers/display/interfaces';
import { FreeSeacrhModal } from './freeSearchResultModal';
import { store } from '../../contexts/leftSideContext';
import { searchOptions } from '../constants';

interface SearchProps {
  search_dataset_name: string | undefined;
  search_run_number: number | undefined;
  navigationHandler(search_run_number: number,
    search_dataset_name: string): void;
}

const Search = ({ search_dataset_name, search_run_number, navigationHandler }: SearchProps) => {
  const { searchOption } = React.useContext(store)
  if (searchOption === searchOptions[0].value) {
    return (
      <Nav
        initial_search_run_number={search_run_number}
        initial_search_dataset_name={search_dataset_name}
        defaultDatasetName={search_dataset_name}
        defaultRunNumber={search_run_number}
        handler={navigationHandler}
        type="top"
      />
    )
  } return (<Browser />
  )

}

export const ComposedSearch = () => {
  const router = useRouter();
  const query: QueryProps = router.query;

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
        <Search
          search_dataset_name={search_dataset_name}
          search_run_number={search_run_number}
          navigationHandler={navigationHandler}
        />
      </CustomRow>
      <Col>
        <PlotSearch isLoadingFolders={false} />
      </Col>
    </CustomRow >
  )
} 