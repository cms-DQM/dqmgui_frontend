import React, { useState } from 'react';
import { Col, Select, Row, Spin, Button } from 'antd';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';

import {
  StyledSelect,
  OptionParagraph,
} from '../../viewDetailsMenu/styledComponents';
import { useSearch } from '../../../hooks/useSearch';
import { QueryProps } from '../../../containers/display/interfaces';
import { getChangedQueryParams, changeRouter } from '../../../containers/display/utils';

interface DatasetsBrowserProps {
  currentDataset: string;
  query: QueryProps;
  currentRunNumber: number;
}

const { Option } = Select;

export const DatasetsBrowser = ({ currentDataset, query, currentRunNumber }: DatasetsBrowserProps) => {
  const [openSelect, setSelect] = useState(false);
  //setting  dataset field width to prev. selected dataset name field width,
  // because when spinner is shown, field becomes spinner width
  const [width, setWidth] = useState<number | undefined>();
  const { results_grouped, isLoading } = useSearch(currentRunNumber, '');
  const datasets = results_grouped.map((result) => {
    return result.dataset;
  });
  const currentDatasetNameIndex = datasets.indexOf(currentDataset);

  return (
    <Row justify="center" align="middle">
      <Col>
        <Button
          disabled={!datasets[currentDatasetNameIndex - 1]}
          type="link"
          icon={<CaretLeftFilled />}
          onClick={() => {
            changeRouter(getChangedQueryParams({ dataset_name: datasets[currentDatasetNameIndex - 1] }, query));
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
              changeRouter(getChangedQueryParams({ dataset_name: e }, query));
            }}
            value={currentDataset}
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
            changeRouter(getChangedQueryParams({ dataset_name: datasets[currentDatasetNameIndex + 1] }, query));
            setWidth(undefined);
          }}
        />
      </Col>
    </Row>
  );
};
