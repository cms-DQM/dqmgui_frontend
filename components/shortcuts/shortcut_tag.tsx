import * as React from 'react';
import { Tooltip, Col } from 'antd';

import { QueryProps } from '../../containers/display/interfaces';
import { StyledTag } from '../../containers/search/styledComponents';
import { is_run_selected_already, changeRouter, getChangedQueryParams } from '../../containers/display/utils';
import { theme } from '../../styles/theme';
import { CustomCol, CustomRow, StyledSecondaryButton } from '../styledComponents';
import { SetRunsToShortcutModal } from './modal';

interface Shortcut_tags_props {
  query: QueryProps;
}

export const Shortucts = ({ query }: Shortcut_tags_props) => {
  const [openAddRunsToShortcut, toggleAddRunsToShortcut] = React.useState(false);

  const current_run = { run_number: query.run_number, dataset_name: query.dataset_name, id: '1' }
  //@ts-ignore
  const old_selected_runs_for_shurtcut = JSON.parse(localStorage.getItem('shortcuts')) || [current_run];
  const [runs_in_shortcut, set_runs_in_shortcut] = React.useState(old_selected_runs_for_shurtcut)

  const deleteFromShortcuts = (id: string) => {
    const copy = [...runs_in_shortcut]
    const filtered = copy.filter((run: any) => run.id !== id)
    set_runs_in_shortcut(filtered)
  }

  return (
    <CustomRow width="100%" justifycontent="space-between">
      <SetRunsToShortcutModal
        runs_in_shortcut={runs_in_shortcut}
        set_runs_in_shortcut={set_runs_in_shortcut}
        openAddRunsToShortcut={openAddRunsToShortcut}
        toggleAddRunsToShortcut={toggleAddRunsToShortcut}
      />
      <CustomCol display='flex'>
        {runs_in_shortcut.map((run: any) => (
          <CustomCol width='fit-content' space={'1'}>
            <Tooltip placement="topLeft" title={run.dataset_name}>
              <StyledTag
                closable={is_run_selected_already(run, query) ? false : true}
                onClose={() => deleteFromShortcuts(run.id)}
                background={is_run_selected_already(run, query) ? theme.colors.secondary.main : theme.colors.primary.main}
                color={theme.colors.common.white}
                onClick={() => {
                  changeRouter(
                    getChangedQueryParams(
                      {
                        dataset_name: run.dataset_name,
                        run_number: run.run_number,
                      },
                      query
                    )
                  );
                }}>
                {run.run_number}
              </StyledTag>
            </Tooltip>
          </CustomCol>
        ))}
      </CustomCol>
      <Col>
        <StyledSecondaryButton
          onClick={() => toggleAddRunsToShortcut(true)}>
          Add run
        </StyledSecondaryButton>
      </Col>
    </CustomRow >
  )
}