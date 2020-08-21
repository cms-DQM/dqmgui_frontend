import React, { FC, useState } from 'react';
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';

import {
  RunsRows,
  StyledTableDatasetColumn,
  StyledTableRow,
  StyledTableRunColumn,
  StyledCol,
  RunWrapper,
  StyledA,
} from './styledComponents';
import { Button, Row, Col } from 'antd';
import {
  StyledSecondaryButton,
  CustomCol,
} from '../../components/styledComponents';

interface SearchResultsInterface {
  dataset: string;
  value: any[];
  handler(run: string, dataset: string): any;
  index: number;
}

const Result: FC<SearchResultsInterface> = ({
  index,
  dataset,
  value,
  handler,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <StyledTableRow expanded={expanded} index={index}>
      <StyledTableDatasetColumn>
        <div>
          {dataset}
          {expanded && (
            <RunsRows>
              {value.map(({ run }: any) => (
                <StyledCol key={run}>
                  <RunWrapper
                    onClick={() => handler(run, dataset)}
                    hover="true"
                  >
                    <StyledA>{run}</StyledA>
                  </RunWrapper>
                </StyledCol>
              ))}
            </RunsRows>
          )}
        </div>
      </StyledTableDatasetColumn>
      <StyledTableRunColumn>
        <StyledSecondaryButton onClick={() => setExpanded(!expanded)}>
          <Row>
            <CustomCol space="1">{value.length}</CustomCol>
            <CustomCol space="1">
              {expanded ? <UpCircleOutlined /> : <DownCircleOutlined />}
            </CustomCol>
          </Row>
        </StyledSecondaryButton>
      </StyledTableRunColumn>
    </StyledTableRow>
  );
};
export default Result;
