import * as React from 'react';
import { Typography } from 'antd';

import { CustomDiv } from '../styledComponents';

const { Text } = Typography;

export const ErrorMessage = () => {
  return (
    <CustomDiv
      width="100%"
      height="100%"
      display="flex"
      justifycontent="center"
    >
      <Text type="danger" strong>
        Failed to load
      </Text>
    </CustomDiv>
  );
};
