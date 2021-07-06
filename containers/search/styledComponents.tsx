import React from 'react';
import { SearchOutlined, BarChartOutlined } from '@ant-design/icons';
import { Spin, Row, Col, Alert, Tag } from 'antd';

import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const keyframe_for_updated_last_runs = keyframes`
  0% {
    background: ${theme.colors.secondary.main};
  }
  50% {
    background: ${theme.colors.primary.main};
  }
  100% {
    background: ${theme.colors.secondary.main};
  }
`;

export const StyledWrapper = styled.div<{ overflowx?: string }>`
  height: 100%;
  display: flex;
  overflow: scroll;
  justify-content: center;
  overflow-x: ${(props) => (props.overflowx ? props.overflowx : '')};
`;

export const Spinner = () => <Spin tip="Loading..." />;

export const SpinnerWrapper = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FillSpinnerWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledTableHead = styled.thead`
  height: calc(${theme.space.spaceBetween} * 12);
  font-size: 1.125rem;
  background-color: ${theme.colors.thirdy.dark};
  color: ${theme.colors.common.white};
  text-transform: uppercase;
`;
export const StyledTableRow = styled.tr<{
  index?: number;
  noHover?: boolean;
  expanded?: boolean;
}>`
  width: 100%;
  background: ${(props) =>
    (props?.index && props.index % 2 === 0) || props.index === 0
      ? `${theme.colors.primary.light}`
      : ''};
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props?.noHover ? '' : `${theme.colors.thirdy.light}`};
    color: ${(props) => (props?.noHover ? '' : `${theme.colors.common.white}`)};
  }
  font-style: ${(props) =>
    props?.expanded && props.expanded === true ? 'italic' : ''};
`;
export const StyledTableDatasetColumn = styled.td`
  width: 70%;
  padding: 8px;
  margin: 8px;
`;
export const StyledTableRunColumn = styled.td`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 8px;
  margin: 8px;
`;
export const StyledTable = styled.table`
  border: 1px solid ${theme.colors.primary.main};
  margin-top: calc(${theme.space.spaceBetween}*2);
`;
export const RunsRows = styled(Row)`
  padding-left: 32px;
  font-weight: normal !important;
  display: grid;
  grid-template-columns: repeat(3, min-content);
`;
export const ExpandedRow = styled.div<{ expanded: boolean }>`
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
export const RunWrapper = styled.div<{
  hover?: string;
  isLoading?: string;
  animation?: string;
  disabled?:string;
}>`
  background: ${theme.colors.secondary.main};
  opacity: ${(props) =>
    props.disabled === 'true'
      ? 0.5
      : 1};
  border-radius: 5px;
  padding: ${theme.space.padding};
  align-items: cernter;
  display: flex;
  justify-content: center;
  animation-name: ${(props) =>
    props.isLoading === 'true' && props.animation === 'true'
      ? keyframe_for_updated_last_runs
      : ''};
  animation-iteration-count: 1;
  animation-duration: 1s;
  &:hover {
    background-color: ${(props) =>
      props?.hover && !props.disabled && `${theme.colors.secondary.dark}`};
  }
`;

export const StyledA = styled.a`
  color: ${theme.colors.common.white} !important;
`;

export const StyledAlert = styled(Alert)`
  width: 100vw;
  height: fit-content;
`;

export const LatestRunsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 8px;
  padding-top: 8px;
  margin-top: 8px;
  border-top: 2px solid;
`;
export const LatestRunsTtitle = styled.div`
  display: flex;
  justify-content: center;
  margin: 4;
  text-transform: uppercase;
  font-size: 1.5rem;
  text-decoration: overline;
  font-weight: 300;
`;
export const LatestRunsSection = styled.div`
  margin: 64px;
`;
