import React, { useState } from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';

import { StyledModal, ResultsWrapper } from '../viewDetailsMenu/styledComponents';
import SearchResults from '../../containers/search/SearchResults';
import { useSearch } from '../../hooks/useSearch';
import { QueryProps } from '../../containers/display/interfaces';
import { changeRouter, getChangedQueryParams } from '../../containers/display/utils';

interface FreeSeacrhModalProps {
  setModalState(state: boolean): void,
  modalState: boolean;
  search_run_number: number | undefined;
  search_dataset_name: string | undefined;
  setSearchDatasetName(dataset_name: any): void;
  setSearchRunNumber(run_number: any): void;
}

export const FreeSeacrhModal = ({ setModalState, modalState, search_run_number, search_dataset_name, setSearchDatasetName, setSearchRunNumber }: FreeSeacrhModalProps) => {

  const router = useRouter();
  const query: QueryProps = router.query;

  const onClosing = () => {
    setModalState(false);
  };

  const searchHandler = (run_number: number, dataset_name: string) => {
    const params = getChangedQueryParams({ run_number: run_number, dataset_name: dataset_name }, query);
    setSearchDatasetName(dataset_name)
    setSearchRunNumber(run_number)
    setModalState(false);
    changeRouter(params)
  };

  const { results, results_grouped, searching, isLoading, errors } = useSearch(
    search_run_number,
    search_dataset_name
  );

  return (
    <StyledModal
      title="Overlay Plots data search"
      visible={modalState}
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