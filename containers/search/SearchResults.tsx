import React, { FC } from 'react';

import Result from './Result';
import {
  StyledWrapper,
  Spinner,
  SpinnerWrapper,
  StyledTableHead,
  StyledTableRunColumn,
  StyledTableDatasetColumn,
  StyledTableRow,
  StyledTable,
} from './styledComponents';

interface SearchResultsInterface {
  results: any[];
  results_grouped: any[];
  isLoading: boolean;
}

const SearchResults: FC<SearchResultsInterface> = ({
  results,
  results_grouped,
  isLoading,
}) => {
  return (
    <StyledWrapper>
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <StyledTable>
          {results_grouped.length === 0 && !isLoading && (
            <h3>No results found</h3>
          )}
          <StyledTableHead>
            <StyledTableRow noHover>
              <StyledTableDatasetColumn>Dataset</StyledTableDatasetColumn>
              <StyledTableRunColumn>Runs</StyledTableRunColumn>
            </StyledTableRow>
          </StyledTableHead>
          <tbody>
            {results_grouped.map(({ dataset, value }, index) => (
              <StyledTableRow index={index} key={index}>
                <StyledTableDatasetColumn>
                  <Result key={dataset} dataset={dataset} value={value} />
                </StyledTableDatasetColumn>
                <StyledTableRunColumn>{value.length}</StyledTableRunColumn>
              </StyledTableRow>
            ))}
          </tbody>
        </StyledTable>
      )}
    </StyledWrapper>
  );
};
export default SearchResults;
