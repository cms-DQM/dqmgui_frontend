import React, { useState } from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';

import { StyledModal, ResultsWrapper } from '../viewDetailsMenu/styledComponents';
import SearchResults from '../../containers/search/SearchResults';
import { useSearch } from '../../hooks/useSearch';
import { QueryProps } from '../../containers/display/interfaces';
import { changeRouter, getChangedQueryParams } from '../../containers/display/utils';
import Nav from '../Nav';

interface FreeSeacrhModalProps {
  setModalState(state: boolean): void,
  modalState: boolean;
}

export const FreeSeacrhModal = ({ setModalState, modalState }: FreeSeacrhModalProps) => {

  const router = useRouter();
  const query: QueryProps = router.query;

  const onClosing = () => {
    setModalState(false);
  };

  const [search_run_number, setSearchRunNumber] = useState(query.run_number);
  const [search_dataset_name, setSearchDatasetName] = useState(query.dataset_name);

  const searchHandler = (run_number: number, dataset_name: string) => {

    const params = getChangedQueryParams({ run_number: run_number, dataset_name: dataset_name }, query);
    setSearchDatasetName(dataset_name)
    setSearchRunNumber(run_number)
    setModalState(false);
    changeRouter(params)
  };

  const navigationHandler = (
    search_by_run_number: number,
    search_by_dataset_name: string
  ) => {
    setSearchRunNumber(search_by_run_number)
    setSearchDatasetName(search_by_dataset_name)
  }

  const { results, results_grouped, searching, isLoading, errors } = useSearch(
    search_run_number,
    search_dataset_name
  );

  return (
    <StyledModal
      title="Free data search"
      visible={modalState}
      width='max-content'
      onCancel={() => onClosing()}
      footer={[
        <Button
          key="Close"
          onClick={() => {
            onClosing();
          }}
        >
          Close
        </Button>,
      ]}
    >
      <Nav
        initial_search_run_number={search_run_number}
        initial_search_dataset_name={search_dataset_name}
        defaultDatasetName={search_dataset_name}
        defaultRunNumber={search_run_number}
        handler={navigationHandler}
        type="top"
      />
      {searching ? (
        <ResultsWrapper>
          <SearchResults
            handler={searchHandler}
            isLoading={isLoading}
            results={results}
            results_grouped={results_grouped}
            errors={errors}
          />
        </ResultsWrapper>
      ) : (
          <ResultsWrapper />
        )}
    </StyledModal>
  );
};
