import * as React from 'react';

import { StyledModal } from '../viewDetailsMenu/styledComponents';
import { StyledButton } from '../styledComponents';
import { theme } from '../../styles/theme';
import { QueryProps } from '../../containers/display/interfaces';
import { RunInfoItem } from './runStartTimeStamp';
import { run_info } from '../constants';

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
  return (
    <StyledModal
      title={`Run ${query.run_number} information`}
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
