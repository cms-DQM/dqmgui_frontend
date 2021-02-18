import { useRouter } from 'next/router';
import * as React from 'react';
import { changeRouter } from '../../containers/display/utils';
import {
  LatestRunsWrapper,
  RunWrapper,
  StyledA,
  StyledCol,
} from '../../containers/search/styledComponents';
import { store } from '../../contexts/leftSideContext';
import { useBlink } from '../../hooks/useBlink';

interface LatestRunsListProps {
  latest_runs: number[];
  mode: string;
}

export const LatestRunsList = ({ latest_runs, ...props }: LatestRunsListProps) => {
  const router = useRouter()
  const {
    query: { mode },
  } = router

  const { notOlderThan } = React.useContext(store)
  const { blink } = useBlink(notOlderThan);

  return (
    <LatestRunsWrapper>
      {latest_runs.map((run: number) => (
        <StyledCol key={run.toString()}>
          <RunWrapper
            isLoading={blink.toString()}
            animation={(props.mode === 'ONLINE').toString()}
            hover="true"
            onClick={() => {
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
