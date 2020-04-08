import React, { FC, useState } from 'react';
import Link from 'next/link';
import { Col } from 'antd'
import { useRouter } from 'next/router'

import { RunsRows, ExpandedRow } from './styledComponents'

interface SearchResultsInterface {
  dataset: string;
  value: any[];
}

const Result: FC<SearchResultsInterface> = ({ dataset, value }) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter()
console.log(router.asPath)
  return (
    <ExpandedRow expanded={expanded} onClick={() => setExpanded(!expanded)}>
      {dataset}
      {expanded && (
        <RunsRows>
          <Col span={2}>
            Runs:
          </Col>
          {value.map(({ run }: any) => (
            <Col span={2} key={run}>
              <Link
                href={{
                  pathname: '/',
                  query: {
                    run_number: run,
                    dataset_name: dataset,
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
