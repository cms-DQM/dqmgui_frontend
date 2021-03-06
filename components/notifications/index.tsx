import * as React from 'react';
import { notification } from 'antd';

import { theme } from '../../styles/theme';
import { CustomParagraph } from '../styledComponents';

export const message = (message: string, type?: string) => {
  const customiseMessage = () => (
    <CustomParagraph color={theme.colors.common.white}>
      {message}
    </CustomParagraph>
  );

  return notification.open({
    message: customiseMessage(),
    key: '1',
    onClose: close,
    duration: 6,
    style: {
      background: theme.colors.notification.error,
    },
  });
};
