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
import {
  changeRouter,
  getChangedQueryParams,
} from '../../../containers/display/utils';
import { addOverlayData } from '../../plots/plot/singlePlot/utils';

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

  const change_run_details = async (runs: TripleProps[]) => {
    await changeRouter(
      getChangedQueryParams(
        {
          overlay_data: `${addOverlayData(runs)}`,
        },
        query
      )
    );
    setTriples(runs);
  };

  const remove_runs_to_set_runs_for_overlay = async (id: string) => {
    const copy = [...triples];
    const index = copy.findIndex((run) => {
      return run.id === id;
    });

    if (index !== -1) {
      copy.splice(index, 1);
      changeRouter(
        getChangedQueryParams(
          {
            overlay_data: `${addOverlayData(copy)}`,
          },
          query
        )
      );
      setTriples(copy);
    }
  };

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
        change_run_details={change_run_details}
        setTriples={setTriples}
        remove_runs_to_set_runs_for_overlay={
          remove_runs_to_set_runs_for_overlay
        }
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
