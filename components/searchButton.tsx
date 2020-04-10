import React from 'react';
import { Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { StyledButton } from './styles';

export const SearchButton = () => (
  <Tooltip title="search">
    <StyledButton
      htmlType="submit"
      shape="circle"
      icon={<SearchOutlined />}
    />
  </Tooltip>
);
