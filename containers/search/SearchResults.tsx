import React, { FC, useEffect } from 'react';
import {message} from 'antd'

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
  results_grouped: any[];
  isLoading: boolean;
  handler(run: string, dataset: string, e: any): any;
  errors?: string[];
  alreadySeletected?: any[];
}
const warning = () => {
  message.warning('Maximum can be overlaid 8 plots in total');
};

const SearchResults: FC<SearchResultsInterface> = ({
  handler,
  results_grouped,
  isLoading,
  errors,
  alreadySeletected
}) => {

  const selectedMaximum = alreadySeletected.length >= 8
  useEffect(()=>{
    if(selectedMaximum){
      warning()
    }
  },[selectedMaximum])
  const errorsList = errors && errors.length > 0 ? errors : [];
  const justRunsAndDataset = alreadySeletected.map(selected => {
    return { run_number: selected.run_number, dataset_name: selected.dataset_name }
  })
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
                    {results_grouped.map(({ dataset, runs }, index) => (
                      <Result
                        alreadySeletected={justRunsAndDataset}
                        key={dataset}
                        index={index}
                        handler={handler}
                        dataset={dataset}
                        runs={runs}
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
