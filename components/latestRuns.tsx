import * as React from 'react';

import { useRequest } from '../hooks/useRequest';
import { get_the_latest_runs } from '../config/config';
import { changeRouter } from '../containers/display/utils';
import {
  SpinnerWrapper,
  Spinner,
  StyledCol,
  RunWrapper,
  StyledA,
  LatestRunsWrapper,
  LatestRunsTtitle,
  LatestRunsSection,
  StyledAlert,
} from '../containers/search/styledComponents';
import { NoResultsFound } from '../containers/search/noResultsFound';
import { store } from '../contexts/leftSideContext';
import { useNewer } from '../hooks/useNewer';
import { functions_config } from '../config/config';
import { useBlinkOnUpdate } from '../hooks/useBlinkOnUpdate';

export const LatestRuns = () => {
  const { updated_by_not_older_than } = React.useContext(store);
  const data_get_by_mounted = useRequest(get_the_latest_runs(), {}, []);
  const data_get_by_not_older_than_update = useRequest(
    get_the_latest_runs(),
    {},
    [updated_by_not_older_than]
  );

  const { blink } = useBlinkOnUpdate()

  const data = useNewer(
    data_get_by_mounted.data,
    data_get_by_not_older_than_update.data
  );
  const errors = useNewer(
    data_get_by_mounted.errors,
    data_get_by_not_older_than_update.errors
  );
  const isLoading = data_get_by_mounted.isLoading;
  const latest_runs = data && data.runs;

  return (
    <>
      {!isLoading && errors.length > 0 ? (
        errors.map((error: string) => (
          <StyledAlert key={error} message={error} type="error" showIcon />
        ))
      ) : (
        <LatestRunsSection>
          <LatestRunsTtitle>The latest runs</LatestRunsTtitle>
          {isLoading ? (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          ) : latest_runs &&
            latest_runs.length === 0 &&
            !isLoading &&
            errors.length === 0 ? (
            <NoResultsFound />
          ) : (
            <LatestRunsWrapper>
              {latest_runs &&
                latest_runs.map((run: number) => (
                  <StyledCol key={run.toString()}>
                    <RunWrapper
                      isLoading={blink.toString()}
                      animation={(
                        functions_config.mode === 'ONLINE'
                      ).toString()}
                      hover="true"
                      onClick={() => changeRouter({ search_run_number: run })}
                    >
                      <StyledA>{run}</StyledA>
                    </RunWrapper>
                  </StyledCol>
                ))}
            </LatestRunsWrapper>
          )}
        </LatestRunsSection>
      )}
    </>
  );
};
