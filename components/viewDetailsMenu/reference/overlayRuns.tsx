import React, { useContext, useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox, Row } from 'antd';
import { addOverlayData } from '../../plots/plot/singlePlot/utils';

import {
  TripleProps,
  QueryProps,
} from '../../../containers/display/interfaces';
import {
  FieldsWrapper,
  StyledSecondaryButton,
  StyledButton,
  CustomCol,
  CustomDiv,
} from '../../styledComponents';
import { Field } from './field';
import { filter_plots, filter_valid_runs, changeRunsForOverlayPropsValues } from '../utils';
import { store } from '../../../contexts/leftSideContext';
import {
  changeRouter,
  getChangedQueryParams,
} from '../../../containers/display/utils';
import { RunBrowser } from '../../browsing/runsBrowser';
import { DatasetsBrowser } from '../../browsing/datasetsBrowsing/datasetsBrowser';
import { SetRunsModal } from './setRunsModal';

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
    setOverlay,
    overlayPosition,
    change_value_in_reference_table,
    addRun,
    toggleOverlayDataMenu,
    removeRun,
  } = globalState;

  const [open, toggleModal] = useState(false)
  const [runs_set_for_overlay, set_runs_set_for_overlay] = React.useState<TripleProps[]>([...overlaid_runs])

  const add_runs_to_set_runs_for_overlay = (runs: TripleProps[]) => {
    const copy = [...runs_set_for_overlay]
    runs.forEach((run: TripleProps) => {
      copy.push(run)
    })
    set_runs_set_for_overlay(runs)
  }

  const remove_runs_to_set_runs_for_overlay = (id: string) => {
    const copy = [...runs_set_for_overlay]
    const filtered = copy.filter(run => run.id !== id)
    set_runs_set_for_overlay(filtered)
  }

  return (
    <CustomDiv>
      <SetRunsModal
        open={open}
        toggleModal={toggleModal}
        overlaid_runs={overlaid_runs}
        add_runs_to_set_runs_for_overlay={add_runs_to_set_runs_for_overlay}
        runs_set_for_overlay={runs_set_for_overlay}
        set_runs_set_for_overlay={set_runs_set_for_overlay}
      />
      <Row justify="space-between">
        {runs_set_for_overlay.map((overlaid_run: TripleProps) => (
          <FieldsWrapper key={overlaid_run.id.toString()}>
            <CustomCol space="2">
              <Checkbox
                checked={overlaid_run.checked as boolean}
                onChange={(e: any) => {
                  changeRunsForOverlayPropsValues(
                    overlaid_run.cheked ? overlaid_run.cheked : e.target.checked,
                    'checked',
                    overlaid_run.id,
                    runs_set_for_overlay,
                    set_runs_set_for_overlay
                  );
                }}
              />
            </CustomCol>
            <CustomCol space="2">
              <RunBrowser
                currentRunNumber={overlaid_run.run_number as string}
                currentDataset={overlaid_run.dataset_name as string}
                query={query}
                setCurrentRunNumber={(run_number) => {
                  changeRunsForOverlayPropsValues(run_number, 'run_number', overlaid_run.id, runs_set_for_overlay,
                    set_runs_set_for_overlay)
                }}
                withoutArrows={true}
              />
            </CustomCol>
            <CustomCol space="2">
              <DatasetsBrowser
                currentRunNumber={overlaid_run.run_number as string}
                currentDataset={overlaid_run.dataset_name as string}
                query={query}
                setCurrentDataset={(dataset_name) => {
                  changeRunsForOverlayPropsValues(dataset_name, 'dataset_name', overlaid_run.id, runs_set_for_overlay,
                    set_runs_set_for_overlay)
                }}
                withoutArrows={true}
              />
            </CustomCol>
            <CustomCol space="2">
              <StyledSecondaryButton
                onClick={() => {
                  toggleOverlayDataMenu(true);
                  setTriple(overlaid_run);
                }}
              >
                Change
             </StyledSecondaryButton>
            </CustomCol>
            <CustomCol space="2">
              <Field
                change_value_in_reference_table={
                  change_value_in_reference_table
                }
                removeRun={removeRun}
                id={overlaid_run.id}
                field_name="label"
                placeholder="label"
                defaultValue={overlaid_run.label as string}
                value={overlaid_run.label}
              />
            </CustomCol>
            <CustomCol space="2">
              <StyledSecondaryButton
                onClick={async () => {
                  await remove_runs_to_set_runs_for_overlay(overlaid_run.id)
                  const filteredPlots = filter_plots(runs_set_for_overlay, overlaid_run.id);
                  addRun(runs_set_for_overlay)
                  setOverlay(filteredPlots);
                }}
                icon={<MinusOutlined />}
              ></StyledSecondaryButton>
            </CustomCol>
          </FieldsWrapper>
        ))}
      </Row>
      <Row justify="space-between">
        <CustomCol space="2">
          <StyledButton
            htmlType="submit"
            onClick={() => {
              const filtered: TripleProps[] = filter_valid_runs(runs_set_for_overlay);
              changeRouter(
                getChangedQueryParams(
                  {
                    overlay: overlayPosition,
                    overlay_data: `${addOverlayData(filtered)}`,
                  },
                  query
                )
              );
            }}
          >
            <a>Submit</a>
          </StyledButton>
        </CustomCol>
        <CustomCol space="2">
          <StyledSecondaryButton
            disabled={overlaid_runs.length >= 4}
            onClick={() => {
              toggleModal(true)
            }}
            icon={<PlusOutlined />}>
            SET RUNS
          </StyledSecondaryButton>
        </CustomCol>
      </Row>
    </CustomDiv>
  );
};
