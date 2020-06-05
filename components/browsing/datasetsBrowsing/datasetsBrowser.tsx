import React, { useState, useRef } from 'react';
import { Col, Select, Row, Spin, Button } from 'antd';
import { useRouter } from 'next/router';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';

import {
  StyledSelect,
  OptionParagraph,
} from '../../viewDetailsMenu/styledComponents';
import { QueryProps } from '../../../containers/display/interfaces';
import { useSearch } from '../../../hooks/useSearch';
import { useChangeRouter } from '../../../hooks/useChangeRouter';

const { Option } = Select;

export const DatasetsBrowser = () => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const [currentDataset, setCurrentDataset] = useState<string | undefined>(
    query.dataset_name
  );
  const [openSelect, setSelect] = useState(false);
  const refElem = useRef(0);
  //setting  dataset field width to prev. selected dataset name field width,
  // because when spinner is shown, field becomes spinner width
  const [width, setWidth] = useState<number | undefined>();

  const { results, results_grouped, searching, isLoading, errors } = useSearch(
    query.run_number,
    ''
  );
  const datasets = results_grouped.map((result) => {
    return result.dataset;
  });

  useChangeRouter({ dataset_name: currentDataset }, [currentDataset], true);

  const currentDatasetNameIndex = datasets.indexOf(currentDataset);

  return (
    <Row justify="center" align="middle">
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
              setCurrentDataset(e);
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
            setCurrentDataset(datasets[currentDatasetNameIndex + 1]);
            setWidth(undefined);
          }}
        />
      </Col>
    </Row>
  );
};
