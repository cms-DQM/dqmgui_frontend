import React, { useState, useEffect } from 'react';
import { Col, Row, Select, Spin, Button } from 'antd';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';

import { StyledFormItem } from '../styledComponents';
import {
  StyledSelect,
  OptionParagraph,
} from '../viewDetailsMenu/styledComponents';
import { useSearch } from '../../hooks/useSearch';

const { Option } = Select;

interface RunBrowserProps {
  setCurrentRunNumber(currentRunNumber: string): void;
  withoutArrows?: boolean;
  withoutLabel?: boolean;
  selectorWidth?: string;
  current_run_number?: string;
  current_dataset_name?: string;
  a?: string;
}

export const RunBrowser = ({
  setCurrentRunNumber,
  withoutArrows,
  withoutLabel,
  current_dataset_name,
  current_run_number,
  a
}: RunBrowserProps) => {
  const [openSelect, setSelect] = useState(false);

  const [currentRunNumberIndex, setCurrentRunNumberIndex] = useState<number>(0);
  const { results_grouped, isLoading } = useSearch('', current_dataset_name, a);
  const runNumbers = results_grouped[0]
    ? results_grouped[0].runs.map((run: number) => run.toString())
    : [];

  useEffect(() => {
    if (currentRunNumberIndex > 0) {
      setCurrentRunNumber(runNumbers[currentRunNumberIndex])
    }
  }, [currentRunNumberIndex])

  useEffect(() => {
    setCurrentRunNumberIndex(runNumbers.indexOf(current_run_number))
  }, [])

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
                  setCurrentRunNumberIndex(currentRunNumberIndex - 1)
                }}
              />
            </Col>
          )}
          <Col>
            <div>
              <StyledSelect
                onClick={() => setSelect(!openSelect)}
                value={current_run_number}
                onChange={(e: any) => {
                  setSelect(!openSelect);
                  setCurrentRunNumberIndex(runNumbers.indexOf(e))
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
                  setCurrentRunNumberIndex(currentRunNumberIndex + 1)
                }}
              />
            </Col>
          )}
        </Row>
      </StyledFormItem>
    </Col>
  );
};
