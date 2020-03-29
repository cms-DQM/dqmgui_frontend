import { FC, useState } from 'react';
import Link from 'next/link';

interface SearchResultsInterface {
  dataset: string;
  value: any[];
  style: any;
}
const Result: FC<SearchResultsInterface> = ({ dataset, value, style }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <li style={style} onClick={e => setExpanded(!expanded)}>
      {dataset}
      {expanded && (
        <ul>
          {value.map(({ run }: any) => (
            <li key={run}>
              <Link
                href={{
                  pathname: '/',
                  query: {
                    run_number: run,
                    dataset_name: dataset
                  }
                }}
              >
                <a>{run}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
export default Result;
