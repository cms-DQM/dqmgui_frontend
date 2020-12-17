import React, { useContext, useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Tooltip } from 'antd';

import {
  TripleProps,
  QueryProps,
} from '../../../../containers/display/interfaces';
import {
  StyledSecondaryButton,
  CustomCol,
  CustomDiv,
} from '../../../styledComponents';
import { getDisabledButtonTitle } from '../../utils';
import { store } from '../../../../contexts/leftSideContext';
import { SetRunsModal } from './setRunsModal';
import { TableOfSelectedRunForOverlay } from './tableOfSelectedRunForOverlay';


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
  } = globalState;

  const removeTriple = (triple: TripleProps) => {
    const copy = [...overlaid_runs]
    const index = overlaid_runs.findIndex((one_triple: TripleProps) =>
      one_triple.run_number === triple.run_number &&
      one_triple.dataset_name === triple.dataset_name)
    copy.splice(index, 1)
    setTriples(copy)
  }

  const changeTriple = (triple: TripleProps, value: string, key: string) => {
    const copy = [...overlaid_runs]
    const index = overlaid_runs.findIndex((one_triple: TripleProps) =>
      one_triple.run_number === triple.run_number &&
      one_triple.dataset_name === triple.dataset_name)
    copy[index][key] = value
    setTriples(copy)
  }
  const [open, toggleModal] = useState(false);
  return (
    <CustomDiv style={{ overflowX: 'auto' }}>
      <SetRunsModal
        open={open}
        toggleModal={toggleModal}
        overlaid_runs={overlaid_runs}
        setTriples={setTriples}
        set_runs_set_for_overlay={set_runs_set_for_overlay}
      />
      <table>
        {overlaid_runs.map((overlaid_run: TripleProps, index: number) => {
          return (
            <TableOfSelectedRunForOverlay
              overlaid_run={overlaid_run}
              changeTriple={changeTriple}
              index={index}
              triples={overlaid_runs}
              removeTriple={removeTriple} />)
        })}
      </table>
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
