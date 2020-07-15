import styled from 'styled-components';
import {
  FolderFilled,
  MinusCircleFilled,
  PlusCircleFilled,
} from '@ant-design/icons';
import { Col, Row, Breadcrumb, Button } from 'antd';

import { theme } from '../../styles/theme';
import { PlotPropertiesReportProps } from './interfaces';
import { viewPositions } from '../../components/constants';

export const Icon = styled(FolderFilled)`
  font-size: 2rem;
  cursor: pointer;
  padding-right: calc(${theme.space.spaceBetween}*2);
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
  report?: PlotPropertiesReportProps;
}>`
  display: flex;
  justify-content: space-between;
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
`;
export const PlotNameCol = styled(Col)`
  width: 70%;
  word-break: break-all;
  color: ${theme.colors.common.black};
  padding: ${theme.space.spaceBetween};
`;
export const Column = styled(Col)`
  padding: ${theme.space.spaceBetween} calc(${theme.space.spaceBetween}*2)
    ${theme.space.spaceBetween} ${theme.space.spaceBetween};
`;
export const Wrapper = styled.div<{
  zoomed?: any;
  notZoomedPlot?: boolean;
  noScroll?: boolean;
  position?: string;
  ratio?: string;
  proportion?: string;
}>`
  width: ${(props) =>
    props?.zoomed &&
    props.position === viewPositions[1].value &&
    props.notZoomedPlot
      ? props.notZoomedPlot && props.proportion
      : '100%'};
  border-left: ${(props) =>
    props?.notZoomedPlot ? '' : `4px solid ${theme.colors.common.lightGrey}`};
  align-items: center;
  height: ${(props) => (props?.zoomed ? '100%' : 'fit-content')};
  height: ${(props) =>
    props?.zoomed && props.position === viewPositions[0].value
      ? props.notZoomedPlot && props.proportion
      : '100%'};
  flex-wrap: wrap;
  overflow: ${(props) => (props?.zoomed ? 'scroll' : '')};
  align-items: start;
  flex-flow: column;
`;
export const DivWrapper = styled.div<{
  selectedPlots: boolean;
  position?: string;
}>`
  height: 100%;
  overflow: ${(props) => (props.selectedPlots ? 'hidden' : 'scroll')};
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

export const ImageDiv = styled.div<{ width: number; height: number }>`
  width: ${(props) => (props.width ? props.width : '')}px;
  height: ${(props) => (props.height ? props.height : '')}px;
`;

export const Image = styled.img<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export const StyledBreadcrumb = styled(Breadcrumb)`
  width: fit-content;
`;
export const DirecotryButton = styled(Button)`
  word-break: break-all;
  color: ${theme.colors.primary.main};
  width: 100%;
`;
