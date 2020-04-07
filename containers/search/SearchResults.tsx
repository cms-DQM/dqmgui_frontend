import React, { FC } from 'react';
// import Link from 'next/link';
// import { FixedSizeList as List } from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer';

import Result from './Result';

interface SearchResultsInterface {
  results: any[];
  results_grouped: any[];
  isLoading: boolean;
}

const SearchResults: FC<SearchResultsInterface> = ({
  results,
  results_grouped,
  isLoading
}) => {
  return (
    <div>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
          <div>
            {results_grouped.length === 0 && !isLoading && (
              <h3>No results found</h3>
            )}
            <ul>
              {results_grouped.map(({ dataset, value }) => (
                <Result key={dataset} dataset={dataset} value={value} />
              ))}

              {/* <AutoSizer>
            {({ height, width }) => ( */}
              {/* <List
                className="List"
                height={1000}
                itemCount={results_grouped.length}
                itemSize={35}
                width={1000}
              >
                {({ index, style }) => (
                  <Result
                    style={style}
                    dataset={results_grouped[index].dataset}
                    value={results_grouped[index].value}
                  />
                )}
              </List> */}
            </ul>
          </div>
        )}
    </div>
  );
};
export default SearchResults;
