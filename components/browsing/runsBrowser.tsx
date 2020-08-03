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
  query: QueryProps;
  setCurrentRunNumber(currentRunNumber: string): void;
  withoutArrows?: boolean;
  withoutLabel?: boolean;
}

const getRunNumbers = (results_grouped: any[]) => {
  const runs: string[] = [];
  results_grouped.forEach((result) => {
    result.value.forEach((data: any) => {
      runs.push(data.run.toString());
    });
  });
  return runs;
};

export const RunBrowser = ({
  query,
  setCurrentRunNumber,
  withoutArrows,
  withoutLabel,
}: RunBrowserProps) => {
  const [openSelect, setSelect] = useState(false);

  //seting  run field width to prev. selected run name field width,
  // because when spinner is shown, field becomes spinner width
  const [width, setWidth] = useState<string | undefined>();
  const [currentRunNumberIndex, setCurrentRunNumberIndex] = useState<number>(0);

  const { results_grouped, isLoading } = useSearch('', query.dataset_name);

  const runNumbers = getRunNumbers(results_grouped);

  useEffect(() => {
    const query_run_number = query.run_number ? query.run_number : '';
    setCurrentRunNumberIndex(runNumbers.indexOf(query_run_number));
  }, [query.dataset_name, query.run_number, runNumbers]);

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
                  setWidth(undefined);
                  setCurrentRunNumber(runNumbers[currentRunNumberIndex - 1]);
                }}
              />
            </Col>
          )}
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
                // value={query.run_number}
                value={runNumbers[currentRunNumberIndex]}
                onChange={(e: any) => {
                  setCurrentRunNumber(e);
                  setSelect(!openSelect);
                }}
                showSearch={true}
                open={openSelect}
                // style={{width: `${width}px`}}
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
          {!withoutArrows && (
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
            </Col>
          )}
        </Row>
      </StyledFormItem>
    </Col>
  );
};
