import { notification } from 'antd';

import { theme } from '../../styles/theme';
import { CustomParagraph } from '../styledComponents';

const getColor = (type: string) => {

  if (type === 'error') {
    return theme.colors.notification.error
  } else if (type === 'success') {
    return theme.colors.notification.success
  } else if (type === 'warning') {
    return theme.colors.notification.warning
  } else {
    return theme.colors.notification.error
  }
}

export const message = (message: string, type?: string) => {
  const customizeMessage = () => <CustomParagraph color={theme.colors.common.white}>{message}</CustomParagraph>

  return (notification.open({
    message: customizeMessage(),
    key: '1',
    onClose: close,
    duration: 6,
    style: {
      background: getColor(type ? type : ''),
    },
  }))
}