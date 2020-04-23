import styled from 'styled-components';
import { theme } from './theme';
import { Layout } from 'antd';

const { Header, Content } = Layout;

export const StyledLayout = styled(Layout)`
  height: 100vh;
`;
export const StyledHeader = styled(Header)`
  background-color: ${theme.colors.primary.main};
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledContent = styled(Content)`
  height: 100%;
  padding: calc(${theme.space.spaceBetween}*4);
`;
