import { FC } from 'react';
import Link from 'next/link';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import Result, { ExpandedProps } from './Result';

interface SearchResultsInterface {
  results: any[];
  results_grouped: ExpandedProps;
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
            {Object.keys(results_grouped).length === 0 && !isLoading && (
              <h3>No results found</h3>
            )}
            <ul>
              <Result results={results_grouped} />
            </ul>
          </div>
        )}
    </div>
  );
};
export default SearchResults;
