import React from 'react';
import { Col, Select } from 'antd';
import { useRouter } from 'next/router';

import { StyledFormItem } from '../styledComponents';
import { StyledSelect } from '../viewDetailsMenu/styledComponents';
import { QueryProps } from '../../containers/display/interfaces';
import { useSearch } from '../../hooks/useSearch';
import Link from 'next/link';
import {
  Spinner,
  SpinnerWrapper,
} from '../../containers/search/styledComponents';

const { Option } = Select;

interface DatasetsBrowserProps {
  setValue(value: any): void;
  datasetName: string | undefined;
  setDatasetName(name: string): void;
}

export const DatasetsBrowser = ({
  setValue,
  datasetName,
  setDatasetName,
}: DatasetsBrowserProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const { results, results_grouped, searching, isLoading, error } = useSearch(
    query.run_number,
    ''
  );

  return (
    <Col>
      <StyledFormItem label={'Dataset Name:'}>
        <StyledSelect defaultValue={datasetName}>
          {results_grouped.map((result) => (
            <Option
              value={result.dataset}
              key={name}
              onClick={() => {
                setDatasetName(result.dataset);
                setValue(result.value);
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <Link
                  href={{
                    pathname: '/',
                    query: {
                      run_number: query.run_number,
                      dataset_name: result.dataset,
                      folder_path: query.folder_path,
                      overlay: query.overlay,
                      overlay_data: query.overlay_data,
                      selected_plots: query.selected_plots,
                    },
                  }}
                >
                  <a>{result.dataset}</a>
                </Link>
              )}
            </Option>
          ))}
        </StyledSelect>
      </StyledFormItem>
    </Col>
  );
};
