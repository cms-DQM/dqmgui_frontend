import React, { useState } from 'react';
import { Col, Select, Row, Spin, Button } from 'antd';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';

import {
  StyledSelect,
  OptionParagraph,
} from '../../viewDetailsMenu/styledComponents';
import { useSearch } from '../../../hooks/useSearch';
import { QueryProps } from '../../../containers/display/interfaces';

interface DatasetsBrowserProps {
  currentDataset: string;
  query: QueryProps;
  currentRunNumber: string;
  setCurrentDataset(currentDataset: string): void;
}

const { Option } = Select;

export const DatasetsBrowser = ({ setCurrentDataset, query, currentRunNumber }: DatasetsBrowserProps) => {
  const [openSelect, setSelect] = useState(false);
  //setting  dataset field width to prev. selected dataset name field width,
  // because when spinner is shown, field becomes spinner width
  const [width, setWidth] = useState<number | undefined>();
  const { results_grouped, isLoading } = useSearch(currentRunNumber, '');

  const datasets = results_grouped.map((result) => {
    return result.dataset;
  });

  const query_dataset = query.dataset_name ? query.dataset_name : ''
  const currentDatasetNameIndex = datasets.indexOf(query_dataset);

  return (
    <Row justify="center" align="middle">
      <Col>
        <Button
          disabled={!datasets[currentDatasetNameIndex - 1]}
          type="link"
          icon={<CaretLeftFilled />}
          onClick={() => {
            setCurrentDataset(datasets[currentDatasetNameIndex - 1])
            setWidth(undefined);
          }}
        />
      </Col>
      <Col>
        <div
          ref={(refElem: HTMLDivElement) => {
            if (refElem && !openSelect) {
              setWidth(refElem.clientWidth);
            }
          }}
        >
          <StyledSelect
            onChange={(e: any) => {
              setCurrentDataset(e)
            }}
            value={query_dataset}
            dropdownMatchSelectWidth={false}
            onClick={() => setSelect(!openSelect)}
            open={openSelect}
            width={width}
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
                    <p onClick={() => setWidth(undefined)}>{result.dataset}</p>
                  )}
              </Option>
            ))}
          </StyledSelect>
        </div>
      </Col>
      <Col>
        <Button
          type="link"
          disabled={!datasets[currentDatasetNameIndex + 1]}
          icon={<CaretRightFilled />}
          onClick={() => {
            setCurrentDataset(datasets[currentDatasetNameIndex + 1])
            setWidth(undefined);
          }}
        />
      </Col>
    </Row>
  );
};
