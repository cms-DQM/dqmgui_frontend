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
import { Row } from 'antd';
import {
  StyledSecondaryButton,
  CustomCol,
} from '../../components/styledComponents';

interface SearchResultsInterface {
  dataset: string;
  runs: string[];
  handler(run: string, dataset: string, e: any): any;
  index: number;
}

const Result: FC<SearchResultsInterface> = ({
  index,
  dataset,
  runs,
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
              {runs.map((run) => (
                <StyledCol key={run}>
                  <RunWrapper
                    onClick={(e) => handler(run, dataset, e)}
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
            <CustomCol space="1">{runs.length}</CustomCol>
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
