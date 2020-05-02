import React, { useState, useEffect } from 'react';
import { Col, Select, Row, Spin, Button } from 'antd';
import { useRouter } from 'next/router';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';
import Router from 'next/router';

import { StyledSelect } from '../../viewDetailsMenu/styledComponents';
import { QueryProps } from '../../../containers/display/interfaces';
import { useSearch } from '../../../hooks/useSearch';

const { Option } = Select;

export const DatasetsBrowser = () => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const [currentDataset, setCurrentDataset] = useState(query.dataset_name)

  const { results, results_grouped, searching, isLoading, error } = useSearch(
    query.run_number,
    ''
  );
  const datasets = results_grouped.map(result => {
    return result.dataset
  });

  useEffect(() => {
    Router.replace({
      pathname: '/',
      query: {
        run_number: query.run_number,
        dataset_name: currentDataset,
        folder_path: query.folder_path,
        overlay: query.overlay,
        overlay_data: query.overlay_data,
        selected_plots: query.selected_plots,
      },
    });
  }, [currentDataset])

  const currentDatasetNameIndex = datasets.indexOf(currentDataset)

  return (
    <Row justify="center" align="middle">
      <Col>
        <Button
          disabled={!datasets[currentDatasetNameIndex - 1]}
          type="link"
          icon={<CaretLeftFilled />}
          onClick={() =>
            setCurrentDataset(datasets[currentDatasetNameIndex - 1])} />
      </Col>
      <Col>
        <StyledSelect
          onChange={(e: any) => {
            setCurrentDataset(e)
          }}
          value={currentDataset}
          dropdownMatchSelectWidth={false}
        >
          {results_grouped.map((result) => (
            <Option
              value={result.dataset}
              key={result.dataset}
            >
              {isLoading ? (
                <Spin />
              ) : (
                  <p>{result.dataset}</p>
                )}
            </Option>
          ))}
        </StyledSelect>
      </Col>
      <Col>
        <Button
          type="link"
          disabled={!datasets[currentDatasetNameIndex + 1]}
          icon={< CaretRightFilled />}
          onClick={() =>
            setCurrentDataset(datasets[currentDatasetNameIndex + 1])
          }
        />
      </Col>
    </Row>
  );
};
