import React, { FC, useState } from 'react';
import { Col } from 'antd';

import { RunsRows, ExpandedRow, StyledCol, RunWrapper } from './styledComponents';

interface SearchResultsInterface {
  dataset: string;
  value: any[];
  handler(run: number, dataset: string): any;
}

const Result: FC<SearchResultsInterface> = ({ dataset, value, handler }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ExpandedRow expanded={expanded} onClick={() => setExpanded(!expanded)}>
      {dataset}
      {expanded && (
        <RunsRows>
          <StyledCol >Runs:</StyledCol>
          {value.map(({ run }: any) => (
            <StyledCol key={run}>
              <RunWrapper>
                <a onClick={() => handler(run, dataset)}>{run}</a>
              </RunWrapper>

            </StyledCol>
          ))}
        </RunsRows>
      )}
    </ExpandedRow>
  );
};
export default Result;
