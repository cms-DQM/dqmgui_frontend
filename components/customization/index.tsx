import * as React from 'react'
import { Modal, Button, Form } from 'antd'
import { Store } from 'antd/lib/form/interface';

import { CostumizeTable } from './table'
import { StyledButton } from '../styledComponents';
import { CustomizeProps } from '../../containers/display/interfaces';
import { theme } from '../../styles/theme';

interface CustomizationProps {
  plot_name: string;
  open: boolean;
  onCancel(): void;
  setCustomizationParams(custProps: Partial<Store> & CustomizeProps): void
}

export const Customization = ({ plot_name, open, onCancel, setCustomizationParams }: CustomizationProps) => {
  const [form] = Form.useForm();
  const onOk = async () => {
    await form.submit();
    onCancel()
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
        <StyledButton
          key="OK"
          onClick={onOk}>
          OK
       </StyledButton>
      ]}
    >
      <CostumizeTable form={form} setCustomizationParams={setCustomizationParams} />
    </Modal>
  )
}
