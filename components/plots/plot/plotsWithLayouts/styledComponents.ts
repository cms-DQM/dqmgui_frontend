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


export const ParentWrapper = styled.div<{ size: SizeProps, isLoading: string, animation: string, isPlotSelected?: string, plotsAmount?: number; }>`
    width: ${(props) => (props.size.w + 30 + (props.plotsAmount ? props.plotsAmount : 4 * 4))}px;
    height: ${(props) => (props.size.h + 40 + (props.plotsAmount ? props.plotsAmount : 4 * 4))}px;
    justify-content: center;
    margin: 4px;
    background: ${(props) => props.isPlotSelected === 'true' ? theme.colors.secondary.light : theme.colors.primary.light};
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

export const LayoutName = styled.div<{ error?: string, isPlotSelected?: string }>`
    padding-bottom: 4;
    color: ${props => props.error === 'true' ? theme.colors.notification.error : theme.colors.common.black};
    font-weight: ${props => props.isPlotSelected === 'true' ? 'bold' : ''};
    word-break: break-word;
`
export const LayoutWrapper = styled.div<{ size: SizeProps & string, auto: string }>`
    // width: ${(props) => props.size.w ? `${props.size.w + 12}px` : props.size};
    // height:${(props) => props.size.h ? `${props.size.w + 16}px` : props.size};
    display: grid;
    grid-template-columns: ${(props) => (props.auto)};
    justify-content: center;
`;

export const PlotWrapper = styled.div<{ plotSelected: boolean, width?: string, height?: string }>`
    justify-content: center;
    border: ${(props) => props.plotSelected ? `4px solid ${theme.colors.secondary.light}` : `2px solid ${theme.colors.primary.light}`};
    align-items:  center ;
    width: ${(props) => props.width ? `calc(${props.width}+8px)` : 'fit-content'};
    height: ${(props) => props.height ? `calc(${props.height}+8px)` : 'fit-content'};;
    cursor:  pointer ;
    padding: 4px;
    align-self:  center ;
    justify-self:  baseline;
    cursor: ${props => props.plotSelected ? 'zoom-out' : 'zoom-in'};
`