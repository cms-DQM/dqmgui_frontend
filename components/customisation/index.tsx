import * as React from 'react';
import { Modal, Form } from 'antd';
import { Store } from 'antd/lib/form/interface';

import { CostumizeTable } from './table';
import { StyledButton } from '../styledComponents';
import { CustomizeProps } from '../../containers/display/interfaces';
import { theme } from '../../styles/theme';

interface CustomisationProps {
  plot_name: string;
  open: boolean;
  onCancel(): void;
  setCustomisationParams(custProps: Partial<Store> & CustomizeProps): void;
  customizationParams?:CustomizeProps;
}

export const Customisation = ({
  plot_name,
  open,
  onCancel,
  customizationParams,
  setCustomisationParams,
}: CustomisationProps) => {
  const [form] = Form.useForm();
  const onOk = async () => {
    await form.submit();
    onCancel();
  };

  return (
    <Modal
      title={`${plot_name} plot customization`}
      visible={open}
      onCancel={onCancel}
      footer={[
        <StyledButton
          color={theme.colors.secondary.main}
          background="white"
          key="Close"
          onClick={onCancel}
        >
          Close
        </StyledButton>,
        <StyledButton key="OK" onClick={onOk}>
          OK
        </StyledButton>,
      ]}
    >
      <CostumizeTable
        form={form}
        customizationParams={customizationParams}
        setCustomisationParams={setCustomisationParams}
      />
    </Modal>
  );
};
