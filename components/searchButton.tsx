import React from 'react';
import { Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { StyledButton } from './styledComponents';

interface SearchButtonProps {
  onClick(): void;
}

export const SearchButton = ({ onClick }: SearchButtonProps) => (
  <Tooltip title="search">
    <StyledButton
      htmlType="submit"
      onClick={() => onClick()}
      shape="circle"
      icon={<SearchOutlined />}
    />
  </Tooltip>
);
