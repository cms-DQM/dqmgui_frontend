import React, { useState, useContext } from 'react';
import { Button } from 'antd';

import Nav from '../../Nav';
import { useSearch } from '../../../hooks/useSearch';
import SearchResults from '../../../containers/search/SearchResults';
import { ResultsWrapper, StyledModal } from '../styledComponents';
import { store } from '../../../contexts/leftSideContext';

interface CustomModalProps {
  id: any;
}

export const CustomModal = ({
  id,
}: CustomModalProps) => {
  const [search_run_number, setSearchRunNumber] = useState(NaN);
  const [search_dataset_name, setSearchDatasetName] = useState('');
  const { change_value_in_reference_table, toggleOverlayDataMenu, openOverlayDataMenu } = useContext(store)

  const navigationHandler = (
    search_by_run_number: number,
    search_by_dataset_name: string
  ) => {
    setSearchRunNumber(search_by_run_number);
    setSearchDatasetName(search_by_dataset_name);
  };

  const clear = () => {
    setSearchRunNumber(NaN);
    setSearchDatasetName('');
  };

  const onClosing = () => {
    clear();
    toggleOverlayDataMenu(false);
  };

  const searchHandler = (run_number: number, dataset_name: string) => {
    change_value_in_reference_table(
      run_number,
      'run_number',
      id
    );

    change_value_in_reference_table(
      dataset_name,
      'dataset_name',
      id
    );

    toggleOverlayDataMenu(false);
    clear();
  };

  const { results, results_grouped, searching, isLoading, errors } = useSearch(
    search_run_number,
    search_dataset_name
  );

  return (
    <StyledModal
      title="Overlay Plots data search"
      visible={openOverlayDataMenu}
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
      {openOverlayDataMenu && (
        <>
          <Nav
            handler={navigationHandler}
            setRunNumber={setSearchRunNumber}
            setDatasetName={setSearchDatasetName}
            type="overlay"
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
        </>
      )}
    </StyledModal>
  );
};
