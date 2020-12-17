import React, { useState, useEffect } from 'react';
import { Col, Select, Row, Spin, Button } from 'antd';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';

import {
  StyledSelect,
  OptionParagraph,
} from '../../viewDetailsMenu/styledComponents';
import { useSearch } from '../../../hooks/useSearch';
import { CustomCol } from '../../styledComponents';

interface DatasetsBrowserProps {
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
  current_dataset_name,
  current_run_number,
}: DatasetsBrowserProps) => {
  const [openSelect, setSelect] = useState(false);
  const [currentDatasetNameIndex, setCurrentDatasetNameIndex] = useState<
    number
  >(0);
  const { results_grouped, isLoading } = useSearch(current_run_number, '');

  const datasets = results_grouped.map((result) => {
    return result.dataset;
  });

  useEffect(() => {
    setCurrentDatasetNameIndex(datasets.indexOf(current_dataset_name));
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
              setCurrentDatasetNameIndex(currentDatasetNameIndex - 1);
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
            value={current_dataset_name}
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
              setCurrentDatasetNameIndex(currentDatasetNameIndex + 1);
            }}
          />
        </Col>
      )}
    </Row>
  );
};
