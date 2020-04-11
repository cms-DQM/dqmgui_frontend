import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { FolderFilled, MinusCircleFilled, PlusCircleFilled   } from '@ant-design/icons';
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
export const StyledCol = styled(Col)`
  padding: calc(${theme.space.spaceBetween} * 2);
`;
export const StyledRow = styled(Row)`
  display: flex;
  justify-content: center;
`;
export const StyledPlotRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  width: ${(props) => props?.width && props.width}px;
  min-height: ${(props) => props?.minHeight && props.minHeight}px;
  background-color: ${theme.colors.primary.light};
  ${theme.colors.primary.main};
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
export const Wrapper = styled.div`
  width: ${(props) => props?.zoomed ? '50%' : '100%'};
  align-items: center
`
export const MinusIcon = styled(MinusCircleFilled)`
  font-size: 1.5rem;
  color: ${theme.colors.common.white};
`
export const PlusIcon = styled(PlusCircleFilled)`
  font-size: 1.5rem;
  color: ${theme.colors.common.white};
`