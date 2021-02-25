import * as React from 'react';
import { Row } from 'antd';

import { Wrapper } from '../styledComponents';
import {
  SpinnerWrapper,
  Spinner,
  StyledAlert,
} from '../../search/styledComponents';
import { NoResultsFound } from '../../search/noResultsFound';
import { CustomRow } from '../../../components/styledComponents';
import { Directories } from './directories';
import { LeftSidePlots } from '../../../components/plots/plot';
import {
  PlotDataProps,
  PlotsGroupedByLayoutsInterface,
  OptionProps,
  QueryProps,
} from '../interfaces';
import { isItLiveMode } from '../../../utils';

interface ContentProps {
  plots: PlotDataProps[];
  selected_plots: any[];
  plots_grouped_by_layouts?: PlotsGroupedByLayoutsInterface;
  isLoading: boolean;
  viewPlotsPosition: OptionProps;
  proportion: OptionProps;
  errors: string[];
  filteredFolders: any[];
  query: QueryProps;
  plotsAreaRef: any;
}

export const DisplayFordersOrPlots = ({
  plots,
  selected_plots,
  plots_grouped_by_layouts,
  isLoading,
  viewPlotsPosition,
  proportion,
  errors,
  query,
  filteredFolders,
  plotsAreaRef
}: ContentProps) => {

  return (
    <Wrapper
      ref={plotsAreaRef}
      any_selected_plots={selected_plots.length > 0 && errors.length === 0}
      position={viewPlotsPosition}
      proportion={proportion}
    >
      {isItLiveMode({ run_number: query.run_number, dataset_name: query.dataset_name }) && isLoading && filteredFolders.length === 0
        || !isItLiveMode({ run_number: query.run_number, dataset_name: query.dataset_name }) && isLoading ? (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        ) : (
          <>
            {!isLoading &&
              filteredFolders.length === 0 &&
              plots.length === 0 &&
              errors.length === 0 ? (
                <NoResultsFound />
              ) : errors.length === 0 ? (
                <>
                  <CustomRow width="100%" space={'2'}>
                    <Directories 
                    isLoading={isLoading}
                    directories={filteredFolders} />
                  </CustomRow>
                  <Row>
                    <LeftSidePlots
                      plots={plots}
                      selected_plots={selected_plots}
                      plots_grouped_by_layouts={plots_grouped_by_layouts}
                    />
                  </Row>
                </>
              ) : (
                  !isLoading &&
                  errors.length > 0 &&
                  errors.map((error) => (
                    <StyledAlert key={error} message={error} type="error" showIcon />
                  ))
                )}
          </>
        )}
    </Wrapper>
  );
};
