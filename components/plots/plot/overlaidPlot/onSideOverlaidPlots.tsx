import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { root_url, functions_config } from '../../../../config/config';
import {
  ParamsForApiProps,
  PlotDataProps,
  QueryProps,
} from '../../../../containers/display/interfaces';
import {
  StyledCol,
  PlotNameCol,
  StyledPlotRow,
  Column,
  PlusIcon,
  MinusIcon,
  OnSidePlotsWrapper,
} from '../../../../containers/display/styledComponents';
import { getOnSideOverlaidPlots } from './utils';
import {
  addPlotToRightSide,
  removePlotFromRightSide,
  scroll,
  scrollToBottom,
  get_plot_error,
} from '../singlePlot/utils';
import { ErrorMessage } from '../../errorMessage';
import { CustomDiv } from '../../../styledComponents';
import { Spinner } from '../../../../containers/search/styledComponents';
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate';
import { PlotImage } from '../plotImage';

interface OnSideOverlaidPlotsProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  isPlotSelected: boolean;
  imageRefScrollDown: any;
}

export const OnSideOverlaidPlots = ({
  plot,
  params_for_api,
  isPlotSelected,
  imageRefScrollDown,
}: OnSideOverlaidPlotsProps) => {
  params_for_api.plot_name = plot.name;
  const onsidePlotsURLs: string[] = getOnSideOverlaidPlots(params_for_api);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const router = useRouter();
  const query: QueryProps = router.query;
  const imageRef = useRef(null);

  const { blink, updated_by_not_older_than } = useBlinkOnUpdate();

  return (
    <OnSidePlotsWrapper>
      {onsidePlotsURLs.map((url: string) => {
        return (
          <div ref={imageRef}>
            <StyledCol space={2} key={url}>
              <StyledPlotRow
                isLoading={blink.toString()}
                animation={(functions_config.mode === 'ONLINE').toString()}
                minheight={params_for_api.height}
                width={params_for_api.width?.toString()}
                is_plot_selected={isPlotSelected.toString()}
              >
                <PlotNameCol error={get_plot_error(plot).toString()}>
                  {plot.displayedName}
                </PlotNameCol>
                <Column>
                  {isPlotSelected ? (
                    <MinusIcon
                      onClick={() => removePlotFromRightSide(query, plot)}
                    />
                  ) : (
                    <PlusIcon
                      onClick={async () => {
                        await addPlotToRightSide(query, plot);
                        scroll(imageRef);
                        scrollToBottom(imageRefScrollDown);
                      }}
                    />
                  )}
                </Column>
                <PlotImage
                  imageRef={imageRef}
                  isPlotSelected={isPlotSelected}
                  query={query}
                  blink={blink}
                  params_for_api={params_for_api}
                  plot={plot}
                  plotURL={url}
                  setImageLoading={setImageLoading}
                  updated_by_not_older_than={updated_by_not_older_than}
                />
                {imageLoading && (
                  <CustomDiv
                    display="flex"
                    justifycontent="center"
                    width="100%"
                  >
                    <Spinner />
                  </CustomDiv>
                )}
              </StyledPlotRow>
            </StyledCol>
          </div>
        );
      })}
    </OnSidePlotsWrapper>
  );
};
