import * as React from 'react';

import { StyledModal } from '../viewDetailsMenu/styledComponents';
import { StyledButton } from '../styledComponents';
import { theme } from '../../styles/theme';
import { QueryProps } from '../../containers/display/interfaces';
import { RunInfoItem } from './runStartTimeStamp';
import { run_info } from '../constants';
import { FormatParamsForAPI } from '../plots/plot/singlePlot/utils';
import { store } from '../../contexts/leftSideContext';
import { useRequest } from '../../hooks/useRequest';
import { get_jroot_plot } from '../../config/apis/get_plots_urls';
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
  const params_for_api = FormatParamsForAPI(
    globalState,
    query,
    'iRun',
    '/HLT/EventInfo'
  );

  const { configuration } = globalState
  const { functions_config } = configuration
  params_for_api.functions_config = functions_config
  const { data } = useRequest(get_jroot_plot(params_for_api), {}, [
    query.dataset_name,
    query.run_number,
  ]);
  const run = get_label({ value: 'iRun', label: 'Run' }, data)
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
    >{open &&
      <div>
        {run_info.map((info) => (
          <RunInfoItem info={info} query={query} />
        ))}
      </div>}
    </StyledModal>
  );
};
