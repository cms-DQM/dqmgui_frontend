import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { StyledModal, ResultsWrapper } from '../viewDetailsMenu/styledComponents';
import SearchResults from '../../containers/search/SearchResults';
import { useSearch } from '../../hooks/useSearch';
import { QueryProps } from '../../containers/display/interfaces';
import { changeRouter, getChangedQueryParams } from '../../containers/display/utils';
import { StyledButton } from '../styledComponents';
import { theme } from '../../styles/theme';
import { SelectedData } from './selectedData';
import Nav from '../Nav';

interface FreeSeacrhModalProps {
  setModalState(state: boolean): void,
  modalState: boolean;
  search_run_number: number | undefined;
  search_dataset_name: string | undefined;
  setSearchDatasetName(dataset_name: any): void;
  setSearchRunNumber(run_number: any): void;
}

export const SearchModal = ({ setModalState, modalState, search_run_number, search_dataset_name, setSearchDatasetName, setSearchRunNumber }: FreeSeacrhModalProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const [datasetName, setDatasetName] = useState(query.dataset_name)
  const run = query.run_number ? parseInt(query.run_number) : NaN
  const [runNumber, setRunNumber] = useState(run)

  const onClosing = () => {
    setModalState(false);
  };

  const searchHandler = (run_number: number, dataset_name: string) => {
    const params = getChangedQueryParams({ run_number: run_number, dataset_name: dataset_name }, query);
    setDatasetName(dataset_name)
    setRunNumber(run_number)
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
      title="Search data"
      visible={modalState}
      onCancel={() => onClosing()}
      footer={[
        <StyledButton
          color={theme.colors.secondary.main}
          background="white"
          key="Close"
          onClick={() => onClosing()}
        >
          Close
        </StyledButton>,
      ]}
    >
      {modalState &&
        <>
          <Nav
            initial_search_run_number={search_run_number}
            initial_search_dataset_name={search_dataset_name}
            defaultDatasetName={datasetName}
            defaultRunNumber={runNumber}
            handler={navigationHandler}
            type="top"
          />
          <SelectedData dataset_name={datasetName} run_number={runNumber} />
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
        </>
      }
    </StyledModal>
  );
};