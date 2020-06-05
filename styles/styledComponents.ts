import styled from 'styled-components';
import { theme } from './theme';
import { Layout } from 'antd';

const { Header } = Layout;

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
  padding: ${(props) =>
    props.span ? `calc(${theme.space.spaceBetween}*${props.span}` : ''};
`;

export const StyledLogoWrapper = styled.div`
  position: absolute;
  left: 0;
  height: 55px; 
  cursor: pointer;
  transition: 0.5s;
  &:hover{
    background-color: ${theme.colors.secondary.dark} !important;
    color: ${theme.colors.common.white};
  }
`
export const StyledLogo = styled.img`
  width: 55px;
  height: 55px;
`
export const StyledLogoDiv = styled.div`
  width: 55px;
  height: 55px;
`