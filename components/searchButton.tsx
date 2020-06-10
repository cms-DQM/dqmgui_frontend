import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

import { StyledButton } from './styledComponents';

interface SearchButtonProps {
  onClick(): void;
}

export const SearchButton = ({ onClick }: SearchButtonProps) => (
  <StyledButton
    htmlType="submit"
    onClick={() => onClick()}
    shape="circle"
    icon={<SearchOutlined />}
  />
);
