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
  errors: string;
  filteredFolders: any[];
  query: QueryProps;
  plotsAreaRef: any;
  blink: boolean
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
  plotsAreaRef,
  blink
}: ContentProps) => {

  const live_mode_is_on = isItLiveMode({ run_number: query.run_number, dataset_name: query.dataset_name })
  return (
    <Wrapper
      ref={plotsAreaRef}
      any_selected_plots={selected_plots.length > 0 && errors.length === 0}
      position={viewPlotsPosition}
      proportion={proportion}
    >

      { live_mode_is_on && isLoading && filteredFolders.length === 0
        || !live_mode_is_on && isLoading ? (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      ) : (
        <>
          {
            !isLoading &&
              filteredFolders.length === 0 &&
              plots.length === 0 &&
              errors.length === 0 ? (
              <NoResultsFound />
            ) : errors.length === 0 ? (
            <>
              <CustomRow width="100%" space={'2'}>
                <Directories
                  blink={blink}
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
            <StyledAlert key={errors} message={errors} type="error" showIcon />
          )}
        </>
      )}
    </Wrapper>
  );
};
