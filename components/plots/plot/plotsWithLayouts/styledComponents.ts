import styled, { keyframes } from 'styled-components';
import { SizeProps } from '../../../../containers/display/interfaces';
import { theme } from '../../../../styles/theme';

const keyframe_for_updates_plots = keyframes`
  0% {
    background: ${theme.colors.secondary.main};
    color:  ${theme.colors.common.white};
  }
  100% {
    background: ${theme.colors.primary.light};
  }
`;


export const ParentWrapper = styled.div<{ size: SizeProps, isLoading: string, animation: string }>`
    width: ${(props) => (props.size.w + 24)}px;
    justify-content: center;
    margin: 4px;
    background: ${theme.colors.primary.light};
    display: grid;
    align-items: end;
    padding: 8px;
    animation-iteration-count: 1;
    animation-duration: 1s;
    animation-name: ${(props) =>
        props.isLoading === 'true' && props.animation === 'true'
          ? keyframe_for_updates_plots
          : ''};
`

export const LayoutName = styled.div`
    padding-bottom: 4
`
export const LayoutWrapper = styled.div<{ size: SizeProps, auto: string}>`
    width: ${(props) => (props.size.w + 12)}px;
    height: ${(props) => (props.size.h + 16)}px;
    display: grid;
    grid-template-columns: ${(props) => (props.auto)};
`;

export const PlotWrapper = styled.div<{ plotSelected: boolean }>`
    justify-content: center;
    border: ${(props) => props.plotSelected ? `4px solid ${theme.colors.secondary.light}` : `2px solid ${theme.colors.primary.light}`};
    align-items:  center ;
    min-width: onePlotWidth;
    min-height: onePlotHeight;
    cursor:  pointer ;
    align-self:  center ;
    justify-self:  baseline;
    margin: 2px;
`