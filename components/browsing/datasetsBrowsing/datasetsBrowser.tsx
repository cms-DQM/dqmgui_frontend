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
}

const { Option } = Select;

export const DatasetsBrowser = ({
  withoutArrows,
  setCurrentDataset,
  selectorWidth,
  query,
}: DatasetsBrowserProps) => {
  const [openSelect, setSelect] = useState(false);
  //setting  dataset field width to prev. selected dataset name field width,
  // because when spinner is shown, field becomes spinner width

  const [width, setWidth] = useState<number>();
  const [currentDatasetNameIndex, setCurrentDatasetNameIndex] = useState<number>(0);

  const { results_grouped, isLoading } = useSearch(query.run_number, '');

  const datasets = results_grouped.map((result) => {
    return result.dataset;
  });

  useEffect(() => {
    const query_dataset = query.dataset_name ? query.dataset_name : ''
    setCurrentDatasetNameIndex(datasets.indexOf(query_dataset))
  }, [query.dataset_name, query.run_number, datasets])

  return (
    <Row
      justify="center"
      align="middle"
      style={{ width: selectorWidth ? selectorWidth : '' }}
    >
      {!withoutArrows && (
        <Col>
          <Button
            disabled={!datasets[currentDatasetNameIndex - 1]}
            type="link"
            icon={<CaretLeftFilled />}
            onClick={() => {
              setCurrentDataset(datasets[currentDatasetNameIndex - 1]);
              setWidth(undefined);
            }}
          />
        </Col>
      )}
      <CustomCol width={selectorWidth}>
        <div
          ref={(refElem: HTMLDivElement) => {
            if (refElem && !openSelect) {
              setWidth(refElem.clientWidth);
            }
          }}
        >
          <StyledSelect
            onChange={(e: any) => {
              setCurrentDataset(e);
            }}
            value={datasets[currentDatasetNameIndex]}
            dropdownMatchSelectWidth={false}
            onClick={() => setSelect(!openSelect)}
            open={openSelect}
            width={selectorWidth ? selectorWidth : `${width}px`}
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
      </CustomCol>
      {!withoutArrows && (
        <Col>
          <Button
            type="link"
            disabled={!datasets[currentDatasetNameIndex + 1]}
            icon={<CaretRightFilled />}
            onClick={() => {
              setCurrentDataset(datasets[currentDatasetNameIndex + 1]);
              setWidth(undefined);
            }}
          />
        </Col>
      )}
    </Row>
  );
};
