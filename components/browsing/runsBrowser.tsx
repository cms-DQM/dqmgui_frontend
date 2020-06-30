import React, { useState, useEffect } from 'react';
import { Col, Row, Select, Spin, Button } from 'antd';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';

import { StyledFormItem } from '../styledComponents';
import {
  StyledSelect,
  OptionParagraph,
} from '../viewDetailsMenu/styledComponents';
import { useSearch } from '../../hooks/useSearch';
import { QueryProps } from '../../containers/display/interfaces';

const { Option } = Select;

interface RunBrowserProps {
  currentRunNumber: string;
  currentDataset: string;
  query: QueryProps;
  setCurrentRunNumber(currentRunNumber: string): void;
  withoutArrows?: boolean;
  withoutLabel?: boolean
}

const getRunNumbers = (results_grouped: any[]) => {
  const runs: (string)[] = [];
  results_grouped.forEach((result) => {
    result.value.forEach((data: any) => {
      runs.push(data.run);
    });
  });
  return runs;
};

export const RunBrowser = ({ currentDataset, query, setCurrentRunNumber, withoutArrows, currentRunNumber, withoutLabel }: RunBrowserProps) => {
  const [openSelect, setSelect] = useState(false);

  //seting  run field width to prev. selected run name field width,
  // because when spinner is shown, field becomes spinner width
  const [width, setWidth] = useState<string | undefined>();

  const { results_grouped, isLoading } = useSearch('', currentDataset);

  const runNumbers = getRunNumbers(results_grouped);
  const query_run_number = query.run_number ? query.run_number : ''
  const currentRunNumberIndex = runNumbers.indexOf(query_run_number);

  useEffect(() => {
    setCurrentRunNumber(currentRunNumber);
  }, [currentRunNumber])

  return (
    <Col>
      <StyledFormItem labelcolor="white" name={'dataset_name'} label={`${!withoutLabel ? 'Run' : ''}`}>
        <Row justify="center" align="middle">
          {!withoutArrows &&
            <Col>
              <Button
                disabled={!runNumbers[currentRunNumberIndex - 1]}
                icon={<CaretLeftFilled />}
                type="link"
                onClick={() => {
                  setWidth(undefined);
                  setCurrentRunNumber(runNumbers[currentRunNumberIndex - 1]);
                }}
              />
            </Col>}
          <Col>
            <div
              ref={(refElem: HTMLDivElement) => {
                if (refElem && !openSelect) {
                  setWidth(refElem.clientWidth.toString());
                }
              }}
            >
              <StyledSelect
                onClick={() => setSelect(!openSelect)}
                value={currentRunNumber}
                onChange={(e: any) => {
                  setCurrentRunNumber(e);
                  setSelect(!openSelect);
                }}
                showSearch={true}
                open={openSelect}
                width={`${width}px`}
              >
                {runNumbers &&
                  runNumbers.map((run: any) => {
                    return (
                      <Option
                        onClick={() => {
                          setSelect(false);
                        }}
                        value={run}
                        key={run.toString()}
                      >
                        {isLoading ? (
                          <OptionParagraph>
                            <Spin />
                          </OptionParagraph>
                        ) : (
                            <div onClick={() => setWidth(undefined)}>{run}</div>
                          )}
                      </Option>
                    );
                  })}
              </StyledSelect>
            </div>
          </Col>
          {!withoutArrows &&
            <Col>
              <Button
                icon={<CaretRightFilled />}
                disabled={!runNumbers[currentRunNumberIndex + 1]}
                type="link"
                onClick={() => {
                  setWidth(undefined);
                  setCurrentRunNumber(runNumbers[currentRunNumberIndex + 1]);
                }}
              />
            </Col>}
        </Row>
      </StyledFormItem>
    </Col>
  );
};
