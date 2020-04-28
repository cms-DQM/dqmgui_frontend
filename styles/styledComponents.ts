import styled from 'styled-components';
import { theme } from './theme';
import { Layout } from 'antd';

const { Header, Content } = Layout;

export const StyledLayout = styled(Layout)`
  height: 100%;
`;
export const StyledHeader = styled(Header)`
  background-color: ${theme.colors.primary.main};
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledDiv = styled.div<{ span?: number }>`
  height: 100vh;
  padding: ${(props) => props.span ? `calc(${theme.space.spaceBetween}*${props.span}` : ''};
`;
