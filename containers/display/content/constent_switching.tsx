import * as React from 'react';
import { useRouter } from 'next/router';

import { QueryProps } from '../interfaces';
import FoldersAndPlots from './folders_and_plots_content';
import { useSearch } from '../../../hooks/useSearch';
import SearchResults from '../../search/SearchResults';
import {
  NotFoundDivWrapper,
  ChartIcon,
  NotFoundDiv,
} from '../../search/styledComponents';
import { seperateRunAndLumiInSearch } from '../../../components/utils';
import { changeRouter, getChangedQueryParams } from '../utils';
import { workspaces } from '../../../workspaces/offline';
import { functions_config } from '../../../config/config';
import { LatestRuns } from '../../../components/latestRuns';
import { useUpdateLiveMode } from '../../../hooks/useUpdateInLiveMode';

export const ContentSwitching = () => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const { results_grouped, searching, isLoading, errors } = useSearch(
    query.search_run_number,
    query.search_dataset_name
  );
  useUpdateLiveMode();

  //serchResultsHandler when you selecting run, dataset from search results
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

  if (query.dataset_name && query.run_number) {
    return (
      <FoldersAndPlots
        run_number={query.run_number || ''}
        dataset_name={query.dataset_name || ''}
        folder_path={query.folder_path || ''}
      />
    );
  } else if (searching) {
    return (
      <SearchResults
        isLoading={isLoading}
        results_grouped={results_grouped}
        handler={serchResultsHandler}
        errors={errors}
      />
    );
  } else if (functions_config.new_back_end.latest_runs) {
    return <LatestRuns />;
  }
  return (
    <NotFoundDivWrapper>
      <NotFoundDiv noBorder>
        <ChartIcon />
        Welcome to DQM GUI
      </NotFoundDiv>
    </NotFoundDivWrapper>
  );
};
