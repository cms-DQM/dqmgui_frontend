import styled from 'styled-components';
import { theme } from '../styles/theme';

export const StyledDiv = styled.div`
  padding: calc(${theme.space.spaceBetween}*2);
`;

export const ZoomedPlotWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: calc(${theme.space.spaceBetween}*2)
`