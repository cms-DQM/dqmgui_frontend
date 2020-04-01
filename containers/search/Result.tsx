import { FC, useState } from 'react';
import Link from 'next/link';

interface SearchResultsInterface {
  results: any
}

interface DataProps {
  dataset: string,
  run: number
}

export interface ExpandedProps {
  [dataset: string]: DataProps[],
}

const Result: FC<SearchResultsInterface> = ({ results }) => {
  const [expanded, setExpanded] = useState<ExpandedProps>({});
  const dataset_names = Object.keys(results)

  return (
    <>
      {dataset_names.map((dataset_name: string) =>
        <li
          key={dataset_name}
          onClick={e => setExpanded({ [dataset_name]: results[dataset_name] })}>
          {dataset_name}
          <ul>
            {expanded[dataset_name] && expanded[dataset_name].map((data: DataProps) => (
              <li
                key={data.run}>
                <Link
                  href={{
                    pathname: '/',
                    query: {
                      run_number: data.run,
                      dataset_name: data.dataset
                    }
                  }}
                >
                  <a>{data.run}</a>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      )}
    </>
  );
};
export default Result;
