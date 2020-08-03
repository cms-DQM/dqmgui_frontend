import * as React from 'react';

import { useRequest } from '../hooks/useRequest';
import { get_the_latest_runs } from '../config/config';
import { changeRouter } from '../containers/display/utils';
import { SpinnerWrapper, Spinner, StyledCol, RunWrapper, StyledA, LatestRunsWrapper, LatestRunsTtitle, LatestRunsSection } from '../containers/search/styledComponents';
import { NoResultsFound } from '../containers/search/noResultsFound';
import { store } from '../contexts/leftSideContext';
import { useNewer } from '../hooks/useNewer';

export const LatestRuns = () => {
  const { updated_by_not_older_than } = React.useContext(store);
  const data_get_by_mounted = useRequest(get_the_latest_runs(), {}, [])
  const data_get_by_not_older_than_update = useRequest(get_the_latest_runs(), {}, [updated_by_not_older_than])

  const [blink, set_blink] = React.useState(updated_by_not_older_than)
  React.useEffect(() => {
    //timeouts in order to get longer and more visible animation
    setTimeout(() => { set_blink(true) }, 0)
    setTimeout(() => { set_blink(false) }, 2000)
  }, [updated_by_not_older_than])

  const data = useNewer(data_get_by_mounted.data, updated_by_not_older_than.data)
  const errors = useNewer(data_get_by_mounted.errors, updated_by_not_older_than.errors)
  const isLoading = data_get_by_mounted.isLoading
  const latest_runs = data ? data.runs : []

  return (
    <LatestRunsSection>
      <LatestRunsTtitle>The latest runs</LatestRunsTtitle>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) :
        latest_runs && latest_runs.length === 0 && !isLoading && errors.length === 0 ? (
          <NoResultsFound />) : (
            <LatestRunsWrapper>
              {latest_runs.map((run: number) => (
                <StyledCol key={run.toString()}>
                  <RunWrapper
                    isLoading={blink.toString()}
                    hover="true"
                    onClick={() =>
                      changeRouter(
                        { search_run_number: run })}>
                    <StyledA>{run}</StyledA>
                  </RunWrapper>
                </StyledCol>
              ))}
            </LatestRunsWrapper>
          )}
    </LatestRunsSection>
  )
}