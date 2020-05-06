import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Select, Spin, Button } from 'antd';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';
import Router from 'next/router';

import { StyledFormItem } from '../styledComponents';
import { StyledSelect } from '../viewDetailsMenu/styledComponents';
import { useRouter } from 'next/router';
import { QueryProps } from '../../containers/display/interfaces';
import { useSearch } from '../../hooks/useSearch';

const { Option } = Select;

const getRunNumbers = (results_grouped: any[]) => {
  const runs: number[] = [];
  results_grouped.forEach((result) => {
    result.value.forEach((data: any) => {
      runs.push(data.run);
    });
  });
  return runs;
};

export const RunBrowser = () => {
  const inputEl = useRef(null);
  const router = useRouter();
  const query: QueryProps = router.query;
  const run_number = query.run_number ? query.run_number : NaN;
  const [currentRunNumber, setCurrentRunNumber] = useState(run_number);

  useEffect(() => {
    Router.replace({
      pathname: '/',
      query: {
        run_number: currentRunNumber,
        dataset_name: query.dataset_name,
        folder_path: query.folder_path,
        overlay: query.overlay,
        overlay_data: query.overlay_data,
        selected_plots: query.selected_plots,
      },
    });
  }, [currentRunNumber]);

  const { results_grouped, searching, isLoading, error } = useSearch(
    NaN,
    query.dataset_name
  );

  const runNumbers = getRunNumbers(results_grouped);
  const currentRunNumberIndex = runNumbers.indexOf(currentRunNumber);

  return (
    <Col>
      <StyledFormItem name={currentRunNumber} label="Run number:">
        <Row justify="center" align="middle">
          <Col>
            <Button
              disabled={!runNumbers[currentRunNumberIndex - 1]}
              icon={<CaretLeftFilled />}
              type="link"
              onClick={() =>
                setCurrentRunNumber(runNumbers[currentRunNumberIndex - 1])
              }
            />
          </Col>
          <Col>
            <StyledSelect
              value={currentRunNumber}
              onChange={(e: any) => setCurrentRunNumber(e)}
            >
              {runNumbers &&
                runNumbers.map((run: number) => {
                  return (
                    <Option value={run} key={run.toString()}>
                      {isLoading ? <Spin /> : <p>{run}</p>}
                    </Option>
                  );
                })}
            </StyledSelect>
          </Col>
          <Col>
            <Button
              icon={<CaretRightFilled />}
              disabled={!runNumbers[currentRunNumberIndex + 1]}
              type="link"
              onClick={() =>
                setCurrentRunNumber(runNumbers[currentRunNumberIndex + 1])
              }
            />
          </Col>
        </Row>
      </StyledFormItem>
    </Col>
  );
};
