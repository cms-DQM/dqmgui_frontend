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
  NotFoundDiv,
  Icon,
  NotFoundDivWrapper,
  TableBody,
} from './styledComponents';

interface SearchResultsInterface {
  results: any[];
  results_grouped: any[];
  isLoading: boolean;
  handler(run: number, dataset: string): any;
}

const SearchResults: FC<SearchResultsInterface> = ({
  handler,
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
        <>
          {results_grouped.length === 0 && !isLoading ? (
            <NotFoundDivWrapper>
              <NotFoundDiv>
                <Icon />
                <div>No Results Found</div>
              </NotFoundDiv>
            </NotFoundDivWrapper>
          ) : (
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
          )}
        </>
      )}
    </StyledWrapper>
  );
};
export default SearchResults;
