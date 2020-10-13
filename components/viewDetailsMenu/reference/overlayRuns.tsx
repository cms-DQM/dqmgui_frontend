import React, { useContext, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Tooltip } from 'antd';

import {
  TripleProps,
  QueryProps,
} from '../../../containers/display/interfaces';
import {
  StyledSecondaryButton,
  CustomCol,
  CustomDiv,
} from '../../styledComponents';
import { getDisabledButtonTitle } from '../utils';
import { store } from '../../../contexts/leftSideContext';
import { SetRunsModal } from './setRunsModal';
import { TableOfSelectedRunForOverlay } from './tableOfSelectedRunForOverlay';
import { change_run_details } from './overlaidRunsActions/changeRunDetails';
import { remove_runs_from_a_lst } from './overlaidRunsActions/removeRunFromAList';

interface OverlayRunsProps {
  overlaid_runs: TripleProps[];
  query: QueryProps;
}

export const OverlayRuns = ({ overlaid_runs, query }: OverlayRunsProps) => {
  const globalState = useContext(store);
  const {
    runs_set_for_overlay,
    set_runs_set_for_overlay,
    setTriples,
    triples,
  } = globalState;

  const [open, toggleModal] = useState(false);

  return (
    <CustomDiv style={{ overflowX: 'auto' }}>
      <SetRunsModal
        open={open}
        toggleModal={toggleModal}
        overlaid_runs={overlaid_runs}
        setTriples={setTriples}
        triples={triples}
        set_runs_set_for_overlay={set_runs_set_for_overlay}
      />
      <TableOfSelectedRunForOverlay
        triples={triples}
        query={query}
        change_run_details={(triples: TripleProps[]) => change_run_details(triples)(setTriples, query)}
        setTriples={setTriples}
        remove_runs_to_set_runs_for_overlay={(id: string) => remove_runs_from_a_lst(id)(triples, setTriples, query)}
      />
      <Row justify="space-between" style={{ height: 48, padding: 8 }}>
        <CustomDiv position="fixed" display="flex">
          <CustomCol space="2">
            <Tooltip
              title={getDisabledButtonTitle(
                overlaid_runs.length >= 4 || runs_set_for_overlay.length >= 4
              )}
            >
              <StyledSecondaryButton
                disabled={
                  overlaid_runs.length >= 4 || runs_set_for_overlay.length >= 4
                }
                onClick={() => {
                  toggleModal(true);
                }}
                icon={<PlusOutlined />}
              >
                SET RUNS
              </StyledSecondaryButton>
            </Tooltip>
          </CustomCol>
        </CustomDiv>
      </Row>
    </CustomDiv>
  );
};
