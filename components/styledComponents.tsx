import styled from 'styled-components';
import { theme } from '../styles/theme';

export const StyledDiv = styled.div`
  margin: calc(${theme.space.spaceBetween}*2);
`;

export const ZoomedPlotsWrapper = styled.div`
  display: grid;
  flex-direction: column;
  justify-content: center;
  padding: calc(${theme.space.spaceBetween}*2);
`