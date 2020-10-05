import styled, { keyframes } from 'styled-components';
import {
  FolderFilled,
  MinusCircleFilled,
  PlusCircleFilled,
} from '@ant-design/icons';
import { Col, Row, Breadcrumb, Button } from 'antd';

import { theme } from '../../styles/theme';
import { PlotPropertiesReportProps } from './interfaces';
import { viewPositions } from '../../components/constants';

const keyframe_for_updates_folder = keyframes`
  0% {
    color: ${theme.colors.primary.main};
  }
  50% {
    color: ${theme.colors.secondary.main};
  }
  100% {
    color: ${theme.colors.primary.main};
  }
`;
const keyframe_for_updates_plots = keyframes`
  0% {
    background: ${theme.colors.secondary.main};
    color:  ${theme.colors.common.white};
  }
  100% {
    background: ${theme.colors.secondary.main};
  }
`;

export const Icon = styled(FolderFilled)<{
  isLoading?: string;
  animation?: string;
}>`
  font-size: 2rem;
  cursor: pointer;
  padding-right: calc(${theme.space.spaceBetween}*2);
  animation-name: ${(props) =>
    props.isLoading === 'true' && props.animation === 'true'
      ? keyframe_for_updates_folder
      : ''};
  animation-iteration-count: 1;
  animation-duration: 1s;
`;
export const DirecotryWrapper = styled.div`
  padding: ${theme.space.spaceBetween};
  display: flex;
  align-items: center;
`;

export const StyledA = styled.a`
  word-break: break-all;
`;
export const StyledCol = styled(Col)<{ space?: number }>`
  padding: ${(props) =>
    props.space ? `calc(${theme.space.spaceBetween}*${props.space})` : ''};
  width: fit-content;
`;

export const OnSidePlotsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const StyledRow = styled(Row)`
  padding-top: calc(${theme.space.spaceBetween}*2);
  display: flex;
  justify-content: end;
`;

export const StyledRowImages = styled(Row)`
  display: flex;
  justify-content: center;
`;

export const StyledPlotRow = styled(Row)<{
  width?: string;
  minheight?: number;
  is_plot_selected?: string;
  nopointer?: string;
  isLoading?: string;
  report?: PlotPropertiesReportProps;
  animation?: string;
  justifycontent?: string;
}>`
  display: flex;
  justify-content: ${(props) =>
    props.justifycontent ? props.justifycontent : 'space-between'};
  width: ${(props) => props?.width && props.width}px;
  min-height: ${(props) => props?.minheight && props.minheight}px;
  background-color: ${(props) => {
    if (props?.is_plot_selected === 'true') {
      return `${theme.colors.secondary.light}`;
    }
    return `${theme.colors.primary.light}`;
  }};
  color: ${(props) => {
    if (props.report?.alarm === 1) {
      return theme.colors.notification.error;
    } else if (props.report?.warn === 1) {
      return theme.colors.notification.warning;
    }
    return theme.colors.common.black;
  }};
  font-weight: ${(props) => {
    if (props.report?.alarm === 1) {
      return 'bold';
    } else if (props.report?.warn === 1) {
      return 'bold';
    }
    return '';
  }};
  cursor: ${(props) => (props?.nopointer ? '' : 'pointer')};
  animation-name: ${(props) =>
    props.isLoading === 'true' && props.animation === 'true'
      ? keyframe_for_updates_plots
      : ''};
  animation-iteration-count: 1;
  animation-duration: 1s;
`;
export const PlotNameCol = styled(Col)<{ error?: string }>`
  width: 70%;
  word-break: break-all;
  color: ${(props) =>
    props.error === 'true'
      ? theme.colors.notification.error
      : theme.colors.common.black};
  font-weight: ${(props) => (props.error === 'true' ? 'bold' : '')};
  padding: ${theme.space.spaceBetween};
`;
export const Column = styled(Col)<{ display?: string }>`
  padding: ${theme.space.spaceBetween} calc(${theme.space.spaceBetween}*2)
    ${theme.space.spaceBetween} ${theme.space.spaceBetween};
  display: ${(props) => (props.display ? props.display : '')};
`;
export const Wrapper = styled.div<{
  any_selected_plots?: any;
  position?: any;
  proportion?: any;
}>`
  width: ${(props) =>
    props?.any_selected_plots && props.position === viewPositions[1].value
      ? props.proportion
      : '100%'};
  height: ${(props) =>
    props?.any_selected_plots && props?.position === viewPositions[1].value
      ? '100%'
      : !props?.any_selected_plots && props?.position === viewPositions[1].value
      ? '100%'
      : props?.any_selected_plots && props?.position === viewPositions[0].value
      ? `${props.proportion}`
      : 'fit-content'};
  align-items: center;
  flex-wrap: wrap;
  align-items: start;
  flex-flow: column;
  overflow: auto;
`;

export const ZoomedPlotsWrapper = styled.div<{
  any_selected_plots?: any;
  position?: string;
  proportion?: string;
}>`
  width: ${(props) =>
    props?.any_selected_plots && props?.position === viewPositions[1].value
      ? `calc(100% - ${props.proportion})`
      : '100%'};
  border-left: 4px solid ${theme.colors.common.lightGrey};
  border-top: ${(props) =>
    props?.position === viewPositions[0].value &&
    ` 4px solid ${theme.colors.common.lightGrey}`};
  align-items: center;
  height: ${(props) =>
    props?.position === viewPositions[1].value
      ? '100%'
      : props?.position === viewPositions[0].value &&
        `calc(100% - ${props.proportion})`};
  flex-wrap: wrap;
  overflow: ${(props) => (props?.any_selected_plots ? 'scroll' : '')};
  align-items: start;
  flex-flow: column;
  overflow: auto;
`;

export const DivWrapper = styled.div<{
  selectedPlots: boolean;
  position?: string;
}>`
  height: 100%;
  overflow: ${(props) => (props.selectedPlots ? 'hidden' : 'hidden')};
  display: ${(props) =>
    props.position === viewPositions[0].value ? 'centents' : 'flex'};
`;
export const MinusIcon = styled(MinusCircleFilled)`
  font-size: 1.5rem;
  color: ${theme.colors.notification.error};
`;
export const PlusIcon = styled(PlusCircleFilled)`
  font-size: 1.5rem;
  color: ${theme.colors.notification.success};
`;
export const StyledDiv = styled.div<{ display?: string }>`
  padding: ${theme.space.spaceBetween};
  color: ${theme.colors.primary.main};
  display: flex;
  flex-direction: ${(props) => (props.display ? props.display : '')};
  align-items: center;
`;

export const WrapperDiv = styled.div`
  display: flex;
`;

export const ImageDiv = styled.div<{
  width?: number;
  height?: number;
  id?: any;
  alignitems?: string;
  display?: string;
}>`
  width: ${(props) => (props.width ? props.width : '')}px;
  height: ${(props) => (props.height ? props.height : '')}px;
  align-items: ${(props) => (props.alignitems ? props.alignitems : '')};
  display: ${(props) => (props.display ? props.display : '')};
`;

export const Image = styled.img<{
  display?: string;
  width?: number;
  height?: number;
  src?: any;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  display: ${(props) => props.display};
`;

export const StyledBreadcrumb = styled(Breadcrumb)`
  width: fit-content;
`;
export const DirecotryButton = styled(Button)`
  word-break: break-all;
  color: ${theme.colors.primary.main};
  width: 100%;
`;
