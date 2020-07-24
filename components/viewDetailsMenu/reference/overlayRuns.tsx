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
import {
  getDisabledButtonTitle,
} from '../utils';
import { store } from '../../../contexts/leftSideContext';
import { SetRunsModal } from './setRunsModal';
import { TableOfSelectedRunForOverlay } from './tableOfSelectedRunForOverlay';

interface OverlayRunsProps {
  overlaid_runs: TripleProps[];
  query: QueryProps;
  setSelectedTriple(overlaid_run: TripleProps): void;
}

export const OverlayRuns = ({
  overlaid_runs,
  query,
  setSelectedTriple,
}: OverlayRunsProps) => {
  const globalState = useContext(store);
  const {
    toggleOverlayDataMenu,
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
        setTriples={setTriples}
        toggleOverlayDataMenu={toggleOverlayDataMenu}
        setSelectedTriple={setSelectedTriple}
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
