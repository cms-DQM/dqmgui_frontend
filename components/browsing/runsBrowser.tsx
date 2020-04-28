import React from 'react'
import { Col, Select } from 'antd'

import { StyledFormItem } from '../styledComponents'
import { StyledSelect } from '../viewDetailsMenu/styledComponents'
import { useRouter } from 'next/router';
import { QueryProps } from '../../containers/display/interfaces';
import { useSearch } from '../../hooks/useSearch';
import Link from 'next/link';
import { SpinnerWrapper, Spinner } from '../../containers/search/styledComponents';

const { Option } = Select;

interface RunsBrowserProps {
  value: { run: number }[] | undefined;
  run_number: number | undefined;
  setRunNumber(run: number): void;
}

export const RunBrowser = ({ value, run_number, setRunNumber }: RunsBrowserProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const { results_grouped, searching, isLoading, error } = useSearch(
    NaN,
    query.dataset_name,
  );
  const runNumbers = results_grouped.map(({ value }) => {
    return value.map((val: any) => val.run);
  })

  return (
    <Col>
      <StyledFormItem name={run_number} label='Run number:'>
        <StyledSelect defaultValue={run_number}>
          {runNumbers[0] && runNumbers[0].map((run: number) => {
            return (
              <Option
                value={run}
                key={run.toString()}
                onClick={() =>
                  setRunNumber(run)}>
                {
                  isLoading ? (
                    <Spinner />
                  ) :
                    <Link
                      href={{
                        pathname: '/',
                        query: {
                          run_number: run,
                          dataset_name: query.dataset_name,
                          folder_path: query.folder_path,
                          selected_plots: query.selected_plots,
                        },
                      }}
                    >
                      <a>{run}</a>
                    </Link>
                }
              </Option>
            )
          })}
        </StyledSelect>
      </StyledFormItem>
    </Col>
  )
}