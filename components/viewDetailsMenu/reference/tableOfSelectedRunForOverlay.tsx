import * as React from 'react';
import { MinusOutlined } from '@ant-design/icons';

import {
  TripleProps,
  QueryProps,
} from '../../../containers/display/interfaces';
import { CustomTd, StyledSecondaryButton } from '../../styledComponents';
import { Checkbox } from 'antd';
import { changeRunsForOverlayPropsValues } from '../utils';
import { RunBrowser } from '../../browsing/runsBrowser';
import { DatasetsBrowser } from '../../browsing/datasetsBrowsing/datasetsBrowser';
import { Field } from './field';

interface TableOfSelectedRunForOverlayProps {
  triples: TripleProps[];
  query: QueryProps;
  setTriples(triples: TripleProps[]): void;
  change_run_details(triples: TripleProps[]): void;
  remove_runs_to_set_runs_for_overlay(id:string): void;
}

export const TableOfSelectedRunForOverlay = ({
  triples,
  query,
  change_run_details,
  remove_runs_to_set_runs_for_overlay,
}: TableOfSelectedRunForOverlayProps) => {

  return (
    <table>
      {triples.map((overlaid_run: TripleProps, index: number) => {
        return (
          <tr>
            <CustomTd spacing={'4'}>
              <Checkbox
                checked={overlaid_run.checked as boolean}
                onChange={(e: any) => {
                  changeRunsForOverlayPropsValues(
                    overlaid_run.cheked ? overlaid_run.cheked : e.target.checked,
                    'checked',
                    overlaid_run.id,
                    triples,
                    change_run_details
                  );
                }}
              />
            </CustomTd>
            <CustomTd spacing={'4'}>{index + 1}.</CustomTd>
            <CustomTd spacing={'4'}>
              <RunBrowser
                query={query}
                withoutLabel={true}
                setCurrentRunNumber={(run_number) => {
                  changeRunsForOverlayPropsValues(
                    run_number,
                    'run_number',
                    overlaid_run.id,
                    triples,
                    //change_run_details changes overlay_data parameters: add, changes overlay runs
                    change_run_details
                  );
                }}
                current_run_number={overlaid_run.run_number as string}
                current_dataset_name={overlaid_run.dataset_name as string}
                withoutArrows={true}
              />
            </CustomTd>
            <CustomTd spacing={'4'}>
              <DatasetsBrowser
                query={query}
                selectorWidth={'100%'}
                setCurrentDataset={(dataset_name) => {
                  changeRunsForOverlayPropsValues(
                    dataset_name,
                    'dataset_name',
                    overlaid_run.id,
                    triples,
                    //change_run_details changes overlay_data parameters: add, changes overlay runs
                    change_run_details
                  );
                }}
                withoutArrows={true}
                current_dataset_name={overlaid_run.dataset_name as string}
                current_run_number={overlaid_run.run_number as string}
              />
            </CustomTd>
            <CustomTd spacing={'4'}>
              {/* <Field
                triples={triples}
                change_run_details={change_run_details}
                removeRun={remove_runs_to_set_runs_for_overlay}
                id={overlaid_run.id}
                field_name="label"
                placeholder="label"
                defaultValue={overlaid_run.label as string}
                value={overlaid_run.label}
              /> */}
            </CustomTd>
            <CustomTd spacing={'4'}>
              <StyledSecondaryButton
                onClick={() => {
                  remove_runs_to_set_runs_for_overlay(overlaid_run.id as string);
                }}
                icon={<MinusOutlined />}
              ></StyledSecondaryButton>
            </CustomTd>
          </tr>
        )
      })}
    </table>
  );
};