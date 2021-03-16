import styled, { keyframes } from 'styled-components';
import { SizeProps } from '../../../../containers/display/interfaces';
import { theme } from '../../../../styles/theme';

const keyframe_for_updates_plots = keyframes`
    0% {
      background:  ${theme.colors.primary.light};
    }
    50% {
      background:  ${theme.colors.primary.main};
      opacity: 0.5;
    }
    100% {
      background:  ${theme.colors.primary.light};
    }
`;

const uploadedPlot = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;



export const ParentWrapper = styled.div<{ size: SizeProps, isLoading?: string, animation?: string, isPlotSelected?: string, plotsAmount?: number; }>`
    width: ${(props) => (props.size.w + 30 + (props.plotsAmount ? props.plotsAmount : 4 * 4))}px;
    height: ${(props) => (props.size.h + 40 + (props.plotsAmount ? props.plotsAmount : 4 * 4))}px;
    justify-content: center;
    align-items flex-start !important; 
    margin: 4px;
    background: ${(props) => props.isPlotSelected === 'true' ? theme.colors.secondary.light : theme.colors.primary.light};
    display: grid;
    align-items: end;
    padding: 8px;
`
export const PlotUpdateIdicator = styled.div<{ update?: string}>`
    padding: 1px;
    animation-iteration-count: ${props => props.update === 'true'? 'infinite' : '0' };;
    animation-timing-function:ease-in-out;
    animation-duration: 1s;
    animation-name: ${keyframe_for_updates_plots };
`
export const PlotUploadIdicator = styled.div<{ uploaded?: string }>`
    animation-iteration-count: 1;
    animation-duration: 0.5s;
    animation-name: ${uploadedPlot};
`

export const LayoutName = styled.div<{ error?: string, isPlotSelected?: string }>`
    padding-bottom: 4;
    color: ${props => props.error === 'true' ? theme.colors.notification.error : theme.colors.common.black};
    font-weight: ${props => props.isPlotSelected === 'true' ? 'bold' : ''};
    word-break: break-word;
    display: flex;
    justify-content: space-between;
`
export const LayoutWrapper = styled.div<{ auto: string }>`
    display: grid;
    grid-template-columns: ${(props) => (props.auto)};
    justify-content: center;
`;

export const PlotWrapper = styled.div<{ plotSelected: boolean, width?: string, height?: string }>`
    justify-content: center;
    border: ${(props) => props.plotSelected ? `4px solid ${theme.colors.secondary.light}` : ''};
    align-items:  center ;
    width: ${(props) => props.width ? `calc(${props.width}+8px)` : 'fit-content'};
    height: ${(props) => props.height ? `calc(${props.height}+8px)` : 'fit-content'};;
    cursor:  pointer ;
    padding: ${(props) => props.plotSelected ? '4px' : '2px'};
    align-self:  center ;
    justify-self:  baseline;
    cursor: ${props => props.plotSelected ? 'zoom-out' : 'zoom-in'};
`