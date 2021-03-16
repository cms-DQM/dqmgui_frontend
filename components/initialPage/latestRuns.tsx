import * as React from 'react';

import { useRequest } from '../../hooks/useRequest';
import {
  SpinnerWrapper,
  Spinner,
  LatestRunsTtitle,
  LatestRunsSection,
  StyledAlert,
} from '../../containers/search/styledComponents';
import { NoResultsFound } from '../../containers/search/noResultsFound';
import { functions_config } from '../../config/config';
import { LiveModeButton } from '../liveModeButton';
import { CustomDiv } from '../styledComponents';
import { LatestRunsList } from './latestRunsList';
import { makeid } from '../utils';
import { store } from '../../contexts/updateContext';
import { chooseApiForGettingTheLatestRuns } from '../../api/utils';

export const LatestRuns = () => {
  const {not_older_than, addLoader } = React.useContext(store)
  const [id, setId] = React.useState<string>()
  
  const {data, errors, isLoading} = useRequest(
    chooseApiForGettingTheLatestRuns(not_older_than),
    {},
    [not_older_than]
  );

  const latest_runs = data && data.runs.sort((a: number, b: number) => a - b);

  React.useEffect(() => {
    const id_ = makeid()
    setId(id_)
  }, [])

  React.useEffect(() => {
    addLoader({ value: isLoading, id })
  }, [isLoading])

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
                        not_older_than={not_older_than}
                      />
                    )
                  )}
            </LatestRunsSection>
          )}
    </>
  );
};
