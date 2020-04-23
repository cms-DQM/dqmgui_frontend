import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import 'antd/dist/antd.css';
import Router, { useRouter } from 'next/router';

import Nav from '../components/Nav';
import SearchResults from '../containers/search/SearchResults';
import DiplayFolders from '../containers/display/DisplayFolderAndPlot';
import { useSearch } from '../hooks/useSearch';
import {
  StyledHeader,
  StyledLayout,
  StyledContent,
} from '../styles/styledComponents';
import {
  NotFoundDiv,
  NotFoundDivWrapper,
  ChartIcon,
} from '../containers/search/styledComponents';
import { FolderPathQuery } from '../containers/display/interfaces';
import { useValidateQuery } from '../hooks/useValidateQuery';
import { Alert } from 'antd';

const navigationHandler = (
  search_by_run_number: number,
  search_by_dataset_name: string
) => {
  Router.replace({
    pathname: '/',
    query: {
      search_run_number: search_by_run_number,
      search_dataset_name: search_by_dataset_name,
    },
  });
};

const serchResultsHandler = (run: number, dataset: string) => {
  Router.replace({
    pathname: '/',
    query: {
      run_number: run,
      dataset_name: dataset,
    },
  });
};

const Index: NextPage<FolderPathQuery> = () => {
  // const [run_number, setRunNumber] = useState('');
  // const [dataset_name, setDatasetName] = useState('');
  const router = useRouter();
  const {
    query: {
      run_number,
      dataset_name,
      folder_path,
      search_run_number,
      search_dataset_name,
    },
    validation_errors,
  } = useValidateQuery(router.query);

  const { results, results_grouped, searching, isLoading } = useSearch(
    search_run_number,
    search_dataset_name
  );

  return (
    <div>
      <Head>
        <script
          crossOrigin="anonymous"
          type="text/javascript"
          src="/jsroot-5.8.0/scripts/JSRootCore.js?2d&hist&more2d"
        ></script>
      </Head>
      <StyledLayout>
        <StyledHeader>
          <Nav
            initial_search_run_number={search_run_number}
            initial_search_dataset_name={search_dataset_name}
            handler={navigationHandler}
          />
        </StyledHeader>
        <StyledContent>
          {validation_errors.length > 0 ? (
            <div>
              {validation_errors.map((error) => (
                <Alert
                  message="Error in the URL query"
                  description={error}
                  type="error"
                  showIcon
                />
              ))}
            </div>
          ) : run_number && dataset_name ? (
            // If a user already has a run_number and dataset_name, he is not searching nor is he in the homepage, he is
            <DiplayFolders
              run_number={run_number}
              dataset_name={dataset_name}
              folder_path={folder_path || ''}
            />
          ) : searching ? (
            <SearchResults
              isLoading={isLoading}
              results={results}
              results_grouped={results_grouped}
              handler={serchResultsHandler}
            />
          ) : (
            <NotFoundDivWrapper>
              <NotFoundDiv noBorder>
                <ChartIcon />
                Welcome to DQM GUI
              </NotFoundDiv>
            </NotFoundDivWrapper>
          )}
        </StyledContent>
      </StyledLayout>
    </div>
  );
};

export default Index;
