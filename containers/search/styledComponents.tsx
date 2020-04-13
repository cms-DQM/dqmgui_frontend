import React from 'react';
import { SearchOutlined, BarChartOutlined  } from '@ant-design/icons';

import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Spin, Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;
const antIcon = () => <LoadingOutlined spin />;

const SpinnerIcon = styled(antIcon)`
  font-size: 45;
`;
export const Spinner = () => <Spin tip="Loading..." indicator={SpinnerIcon} />;

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
export const StyledTableRow = styled.tr`
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
  width: 71%;
`;
export const RunsRows = styled(Row)`
  padding-left: 32px;
  font-weight: normal !important;
`;
export const ExpandedRow = styled.div`
  font-weight: ${(props) =>
    props?.expanded && props.expanded === true ? 'bold' : ''};
`;
export const NotFoundDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 2px solid ${theme.colors.secondary.main};
    height: fit-content;
    font-size: 2rem;
    padding: calc(${theme.space.spaceBetween}*12)
`

export const Icon = styled(SearchOutlined )`
    font-size: 14rem;
    color: ${theme.colors.primary.main}
`
export const NotFoundDivWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ChartIcon = styled(BarChartOutlined)`
  font-size: 14rem;
  color: ${theme.colors.primary.main}
`

export const StyledCol = styled(Col)`
    padding: ${theme.space.spaceBetween}
`