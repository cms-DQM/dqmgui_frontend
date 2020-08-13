import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { Tooltip } from 'antd';

import Nav from '../components/Nav';
import SearchResults from '../containers/search/SearchResults';
import DiplayFolders from '../containers/display/content';
import { useSearch } from '../hooks/useSearch';
import {
  StyledHeader,
  StyledLayout,
  StyledDiv,
  StyledLogoWrapper,
  StyledLogo,
  StyledLogoDiv,
} from '../styles/styledComponents';
import {
  NotFoundDiv,
  NotFoundDivWrapper,
  ChartIcon,
} from '../containers/search/styledComponents';
import { FolderPathQuery, QueryProps } from '../containers/display/interfaces';
import { workspaces } from '../workspaces/offline';
import { ComposedSearch } from '../components/navigation/composedSearch';
import { seperateRunAndLumiInSearch } from '../components/utils';
import {
  changeRouter,
  getChangedQueryParams,
} from '../containers/display/utils';
import { functions_config } from '../config/config';
import { LatestRuns } from '../components/latestRuns';
import { store } from '../contexts/leftSideContext';
import { RunInfo } from '../components/runInfo';

const navigationHandler = (
  search_by_run_number: string,
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

const backToMainPage = () => {
  Router.replace({
    pathname: '/',
    query: {
      search_run_number: '',
      search_dataset_name: '',
    },
  });
};

const Index: NextPage<FolderPathQuery> = () => {
  // We grab the query from the URL:
  const router = useRouter();
  const query: QueryProps = router.query;

  const serchResultsHandler = (run: string, dataset: string) => {
    const { parsedRun, parsedLumi } = seperateRunAndLumiInSearch(
      run.toString()
    );
    changeRouter(
      getChangedQueryParams(
        {
          lumi: parsedLumi,
          run_number: parsedRun,
          dataset_name: dataset,
          workspaces: workspaces[0].workspaces[2].label,
        },
        query
      )
    );
  };

  const { results_grouped, searching, isLoading, errors } = useSearch(
    query.search_run_number,
    query.search_dataset_name
  );

  const isDatasetAndRunNumberSelected =
    !!query.run_number && !!query.dataset_name;

  const { set_updated_by_not_older_than } = React.useContext(store);

  const current_time = new Date().getTime();
  const [not_older_than, set_not_older_than] = React.useState(current_time);

  React.useEffect(() => {
    if (functions_config.modes.online_mode && errors.length === 0) {
      const interval = setInterval(() => {
        set_not_older_than(() => {
          // 1 sec is 1000 milisec. we dividing by 10000 and multiply by 10, because we need to
          // have rounded sec. for exmaple: if it is 13, we need to have 10, or 26, we need to have 20 and etc.
          const secounds = Math.round(new Date().getTime() / 10000) * 10;
          return secounds;
        });
      }, 10000);
      // return () => clearInterval(interval);
    }
  }, []);

  React.useEffect(() => {
    set_updated_by_not_older_than(not_older_than);
  }, [not_older_than]);

  return (
    <StyledDiv>
      <Head>
        <script
          crossOrigin="anonymous"
          type="text/javascript"
          src="/jsroot-5.8.0/scripts/JSRootCore.js?2d&hist&more2d"
        ></script>
      </Head>
      <StyledLayout>
        <StyledHeader>
          <Tooltip title="Back to main page" placement="bottomLeft">
            <StyledLogoDiv>
              <StyledLogoWrapper onClick={() => backToMainPage()}>
                <StyledLogo src="/images/CMSlogo_white_red_nolabel_1024_May2014.png" />
              </StyledLogoWrapper>
            </StyledLogoDiv>
          </Tooltip>
          {
            //if all full set is selected: dataset name and run number, then regular search field is not visible.
            //Instead, run and dataset browser is is displayed.
            //Regular search fields are displayed just in the main page.
            isDatasetAndRunNumberSelected ? (
              <>
                <RunInfo query={query} />
                <ComposedSearch />
              </>
            ) : (
              <>
                <Nav
                  initial_search_run_number={query.search_run_number}
                  initial_search_dataset_name={query.search_dataset_name}
                  handler={navigationHandler}
                  type="top"
                />
              </>
            )
          }
        </StyledHeader>
        {query.run_number && query.dataset_name ? (
          // If a user already has a run_number and dataset_name, he is not searching nor is he in the homepage, he is
          <DiplayFolders
            run_number={query.run_number}
            dataset_name={query.dataset_name}
            folder_path={query.folder_path || ''}
          />
        ) : searching ? (
          <SearchResults
            isLoading={isLoading}
            results_grouped={results_grouped}
            handler={serchResultsHandler}
            errors={errors}
          />
        ) : functions_config.new_back_end.latest_runs ? (
          <LatestRuns />
        ) : (
          <NotFoundDivWrapper>
            <NotFoundDiv noBorder>
              <ChartIcon />
              Welcome to DQM GUI
            </NotFoundDiv>
          </NotFoundDivWrapper>
        )}
      </StyledLayout>
    </StyledDiv>
  );
};

export default Index;
