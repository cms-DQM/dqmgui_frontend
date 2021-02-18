import React, { useState, useEffect, useRef } from 'react';
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
  query: QueryProps;
  setCurrentRunNumber(currentRunNumber: string): void;
  withoutArrows?: boolean;
  withoutLabel?: boolean;
  selectorWidth?: string;
  current_run_number?: string;
  current_dataset_name?: string;
}

export const RunBrowser = ({
  query,
  setCurrentRunNumber,
  withoutArrows,
  withoutLabel,
  current_run_number,
  current_dataset_name,
}: RunBrowserProps) => {
  const [openSelect, setSelect] = useState(false);

  const [currentRunNumberIndex, setCurrentRunNumberIndex] = useState<number>(0);
  const dataset_name = current_dataset_name
    ? current_dataset_name
    : query.dataset_name;
  const { results_grouped, isLoading } = useSearch('', dataset_name);

  const runNumbers = results_grouped[0]
    ? results_grouped[0].runs.map((run: number) => run.toString())
    : [];

  useEffect(() => {
    const query_run_number = current_run_number
      ? current_run_number.toString()
      : query.run_number;
    setCurrentRunNumberIndex(runNumbers.indexOf(query_run_number));
  }, [runNumbers, isLoading]);

  return (
    <Col>
      <StyledFormItem
        labelcolor="white"
        name={'dataset_name'}
        label={`${!withoutLabel ? 'Run' : ''}`}
      >
        <Row justify="center" align="middle">
          {!withoutArrows && (
            <Col>
              <Button
                disabled={!runNumbers[currentRunNumberIndex - 1]}
                icon={<CaretLeftFilled />}
                type="link"
                onClick={() => {
                  setCurrentRunNumber(runNumbers[currentRunNumberIndex - 1]);
                }}
              />
            </Col>
          )}
          <Col>
            <div>
              <StyledSelect
                width={'100px'}
                onClick={() => setSelect(!openSelect)}
                value={runNumbers[currentRunNumberIndex]}
                onChange={(e: any) => {
                  setCurrentRunNumber(e);
                  setSelect(!openSelect);
                }}
                showSearch={true}
                open={openSelect}
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
                            <div>{run}</div>
                          )}
                      </Option>
                    );
                  })}
              </StyledSelect>
            </div>
          </Col>
          {!withoutArrows && (
            <Col>
              <Button
                icon={<CaretRightFilled />}
                disabled={!runNumbers[currentRunNumberIndex + 1]}
                type="link"
                onClick={() => {
                  setCurrentRunNumber(runNumbers[currentRunNumberIndex + 1]);
                }}
              />
            </Col>
          )}
        </Row>
      </StyledFormItem>
    </Col>
  );
};
