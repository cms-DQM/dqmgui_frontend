import * as React from 'react';
import { Tooltip, Col, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { QueryProps } from '../../containers/display/interfaces';
import {
  is_run_selected_already,
  changeRouter,
  getChangedQueryParams,
} from '../../containers/display/utils';
import {
  CustomCol,
  CustomRow,
  StyledSecondaryButton,
  CustomDiv,
  ShortcutTagDiv,
} from '../styledComponents';
import { SetRunsToShortcutModal } from './modal';

interface Shortcut_tags_props {
  query: QueryProps;
}

export const Shortucts = ({ query }: Shortcut_tags_props) => {
  const [openAddRunsToShortcut, toggleAddRunsToShortcut] = React.useState(
    false
  );
  const [current_run, set_current_run] = React.useState({
    run_number: query.run_number,
    dataset_name: query.dataset_name,
    id: '1',
  });
  //@ts-ignore
  const old_selected_runs_for_shurtcut =
    //@ts-ignore
    JSON.parse(localStorage.getItem('shortcuts')) &&
    //@ts-ignore
    JSON.parse(localStorage.getItem('shortcuts')).length > 0
      ? //@ts-ignore
        JSON.parse(localStorage.getItem('shortcuts'))
      : [current_run];
  const [runs_in_shortcut, set_runs_in_shortcut] = React.useState(
    old_selected_runs_for_shurtcut
  );

  // //following which run is currently selected. When we are changing run number/dataset name through browsers, we wat to have the same run with dataset in
  // //currrenlty selected shortcut tag, i.e, when data in browsers are changed, the same data have to be in selected shortcut, because SELECTED SHORTCUT and BROWSERS reflects
  // //run which is currently displaid.
  const initial_index = runs_in_shortcut.indexOf(
    runs_in_shortcut.find(
      (run: { run_number: string; dataset_name: string; id: string }) =>
        is_run_selected_already(run, query)
    )
  );
  const [current_index, set_current_index] = React.useState(initial_index);

  const deleteFromShortcuts = (id: string) => {
    const copy = [...runs_in_shortcut];
    const filtered = copy.filter((run: any) => run.id !== id);
    set_runs_in_shortcut(filtered);
  };

  React.useEffect(() => {
    localStorage.setItem('shortcuts', JSON.stringify(runs_in_shortcut));
  }, [runs_in_shortcut]);

  // React.useEffect(() => {
  //   const copy = [...runs_in_shortcut];
  //   copy[current_index].run_number = query.run_number;
  //   copy[current_index].dataset_name = query.dataset_name;
  //   set_runs_in_shortcut(copy);
  // }, [query.dataset_name, query.run_number]);

  return (
    <CustomRow
      width="100%"
      justifycontent="space-between"
      gridtemplatecolumns="repeat(auto-fit, minmax(80px, 1fr))"
      display="grid"
    >
      <SetRunsToShortcutModal
        runs_in_shortcut={runs_in_shortcut}
        set_runs_in_shortcut={set_runs_in_shortcut}
        openAddRunsToShortcut={openAddRunsToShortcut}
        toggleAddRunsToShortcut={toggleAddRunsToShortcut}
      />
      <CustomCol
        display="grid"
        gridtemplatecolumns="repeat(auto-fit, minmax(80px, 1fr))"
        gridgap="8px"
        width="fit-content"
      >
        {runs_in_shortcut.map((run: any, index: number) => (
          <CustomCol width="fit-content" space={'1'} justifyself="center">
            <Tooltip placement="topLeft" title={run.dataset_name}>
              <ShortcutTagDiv
                background={is_run_selected_already(run, query).toString()}
                onClick={() => {
                  set_current_index(index);
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
                <CustomDiv>{run.run_number}</CustomDiv>
                <Button
                  size="small"
                  type="link"
                  onClick={() => deleteFromShortcuts(run.id)}
                  disabled={is_run_selected_already(run, query)}
                  icon={<CloseOutlined />}
                />
              </ShortcutTagDiv>
            </Tooltip>
          </CustomCol>
        ))}
      </CustomCol>
      <Col style={{ justifySelf: 'flex-end' }}>
        <StyledSecondaryButton onClick={() => toggleAddRunsToShortcut(true)}>
          Add run
        </StyledSecondaryButton>
      </Col>
    </CustomRow>
  );
};
