import React, { FC, useState } from 'react';
import Link from 'next/link';
import { Col } from 'antd';

import { RunsRows, ExpandedRow } from './styledComponents';

interface SearchResultsInterface {
  dataset: string;
  value: any[];
}

const Result: FC<SearchResultsInterface> = ({ dataset, value }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ExpandedRow expanded={expanded} onClick={() => setExpanded(!expanded)}>
      {dataset}
      {expanded && (
        <RunsRows>
          <Col span={2}>Runs:</Col>
          {value.map(({ run }: any) => (
            <Col span={2} key={run}>
              <Link
                href={{
                  pathname: '/',
                  query: {
                    run_number: run,
                    dataset_name: dataset,
                    folder_path: '/'
                  },
                }}
              >
                <a>{run}</a>
              </Link>
            </Col>
          ))}
        </RunsRows>
      )}
    </ExpandedRow>
  );
};
export default Result;
