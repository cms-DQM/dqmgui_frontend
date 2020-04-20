import React from 'react';
import { SearchOutlined, BarChartOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Spin, Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  // width: 100%;
  justify-content: center;
`;

export const Spinner = () => <Spin tip="Loading..." />;

export const SpinnerWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StyledTableHead = styled.thead`
  height: calc(${theme.space.spaceBetween} * 12);
  font-size: 1.125rem;
  background-color: ${theme.colors.thirdy.dark};
  color: ${theme.colors.common.white};
  text-transform: uppercase;
`;
export const StyledTableRow = styled.tr<{ index?: number, noHover?: boolean, expanded?: boolean }>`
  width: 100%;
  background: ${(props) =>
    (props?.index && props.index % 2 === 0) || props.index === 0
      ? `${theme.colors.thirdy.light}`
      : ''};
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
    props?.noHover ? '' : `${theme.colors.secondary.light}`};
  }
  font-weight: ${(props) =>
    props?.expanded && props.expanded === true ? 'bold' : ''};
`;
export const StyledTableDatasetColumn = styled.td`
  width: 80%;
  padding: 8px;
`;
export const StyledTableRunColumn = styled.td`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 8px;
`;
export const StyledTable = styled.table`
  border: 1px solid ${theme.colors.primary.main};
  width: 70%;
`;
export const RunsRows = styled(Row)`
  padding-left: 32px;
  font-weight: normal !important;
`;
export const ExpandedRow = styled.div<{ expanded: boolean, }>`
  font-weight: ${(props) =>
    props?.expanded && props.expanded === true ? 'bold' : ''};
`;
export const NotFoundDiv = styled.div<{ noBorder?: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  border: ${(props) =>
    props.noBorder ? 'hidden' : `2px solid ${theme.colors.secondary.main}`};
  height: fit-content;
  font-size: 2rem;
  padding: calc(${theme.space.spaceBetween}*12);
`;

export const Icon = styled(SearchOutlined)`
  font-size: 14rem;
  color: ${theme.colors.primary.main};
`;
export const NotFoundDivWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChartIcon = styled(BarChartOutlined)`
  font-size: 14rem;
  color: ${theme.colors.primary.main};
`;

export const StyledCol = styled(Col)`
  padding: ${theme.space.spaceBetween};
`;
export const TableBody = styled.tbody`
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
`;
export const RunWrapper = styled.div`
  background: ${theme.colors.secondary.main};
  border-radius: 5px;
  padding: ${theme.space.padding};
`;
export const StyledA = styled.a`
  color: ${theme.colors.common.white} !important;
`;
