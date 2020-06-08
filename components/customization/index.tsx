import * as React from 'react'
import { Modal, Button, Form } from 'antd'

import { CostumizeTable } from './table'
import { StyledButton } from '../styledComponents';

interface CustomizationProps {
  plot_name: string;
  open: boolean;
  onCancel(): void;
}

export const Customization = ({ plot_name, open, onCancel }: CustomizationProps) => {
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
        <Button
          key="Close"
          onClick={onCancel}
        >
          Close
        </Button>,
        <StyledButton
          key="OK"
          onClick={onOk}>
          OK
       </StyledButton>
      ]}
    >
      <CostumizeTable form={form} />
    </Modal>
  )
}
