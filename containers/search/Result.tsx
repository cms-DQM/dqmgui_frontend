import React, { FC, useState } from 'react';
import { Col } from 'antd';

import { RunsRows, StyledTableDatasetColumn, StyledTableRow, StyledTableRunColumn, StyledCol, RunWrapper, StyledA } from './styledComponents';

interface SearchResultsInterface {
  dataset: string;
  value: any[];
  handler(run: number, dataset: string): any;
  index: number;
}

const Result: FC<SearchResultsInterface> = ({ index, dataset, value, handler }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <StyledTableRow
      expanded={expanded}
      onClick={() => setExpanded(!expanded)}
      index={index}>
      <StyledTableDatasetColumn>
        <div>
          {dataset}
          {expanded && (
            <RunsRows>
              {value.map(({ run }: any) => (
                <StyledCol key={run}>
                  <RunWrapper>
                    <StyledA onClick={() => handler(run, dataset)}>{run}</StyledA>
                  </RunWrapper>

                </StyledCol>
              ))}
            </RunsRows>
          )}
        </div>
      </StyledTableDatasetColumn>
      <StyledTableRunColumn>{value.length}</StyledTableRunColumn>
    </StyledTableRow>
  );
};
export default Result;
