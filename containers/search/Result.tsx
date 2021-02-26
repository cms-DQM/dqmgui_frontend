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
  StyledAlert,
} from './styledComponents';
import { Button, Row } from 'antd';
import {
  StyledSecondaryButton,
  CustomCol,
} from '../../components/styledComponents';

interface SearchResultsInterface {
  dataset: string;
  runs: string[];
  handler(run: string, dataset: string, e: any): any;
  index: number;
  alreadySeletected?: any[]
}

const Result: FC<SearchResultsInterface> = ({
  index,
  dataset,
  runs,
  handler,
  alreadySeletected,
}) => {
  const [expanded, setExpanded] = useState(false);
  const selectedMaximum = alreadySeletected ?  alreadySeletected.length >= 8 : false
    return (
      <StyledTableRow expanded={expanded} index={index}>
        <StyledTableDatasetColumn>
          <div>
            {dataset}
            {expanded && (
              <RunsRows>
                {runs.map((run) => {
                  const current = { run_number: run, dataset_name: dataset }
                  const isAlreadySelected = alreadySeletected && alreadySeletected.length > 0 ? alreadySeletected.findIndex(selected => (
                    selected.dataset_name === current.dataset_name &&  selected.run_number === current.run_number
                  )) : -1
                  const disabled = selectedMaximum ? true : isAlreadySelected >=0
                  console.log(selectedMaximum, isAlreadySelected)

                  return <StyledCol key={run}>
                    <RunWrapper
                      onClick={(e) => !disabled && handler(run, dataset, e)}
                      hover="true"
                      disabled={disabled.toString()}
                    >
                      <StyledA aria-disabled={disabled}>{run}</StyledA>
                    </RunWrapper>
                  </StyledCol>
                })}
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
