import React, { useState, useEffect } from 'react';
import { Col, Select, Row, Spin, Button } from 'antd';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';

import {
  StyledSelect,
  OptionParagraph,
} from '../../viewDetailsMenu/styledComponents';
import { useSearch } from '../../../hooks/useSearch';
import { QueryProps } from '../../../containers/display/interfaces';
import { CustomCol } from '../../styledComponents';

interface DatasetsBrowserProps {
  query: QueryProps;
  setCurrentDataset(currentDataset: string): void;
  withoutArrows?: boolean;
  selectorWidth?: string;
  current_dataset_name?: string;
  current_run_number?: string;
}

const { Option } = Select;

export const DatasetsBrowser = ({
  withoutArrows,
  setCurrentDataset,
  selectorWidth,
  query,
  current_dataset_name,
  current_run_number,
}: DatasetsBrowserProps) => {
  const [openSelect, setSelect] = useState(false);
  const [currentDatasetNameIndex, setCurrentDatasetNameIndex] = useState<
    number
  >(0);
  const run_number = current_run_number ? current_run_number : query.run_number;
  const { results_grouped, isLoading } = useSearch(run_number, '');

  const datasets = results_grouped.map((result) => {
    return result.dataset;
  });

  useEffect(() => {
    const query_dataset = current_dataset_name
      ? current_dataset_name
      : query.dataset_name;
    setCurrentDatasetNameIndex(datasets.indexOf(query_dataset));
  }, [isLoading, datasets]);

  return (
    <Row justify="center" align="middle">
      {!withoutArrows && (
        <Col>
          <Button
            disabled={!datasets[currentDatasetNameIndex - 1]}
            type="link"
            icon={<CaretLeftFilled />}
            onClick={() => {
              setCurrentDataset(datasets[currentDatasetNameIndex - 1]);
            }}
          />
        </Col>
      )}
      <CustomCol width={selectorWidth}>
        <div>
          <StyledSelect
            onChange={(e: any) => {
              setCurrentDataset(e);
            }}
            value={datasets[currentDatasetNameIndex]}
            dropdownMatchSelectWidth={false}
            onClick={() => setSelect(!openSelect)}
            open={openSelect}
            showSearch={true}
          >
            {results_grouped.map((result) => (
              <Option
                onClick={() => {
                  setSelect(false);
                }}
                value={result.dataset}
                key={result.dataset}
              >
                {isLoading ? (
                  <OptionParagraph>
                    <Spin />
                  </OptionParagraph>
                ) : (
                    <p>{result.dataset}</p>
                  )}
              </Option>
            ))}
          </StyledSelect>
        </div>
      </CustomCol>
      {!withoutArrows && (
        <Col>
          <Button
            type="link"
            disabled={!datasets[currentDatasetNameIndex + 1]}
            icon={<CaretRightFilled />}
            onClick={() => {
              setCurrentDataset(datasets[currentDatasetNameIndex + 1]);
            }}
          />
        </Col>
      )}
    </Row>
  );
};
