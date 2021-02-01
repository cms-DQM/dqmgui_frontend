import React, { FC, useEffect, useRef, useState } from 'react';
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
  handler(run: string, dataset: string): any;
  index: number;
}

const Result: FC<SearchResultsInterface> = ({
  index,
  dataset,
  runs,
  handler,
}) => {
  const [expanded, setExpanded] = useState(false);

const tdRef = useRef(null)
useEffect(()=>{

},[])

  return (
    <StyledTableRow expanded={expanded} index={index}>
      <StyledTableDatasetColumn ref={tdRef}>
        <div>
          {dataset}
          {expanded && (
            <RunsRows>
              {runs.map((run) => (
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
