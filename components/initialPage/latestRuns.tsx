import * as React from 'react';
import { pathOr } from 'ramda'
import { useRequest } from '../../hooks/useRequest';
import { get_the_latest_runs, get_the_latest_runs_live_mode } from '../../api/newApi';
import {
  SpinnerWrapper,
  Spinner,
  LatestRunsTtitle,
  LatestRunsSection,
  StyledAlert,
} from '../../containers/search/styledComponents';
import { NoResultsFound } from '../../containers/search/noResultsFound';
import { useNewer } from '../../hooks/useNewer';
import { functions_config } from '../../config/config';
import { LiveModeButton } from '../liveModeButton';
import { CustomDiv } from '../styledComponents';
import { LatestRunsList } from './latestRunsList';
import { makeid } from '../utils';
import { store } from '../../contexts/updateContext';

export const LatestRuns = () => {
  const { not_older_than, addLoader } = React.useContext(store)
  const [id, setId] = React.useState<string>()

  const data_get_by_mount = useRequest(
    get_the_latest_runs(),
    {},
    []
  );

  const data_get_by_not_older_than_update = useRequest(
    get_the_latest_runs_live_mode(not_older_than),
    {},
    [not_older_than]
  );

  const data = useNewer(
    data_get_by_mount.data,
    data_get_by_not_older_than_update.data
  );

  const errors = useNewer(
    data_get_by_mount.errors,
    data_get_by_not_older_than_update.errors
  );

  const loader = useNewer(
    data_get_by_mount.isLoading,
    data_get_by_not_older_than_update.isLoading
  );

  const isLoading = data_get_by_mount.isLoading;
  const latest_runs = pathOr([], ['runs'], data)
  const latest_runs_sorted = latest_runs.sort((a: number, b: number) => b - a);

  React.useEffect(() => {
    const id_ = makeid()
    setId(id_)
  }, [])

  React.useEffect(() => {
    addLoader({ value: loader, id })
  }, [loader])

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
            {functions_config.mode === 'ONLINE' &&
              <LiveModeButton />
            }
          </CustomDiv>
          <LatestRunsTtitle>The latest runs</LatestRunsTtitle>
          {isLoading ? (
            <SpinnerWrapper>
              <Spinner />
            </SpinnerWrapper>
          ) : latest_runs_sorted.length === 0 &&
            !isLoading &&
            errors.length === 0 ? (
            <NoResultsFound />
          ) : (
            latest_runs && (
              <LatestRunsList
                latest_runs={latest_runs_sorted}
                mode={functions_config.mode}
                not_older_than={not_older_than}
              />
            )
          )}
        </LatestRunsSection>
      )}
    </>
  );
};