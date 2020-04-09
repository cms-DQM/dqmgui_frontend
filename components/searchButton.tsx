import React from 'react';
import { Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { StyledButton } from './styles';

export const SearchButton = () => (
  <Tooltip title="search">
    <StyledButton
      htmlType="submit"
      type="primary"
      shape="circle"
      icon={<SearchOutlined />}
    />
  </Tooltip>
);
