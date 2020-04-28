import styled from 'styled-components';
import { theme } from '../../styles/theme';
import {
  FolderFilled,
  MinusCircleFilled,
  PlusCircleFilled,
} from '@ant-design/icons';
import { Col, Row } from 'antd';

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
export const StyledCol = styled(Col) <{ space?: number }>`
  padding: ${props => props.space ? `calc(${theme.space.spaceBetween}*${props.space})` : ''};
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

export const StyledPlotRow = styled(Row) <{
  width: number;
  minHeight: number;
  isPlotSelected: boolean;
  noPointer?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  width: ${(props) => props?.width && props.width}px;
  min-height: ${(props) => props?.minHeight && props.minHeight}px;
  background-color: ${(props) =>
    props?.isPlotSelected
      ? `${theme.colors.secondary.light}`
      : `${theme.colors.primary.light}`};
  ${theme.colors.primary.main};
  cursor: ${(props) => (props?.noPointer ? '' : 'pointer')};
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
}>`
  width: ${(props) => (props?.zoomed ? '50%' : '100%')};
  border-left: ${(props) =>
    props?.notZoomedPlot ? '' : `4px solid ${theme.colors.common.lightGrey}`};
  align-items: center;
  height: ${(props) => (props?.zoomed ? '100%' : 'fit-content')};
  display: flex;
  flex-wrap: wrap;
  overflow: ${(props) => (props?.zoomed ? 'scroll' : '')};
  align-items: start;
  flex-flow: ${(props) => (props?.notZoomedPlot ? '' : 'column')};
`;
export const DivWrapper = styled.div<{ selectedPlots: boolean }>`
  height: 100%;
  overflow: ${(props) => (props.selectedPlots ? 'hidden' : 'scroll')};
  display: flex;
`;
export const MinusIcon = styled(MinusCircleFilled)`
  font-size: 1.5rem;
  color: ${theme.colors.notification.error};
`;
export const PlusIcon = styled(PlusCircleFilled)`
  font-size: 1.5rem;
  color: ${theme.colors.notification.success};
`;
export const StyledDiv = styled.div`
  padding: ${theme.space.spaceBetween};
  color: ${theme.colors.primary.main};
`;
export const WrapperDiv = styled.div`
  display: flex;
`;
export const StyledAForPath = styled.a`
  padding: 0 calc(${theme.space.spaceBetween}*2) 0
    calc(${theme.space.spaceBetween}*2);
`;
export const ImageDiv = styled.div<{ width: number; height: number }>`
  width: ${(props) => (props.width ? props.width : '')}px;
  height: ${(props) => (props.height ? props.height : '')}px;
`;

export const Image = styled.img<{ width: number, height: number }>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
`
