import * as React from 'react';

import { useRequest } from '../hooks/useRequest';
import { get_the_latest_runs } from '../config/config';
import { changeRouter } from '../containers/display/utils';
import { SpinnerWrapper, Spinner, StyledCol, RunWrapper, StyledA, LatestRunsWrapper, LatestRunsTtitle, LatestRunsSection } from '../containers/search/styledComponents';
import { NoResultsFound } from '../containers/search/noResultsFound';

export const LatestRuns = () => {
  const { data, isLoading, errors } = useRequest(get_the_latest_runs())
  const latest_runs = data ? data.runs : []
  return (
    <LatestRunsSection>
      <LatestRunsTtitle>The latest runs</LatestRunsTtitle>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) :
        latest_runs.length === 0 && !isLoading && errors.length === 0 ? (
          <NoResultsFound />) : (
            <LatestRunsWrapper>
              {latest_runs.map((run: number) => (
                <StyledCol key={run.toString()}>
                  <RunWrapper
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