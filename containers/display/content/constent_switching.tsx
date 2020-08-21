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
import { store } from '../../../contexts/leftSideContext';
import { LatestRuns } from '../../../components/latestRuns';

export const ContentSwitching = () => {
  const { set_updated_by_not_older_than } = React.useContext(store);
  const current_time = new Date().getTime();
  const [not_older_than, set_not_older_than] = React.useState(current_time);

  //content update if mode is ONLINE
  React.useEffect(() => {
    if (functions_config.mode === 'ONLINE' && errors.length === 0) {
      const interval = setInterval(() => {
        set_not_older_than(() => {
          // 1 sec is 1000 milisec. we dividing by 10000 and multiply by 10, because we need to
          // have rounded sec. for exmaple: if it is 13, we need to have 10, or 26, we need to have 20 and etc.
          const seconds = Math.round(new Date().getTime() / 10000) * 10;
          return seconds;
        });
      }, 10000);
    }
  }, []);

  React.useEffect(() => {
    set_updated_by_not_older_than(not_older_than);
  }, [not_older_than]);

  const router = useRouter();
  const query: QueryProps = router.query;

  const { results_grouped, searching, isLoading, errors } = useSearch(
    query.search_run_number,
    query.search_dataset_name
  );

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
