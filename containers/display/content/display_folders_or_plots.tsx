import React from 'react';
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
import { usePrevious } from '../../../hooks/usePrevious';

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


export const DisplayFoldersOrPlots = ({
  plots,
  selected_plots,
  plots_grouped_by_layouts,
  isLoading,
  viewPlotsPosition,
  proportion,
  errors,
  filteredFolders,
  plotsAreaRef,
  blink
}: ContentProps) => {
  const [isInitialLoad, setIsInitialLoad] = React.useState<boolean>(true);
  const previousIsLoading = usePrevious<boolean>(isLoading);

  React.useEffect(() => {
    console.log({ isLoading, previousIsLoading })
    if (!isLoading && previousIsLoading && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isLoading]);

  const shouldShowSpinner = React.useMemo(() => (
    isInitialLoad && isLoading && filteredFolders.length === 0
  ), [isInitialLoad, isLoading, filteredFolders]);
  
  const shouldShowNotfound = React.useMemo(() => (
    filteredFolders.length === 0 && plots.length === 0 && !plots_grouped_by_layouts && errors.length === 0
  ), [filteredFolders, plots, errors]);
    
  const shouldShowError = React.useMemo(() => (
    !shouldShowNotfound && errors.length > 0
  ), [shouldShowNotfound, errors]);
      
  const shouldShowFolderOrPlots = React.useMemo(() => (
    !shouldShowNotfound && errors.length === 0
  ), [shouldShowNotfound]);

  const renderFolderOrPlots = () => (
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
  );
        
  return (
    <Wrapper
      ref={plotsAreaRef}
      any_selected_plots={selected_plots.length > 0 && errors.length === 0}
      position={viewPlotsPosition}
      proportion={proportion}
    >
      {shouldShowSpinner && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      {shouldShowNotfound && <NoResultsFound />}
      {shouldShowFolderOrPlots && renderFolderOrPlots()}
      {shouldShowError && <StyledAlert key={errors} message={errors} type="error" showIcon />}
    </Wrapper>
  );
};
