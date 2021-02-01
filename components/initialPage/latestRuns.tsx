import * as React from 'react';

import { useRequest } from '../../hooks/useRequest';
import { get_the_latest_runs } from '../../config/config';
import {
  SpinnerWrapper,
  Spinner,
  LatestRunsTtitle,
  LatestRunsSection,
  StyledAlert,
} from '../../containers/search/styledComponents';
import { NoResultsFound } from '../../containers/search/noResultsFound';
import { store } from '../../contexts/leftSideContext';
import { useNewer } from '../../hooks/useNewer';
import { functions_config } from '../../config/config';
import { LiveModeButton } from '../liveModeButton';
import { CustomDiv } from '../styledComponents';
import { LatestRunsList } from './latestRunsList';

export const LatestRuns = () => {
  const { updated_by_not_older_than } = React.useContext(store);

  const data_get_by_mount = useRequest(
    get_the_latest_runs(updated_by_not_older_than),
    {},
    []
  );

  const data_get_by_not_older_than_update = useRequest(
    get_the_latest_runs(updated_by_not_older_than),
    {},
    [updated_by_not_older_than]
  );

  const data = useNewer(
    data_get_by_mount.data,
    data_get_by_not_older_than_update.data
  );
  const errors = useNewer(
    data_get_by_mount.errors,
    data_get_by_not_older_than_update.errors
  );
  const isLoading = data_get_by_mount.isLoading;
  const latest_runs = data && data.runs.sort((a: number, b: number) => a - b);

  return (
    <>
      {!isLoading && errors.length > 0 ? (
        errors.map((error: string) => (
          <StyledAlert key={error} message={error} type="error" showIcon />
        ))
      ) : isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <LatestRunsSection>
          <CustomDiv display="flex" justifycontent="flex-end" width="auto">
            <LiveModeButton />
          </CustomDiv>
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
            latest_runs && (
              <LatestRunsList
                latest_runs={latest_runs}
                mode={functions_config.mode}
              />
            )
          )}
        </LatestRunsSection>
      )}
    </>
  );
};
