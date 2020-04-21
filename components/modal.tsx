import React, { useState } from 'react';
import { Button } from 'antd';

import { StyledModal } from './viewDetailsMenu/styledComponents';

interface CustomModalProps {
  children?: any;
  visible: boolean;
  onClosing(): void;
  title: string;
}

export const CustomModal = ({
  children,
  visible,
  onClosing,
  title,
}: CustomModalProps) => {
  return (
    <StyledModal
      title={title}
      visible={visible}
      onCancel={() => onClosing()}
      footer={[
        <Button
          key="Close"
          onClick={() => {
            onClosing();
          }}
        >
          Close
        </Button>,
      ]}
    >
      {children}
    </StyledModal>
  );
};
