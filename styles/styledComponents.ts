import styled from 'styled-components';
import { Layout } from 'antd';

import { theme } from './theme';

const { Header } = Layout;

export const StyledLayout = styled(Layout)`
  height: 100%;
`;
export const StyledHeader = styled(Header)<{justifyContent?: string}>`
  background-color: ${theme.colors.primary.main};
  padding: 12px 12px 12px 0px;
  display: flex;
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'center'};
  align-items: center;
`;
export const StyledDiv = styled.div<{ span?: number }>`
  height: 100vh;
  padding: ${(props) =>
    props.span ? `calc(${theme.space.spaceBetween}*${props.span}` : ''};
`;

export const StyledLogoWrapper = styled.div`
  height: 55px;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    background-color: ${theme.colors.primary.light} !important;
    color: ${theme.colors.common.white};
  }
`;
export const StyledLogo = styled.img`
  width: 55px;
  height: 55px;
`;
export const StyledLogoDiv = styled.div`
  width: 55px;
  height: 55px;
  // position: absolute;
  // left: 0;
`;
