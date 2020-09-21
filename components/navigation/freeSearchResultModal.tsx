import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { useRouter } from 'next/router';
import { Form } from 'antd';

import {
  StyledModal,
  ResultsWrapper,
} from '../viewDetailsMenu/styledComponents';
import SearchResults from '../../containers/search/SearchResults';
import { useSearch } from '../../hooks/useSearch';
import { QueryProps } from '../../containers/display/interfaces';
import { StyledButton } from '../styledComponents';
import { theme } from '../../styles/theme';
import { SelectedData } from './selectedData';
import Nav from '../Nav';
import { getChangedQueryParams } from '../../containers/display/utils';

interface FreeSeacrhModalProps {
  setModalState(state: boolean): void;
  modalState: boolean;
  search_run_number: undefined | string;
  search_dataset_name: string | undefined;
  setSearchDatasetName(dataset_name: any): void;
  setSearchRunNumber(run_number: string): void;
}

const open_a_new_tab = (query: string) => {
  window.open(query, '_blank');
};

export const SearchModal = ({
  setModalState,
  modalState,
  search_run_number,
  search_dataset_name,
  setSearchDatasetName,
  setSearchRunNumber,
}: FreeSeacrhModalProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const dataset = query.dataset_name ? query.dataset_name : '';

  const [datasetName, setDatasetName] = useState(dataset);
  const [openRunInNewTab, toggleRunInNewTab] = useState(false);
  const run = query.run_number ? query.run_number : '';
  const [runNumber, setRunNumber] = useState<string>(run);

  useEffect(() => {
    const run = query.run_number ? query.run_number : '';
    const dataset = query.dataset_name ? query.dataset_name : '';
    setDatasetName(dataset);
    setRunNumber(run);
  }, [query.dataset_name, query.run_number]);

  const onClosing = () => {
    setModalState(false);
  };

  const searchHandler = (run_number: string, dataset_name: string) => {
    setDatasetName(dataset_name);
    setRunNumber(run_number);
  };

  const navigationHandler = (
    search_by_run_number: string,
    search_by_dataset_name: string
  ) => {
    setSearchRunNumber(search_by_run_number);
    setSearchDatasetName(search_by_dataset_name);
  };

  const { results_grouped, searching, isLoading, errors } = useSearch(
    search_run_number,
    search_dataset_name
  );

  const onOk = async () => {
    if (openRunInNewTab) {
      const params = form.getFieldsValue();
      const new_tab_query_params = qs.stringify(
        getChangedQueryParams(params, query)
      );
      //root url is ends with first '?'. I can't use just root url from config.config, because
      //in dev env it use localhost:8081/dqm/dev (this is old backend url from where I'm getting data),
      //but I need localhost:3000
      const current_root = window.location.href.split('/?')[0];
      open_a_new_tab(`${current_root}/?${new_tab_query_params}`);
    } else {
      await form.submit();
    }
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
      {modalState && (
        <>
          <Nav
            initial_search_run_number={search_run_number}
            initial_search_dataset_name={search_dataset_name}
            defaultDatasetName={datasetName}
            defaultRunNumber={runNumber}
            handler={navigationHandler}
            type="top"
          />
          <SelectedData
            form={form}
            dataset_name={datasetName}
            run_number={runNumber}
            toggleRunInNewTab={toggleRunInNewTab}
            openRunInNewTab={openRunInNewTab}
          />
          {searching ? (
            <ResultsWrapper>
              <SearchResults
                handler={searchHandler}
                isLoading={isLoading}
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
