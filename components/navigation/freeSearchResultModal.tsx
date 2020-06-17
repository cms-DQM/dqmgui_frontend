import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form } from 'antd';

import { StyledModal, ResultsWrapper } from '../viewDetailsMenu/styledComponents';
import SearchResults from '../../containers/search/SearchResults';
import { useSearch } from '../../hooks/useSearch';
import { QueryProps } from '../../containers/display/interfaces';
import { StyledButton } from '../styledComponents';
import { theme } from '../../styles/theme';
import { SelectedData } from './selectedData';
import Nav from '../Nav';

interface FreeSeacrhModalProps {
  setModalState(state: boolean): void,
  modalState: boolean;
  search_run_number: number | undefined | string;
  search_dataset_name: string | undefined;
  setSearchDatasetName(dataset_name: any): void;
  setSearchRunNumber(run_number: any): void;
}

export const SearchModal = ({ setModalState, modalState, search_run_number, search_dataset_name, setSearchDatasetName, setSearchRunNumber }: FreeSeacrhModalProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const dataset = query.dataset_name ? query.dataset_name : ''

  const [datasetName, setDatasetName] = useState(dataset)
  const run = query.run_number ? query.run_number : NaN
  const [runNumber, setRunNumber] = useState(run)

  useEffect(() => {
    const run = query.run_number ? query.run_number : NaN
    const dataset = query.dataset_name ? query.dataset_name : ''
    setDatasetName(dataset)
    setRunNumber(run)
  }, [query.dataset_name, query.run_number])

  const onClosing = () => {
    setModalState(false);
  };

  const searchHandler = (run_number: number, dataset_name: string) => {
    setDatasetName(dataset_name)
    setRunNumber(run_number)
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

  const onOk = async () => {
    await form.submit();
    onClosing();
  };

  const [form] = Form.useForm();

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
        <StyledButton key="OK" onClick={onOk}>
          OK
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
          <SelectedData form={form} dataset_name={datasetName} run_number={runNumber} />
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