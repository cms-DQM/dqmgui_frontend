import * as React from 'react';
import { Col } from 'antd';
import { useRouter } from 'next/router';

import Workspaces from '../workspaces';
import { CustomRow } from '../styledComponents';
import { Browser } from '../browsing';
import { PlotSearch } from '../plots/plot/plotSearch';
import { QueryProps } from '../../containers/display/interfaces';
import { SearchModal } from './freeSearchResultModal';
import { SearchButton } from '../searchButton';
import { WrapperDiv } from '../../containers/display/styledComponents';

export const ComposedSearch = () => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const run = query.run_number ? query.run_number : ''
  const [search_run_number, setSearchRunNumber] = React.useState(run);
  const [search_dataset_name, setSearchDatasetName] = React.useState(query.dataset_name);
  const [modalState, setModalState] = React.useState(false)

  React.useEffect(() => {
    //when modal is open, run number and dataset search fields are filled with values from query
    if (modalState) {
      const run = query.run_number ? query.run_number : ''
      setSearchDatasetName(query.dataset_name)
      setSearchRunNumber(run)
    }
  }, [modalState])

  return (
    <CustomRow
      width="100%"
      display="flex"
      justifycontent="space-between"
    >
      <SearchModal
        modalState={modalState}
        setModalState={setModalState}
        setSearchRunNumber={setSearchRunNumber}
        setSearchDatasetName={setSearchDatasetName}
        search_run_number={search_run_number}
        search_dataset_name={search_dataset_name}
      />
      <CustomRow width="fit-content"
      >
        <Browser />
        <SearchButton onClick={() => setModalState(true)} />
      </CustomRow>
      <WrapperDiv>
        <Col>
          <Workspaces />
        </Col>
        <Col>
          <PlotSearch isLoadingFolders={false} />
        </Col>
      </WrapperDiv>
    </CustomRow >
  )
} 