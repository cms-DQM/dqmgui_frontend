import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import lozad from 'lozad';

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
import { store } from '../../../../contexts/leftSideContext';
import { ErrorMessage } from '../../errorMessage';
import { CustomDiv } from '../../../styledComponents';
import { Spinner } from '../../../../containers/search/styledComponents';
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate';

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

  const { blink } = useBlinkOnUpdate();

  //lazy loading for plots
  const observer = lozad();
  observer.observe();

  return (
    <OnSidePlotsWrapper>
      {onsidePlotsURLs.map((url: string) => {
        const sourceForOnePlot = `${root_url}${url}`;
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
                {imageError ? (
                  <ErrorMessage />
                ) : (
                  <div
                    onClick={async () => {
                      isPlotSelected
                        ? await removePlotFromRightSide(query, plot)
                        : await addPlotToRightSide(query, plot);
                      scroll(imageRef);
                    }}
                  >
                    <img
                      onLoad={() => setImageLoading(false)}
                      className="lozad"
                      alt={plot.name}
                      data-src={sourceForOnePlot}
                      onError={() => {
                        setImageError(true);
                        setImageLoading(false);
                      }}
                    />
                  </div>
                )}
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
