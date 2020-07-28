import * as React from 'react';
import { Tooltip, Col, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { QueryProps } from '../../containers/display/interfaces';
import { StyledTag } from '../../containers/search/styledComponents';
import { is_run_selected_already, changeRouter, getChangedQueryParams } from '../../containers/display/utils';
import { theme } from '../../styles/theme';
import { CustomCol, CustomRow, StyledSecondaryButton, CustomDiv } from '../styledComponents';
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
  React.useEffect(() => {
    localStorage.setItem("shortcuts", JSON.stringify(runs_in_shortcut))
  }, [runs_in_shortcut])

  React.useEffect(() => {
    localStorage.setItem("shortcuts", JSON.stringify([current_run]))
  }, [])

  React.useEffect(() => {
    const copy = [...runs_in_shortcut]
    const current_run_index = copy.indexOf(copy.find((run: { run_number: string, dataset_name: string, id: string }) => is_run_selected_already(run, query)))
    //when you're changing current run using browsers, current tag info(run number and dataset name) also must be changed
    copy[current_run_index].run_number = query.run_number
    copy[current_run_index].dataset_name = query.dataset_name
    set_runs_in_shortcut(copy)
    return () => (localStorage.setItem("shortcuts", JSON.stringify([]))
    )
  }, [query.run_number, query.dataset_name])

  return (
    <CustomRow width="100%" justifycontent="space-between"
      style={{
        display: "grid",
        justifyContent: "space-between",
        gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
      }}
    >
      <SetRunsToShortcutModal
        runs_in_shortcut={runs_in_shortcut}
        set_runs_in_shortcut={set_runs_in_shortcut}
        openAddRunsToShortcut={openAddRunsToShortcut}
        toggleAddRunsToShortcut={toggleAddRunsToShortcut}
      />
      <CustomCol
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
          gridGap: "8px",
          width: 'fit-content'
        }}
      >
        {runs_in_shortcut.map((run: any) => (
          <CustomCol width='fit-content' space={'1'}
            style={{
              justifySelf: "center"
            }}
          >
            <Tooltip placement="topLeft" title={run.dataset_name}>
              <CustomDiv
                borderradius="12px"
                space="1"
                display="flex"
                justifycontent="center"
                alignitems="center"
                fontsize="0.8rem"
                pointer="true"
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
                }}
              >
                <CustomDiv>
                  {run.run_number}
                </CustomDiv>
                <Button
                  size="small"
                  type="link"

                  onClick={() => deleteFromShortcuts(run.id)}
                  icon={is_run_selected_already(run, query) ? '' : <CloseOutlined />} />
              </CustomDiv>
            </Tooltip>
          </CustomCol>
        ))}
      </CustomCol>
      <Col style={{ justifySelf: 'flex-end' }}>
        <StyledSecondaryButton
          onClick={() => toggleAddRunsToShortcut(true)}>
          Add run
        </StyledSecondaryButton>
      </Col>
    </CustomRow >
  )
}