import React, { useContext, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox, Row, Tooltip } from 'antd';

import {
  TripleProps,
  QueryProps,
} from '../../../containers/display/interfaces';
import {
  StyledSecondaryButton,
  CustomCol,
  CustomDiv,
  CustomTd,
} from '../../styledComponents';
import { Field } from './field';
import {
  changeRunsForOverlayPropsValues,
  getDisabledButtonTitle,
} from '../utils';
import { store } from '../../../contexts/leftSideContext';
import { RunBrowser } from '../../browsing/runsBrowser';
import { DatasetsBrowser } from '../../browsing/datasetsBrowsing/datasetsBrowser';
import { SetRunsModal } from './setRunsModal';
import { changeRouter, getChangedQueryParams } from '../../../containers/display/utils';
import { addOverlayData } from '../../plots/plot/singlePlot/utils';

interface OverlayRunsProps {
  overlaid_runs: TripleProps[];
  query: QueryProps;
  setTriple(overlaid_run: TripleProps): void;
}

export const OverlayRuns = ({
  overlaid_runs,
  query,
  setTriple,
}: OverlayRunsProps) => {

  const globalState = useContext(store);
  const {
    toggleOverlayDataMenu,
    removeRun,
    runs_set_for_overlay,
    set_runs_set_for_overlay,
    addRun,
    triples
  } = globalState;

  const [open, toggleModal] = useState(false);

  const remove_runs_to_set_runs_for_overlay = (id: string) => {
    const copy = [...triples];
    const filtered = copy.filter((run) => run.id !== id);
    console.log(filtered)
    changeRunThoughBrowsers(filtered)
  };

  const changeRunThoughBrowsers = async (run: any) => {
    await changeRouter(
      getChangedQueryParams(
        {
          overlay_data: `${addOverlayData(run)}`,
        },
        query
      )
    );
    addRun(run)
  }

  return (
    <CustomDiv style={{ overflowX: 'auto' }}>
      <SetRunsModal
        open={open}
        toggleModal={toggleModal}
        overlaid_runs={overlaid_runs}
        addRun={addRun}
        triples={triples}
        set_runs_set_for_overlay={set_runs_set_for_overlay}
      />
      <table>
        {triples.map(
          (overlaid_run: TripleProps, index: number) => (
            <tr>
              <CustomTd spacing={'4'}>
                <Checkbox
                  checked={overlaid_run.checked as boolean}
                  onChange={(e: any) => {
                    changeRunsForOverlayPropsValues(
                      overlaid_run.cheked
                        ? overlaid_run.cheked
                        : e.target.checked,
                      'checked',
                      overlaid_run.id,
                      triples,
                      changeRunThoughBrowsers
                    );
                  }}
                />
              </CustomTd>
              <CustomTd spacing={'4'}>{index + 1}.</CustomTd>
              <CustomTd spacing={'4'}>
                <RunBrowser
                  currentRunNumber={overlaid_run.run_number as string}
                  currentDataset={overlaid_run.dataset_name as string}
                  query={query}
                  withoutLabel={true}
                  setCurrentRunNumber={(run_number) => {
                    changeRunsForOverlayPropsValues(
                      run_number,
                      'run_number',
                      overlaid_run.id,
                      triples,
                      changeRunThoughBrowsers
                    );
                  }}
                  withoutArrows={true}
                />
              </CustomTd>
              <CustomTd spacing={'4'}>
                <DatasetsBrowser
                  currentRunNumber={overlaid_run.run_number as string}
                  currentDataset={overlaid_run.dataset_name as string}
                  query={query}
                  selectorWidth={'100%'}
                  setCurrentDataset={(dataset_name) => {
                    changeRunsForOverlayPropsValues(
                      dataset_name,
                      'dataset_name',
                      overlaid_run.id,
                      triples,
                      changeRunThoughBrowsers
                    );
                  }}
                  withoutArrows={true}
                />
              </CustomTd>
              <CustomTd spacing={'4'}>
                <StyledSecondaryButton
                  onClick={() => {
                    toggleOverlayDataMenu(true);
                    setTriple(overlaid_run);
                  }}
                >
                  Change
                </StyledSecondaryButton>
              </CustomTd>
              <CustomTd spacing={'4'}>
                <Field
                  runs_set_for_overlay={triples}
                  set_interim_runs={changeRunThoughBrowsers}
                  removeRun={removeRun}
                  id={overlaid_run.id}
                  field_name="label"
                  placeholder="label"
                  defaultValue={overlaid_run.label as string}
                  value={overlaid_run.label}
                />
              </CustomTd>
              <CustomTd spacing={'4'}>
                <StyledSecondaryButton
                  onClick={() => {
                    remove_runs_to_set_runs_for_overlay(
                      overlaid_run.id as string
                    );
                  }}
                  icon={<MinusOutlined />}
                ></StyledSecondaryButton>
              </CustomTd>
            </tr>
          )
        )}
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
