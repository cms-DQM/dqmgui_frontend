import * as React from 'react';

import { StyledModal } from '../viewDetailsMenu/styledComponents';
import { StyledButton } from '../styledComponents';
import { theme } from '../../styles/theme';
import { QueryProps } from '../../containers/display/interfaces';
import { RunInfoItem } from './runStartTimeStamp';
import { run_info } from '../constants';
import { FormatParamsForAPI } from '../plots/plot/singlePlot/utils';
import { store } from '../../contexts/leftSideContext';
import { store as update_store } from '../../contexts/updateContext';
import { useRequest } from '../../hooks/useRequest';
import { get_jroot_plot } from '../../api/oldApi';
import { get_label } from '../utils';

interface RunInfoModalProps {
  toggleModal(value: boolean): void;
  query: QueryProps;
  open: boolean;
}

export const RunInfoModal = ({
  query,
  toggleModal,
  open,
}: RunInfoModalProps) => {
  const globalState = React.useContext(store);
  const update_state = React.useContext(update_store)
  const { not_older_than } = update_state

  const params_for_api = FormatParamsForAPI(
    globalState,
    query,
    'iRun',
    'HLT/EventInfo'
  );

  params_for_api.notOlderThan = not_older_than
  const { data } = useRequest(get_jroot_plot(params_for_api), {}, [
    query.dataset_name,
    query.run_number,
  ]);

  const run = get_label({ value: 'iRun', label: 'Run' }, data);
  return (
    <StyledModal
      title={`Run ${run} information`}
      visible={open}
      onCancel={() => toggleModal(false)}
      footer={[
        <StyledButton
          color={theme.colors.secondary.main}
          background="white"
          key="Close"
          onClick={() => toggleModal(false)}
        >
          Close
        </StyledButton>,
      ]}
    >
      {open && (
        <div>
          {run_info.map((info) => (
            <RunInfoItem info={info} query={query} not_older_than={not_older_than} />
          ))}
        </div>
      )}
    </StyledModal>
  );
};
