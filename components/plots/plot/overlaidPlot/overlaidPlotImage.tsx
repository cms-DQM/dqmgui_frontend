import React, { useRef, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import lozad from 'lozad';

import { root_url, functions_config } from '../../../../config/config';
import {
  get_plot_with_overlay,
  get_overlaied_plots_urls,
} from '../../../../config/config';
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
} from '../../../../containers/display/styledComponents';
import {
  scroll,
  removePlotFromRightSide,
  addPlotToRightSide,
  scrollToBottom,
  get_plot_error,
} from '../singlePlot/utils';
import { store } from '../../../../contexts/leftSideContext';
import { CustomDiv } from '../../../styledComponents';
import { Spinner } from '../../../../containers/search/styledComponents';
import { ErrorMessage } from '../../errorMessage';
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate';

interface OverlaidPlotImageProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  isPlotSelected: boolean;
  imageRefScrollDown: any;
}

export const OverlaidPlotImage = ({
  plot,
  params_for_api,
  isPlotSelected,
  imageRefScrollDown,
}: OverlaidPlotImageProps) => {
  const globalState = useContext(store);
  const { normalize } = globalState;
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  params_for_api.plot_name = plot.name;
  params_for_api.normalize = normalize;

  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;

  const plot_with_overlay = get_plot_with_overlay(params_for_api);
  const source = `${root_url}${plot_with_overlay}`;

  const router = useRouter();
  const query: QueryProps = router.query;

  const imageRef = useRef(null);
  const { blink } = useBlinkOnUpdate();

  //lazy loading for plots
  const observer = lozad();
  observer.observe();

  return (
    <div ref={imageRef}>
      <StyledCol space={2}>
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
              <MinusIcon onClick={() => removePlotFromRightSide(query, plot)} />
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
                data-src={source}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
              />
            </div>
          )}
          {imageLoading && (
            <CustomDiv display="flex" justifycontent="center" width="100%">
              <Spinner />
            </CustomDiv>
          )}
        </StyledPlotRow>
      </StyledCol>
    </div>
  );
};
