import * as React from 'react'
import { changeRouter } from '../../containers/display/utils';
import { LatestRunsWrapper, RunWrapper, StyledA, StyledCol } from '../../containers/search/styledComponents';
import { useBlinkOnUpdate } from '../../hooks/useBlinkOnUpdate';
import { useUpdateLiveMode } from '../../hooks/useUpdateInLiveMode';

interface LatestRunsListProps {
  latest_runs: number[];
  mode: string;
}

export const LatestRunsList = ({ latest_runs, mode }: LatestRunsListProps) => {
  const { blink } = useBlinkOnUpdate();

  const { set_update } = useUpdateLiveMode();
  React.useEffect(() => {
    set_update(true);
  }, []);

  return (
    <LatestRunsWrapper>
      {latest_runs.map((run: number) => (
          <StyledCol key={run.toString()}>
            <RunWrapper
              isLoading={blink.toString()}
              animation={(
                mode === 'ONLINE'
              ).toString()}
              hover="true"
              onClick={() => {
                set_update(false);
                changeRouter({ search_run_number: run });
              }}
            >
              <StyledA>{run}</StyledA>
            </RunWrapper>
          </StyledCol>
        ))}
    </LatestRunsWrapper>
  )
}