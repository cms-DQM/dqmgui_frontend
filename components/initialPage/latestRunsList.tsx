import { useRouter } from 'next/router';
import * as React from 'react';
import { changeRouter } from '../../containers/display/utils';
import {
  LatestRunsWrapper,
  RunWrapper,
  StyledA,
  StyledCol,
} from '../../containers/search/styledComponents';
import { useUpdateLiveMode } from '../../hooks/useUpdateInLiveMode';

interface LatestRunsListProps {
  latest_runs: number[];
  mode: string;
}

export const LatestRunsList = ({ latest_runs, ...props }: LatestRunsListProps) => {
  const router = useRouter()
  const {
    query: { mode },
  } = router
  
  const { set_update, blink } = useUpdateLiveMode();
  React.useEffect(() => {
    set_update(true);
    return () => set_update(false);
  }, []);

  return (
    <LatestRunsWrapper>
      {latest_runs.map((run: number) => (
        <StyledCol key={run.toString()}>
          <RunWrapper
            isLoading={blink.toString()}
            animation={(props.mode === 'ONLINE').toString()}
            hover="true"
            onClick={() => {
              set_update(false);
              changeRouter({ search_run_number: run, mode });
            }}
          >
            <StyledA>{run}</StyledA>
          </RunWrapper>
        </StyledCol>
      ))}
    </LatestRunsWrapper>
  );
};
