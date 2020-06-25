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
  TableBody,
  StyledAlert,
} from './styledComponents';
import { NoResultsFound } from './noResultsFound';

interface SearchResultsInterface {
  results: any[];
  results_grouped: any[];
  isLoading: boolean;
  handler(run: string, dataset: string): any;
  errors?: string[];
}

const SearchResults: FC<SearchResultsInterface> = ({
  handler,
  results_grouped,
  isLoading,
  errors,
}) => {
  const errorsList = errors && errors.length > 0 ? errors : [];

  return (
    <StyledWrapper overflowx="hidden">
      {isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <>
          {results_grouped.length === 0 &&
          !isLoading &&
          errorsList.length === 0 ? (
            <NoResultsFound />
          ) : !isLoading && errorsList.length === 0 ? (
            <StyledTable>
              <StyledTableHead>
                <StyledTableRow noHover>
                  <StyledTableDatasetColumn>Dataset</StyledTableDatasetColumn>
                  <StyledTableRunColumn>Runs</StyledTableRunColumn>
                </StyledTableRow>
              </StyledTableHead>
              <TableBody>
                {results_grouped.map(({ dataset, value }, index) => (
                  <Result
                    key={dataset}
                    index={index}
                    handler={handler}
                    dataset={dataset}
                    value={value}
                  />
                ))}
              </TableBody>
            </StyledTable>
          ) : (
            !isLoading &&
            errorsList.length > 0 &&
            errorsList.map((error) => (
              <StyledAlert key={error} message={error} type="error" showIcon />
            ))
          )}
        </>
      )}
    </StyledWrapper>
  );
};
export default SearchResults;
