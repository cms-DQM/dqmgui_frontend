import React, { useRef, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import lozad from 'lozad';

import { get_plot_url } from '../../../../config/config';
import {
  PlotDataProps,
  QueryProps,
  ParamsForApiProps,
} from '../../../../containers/display/interfaces';
import {
  StyledCol,
  StyledPlotRow,
  PlotNameCol,
  Column,
  PlusIcon,
  MinusIcon,
} from '../../../../containers/display/styledComponents';
import {
  addPlotToRightSide,
  removePlotFromRightSide,
  scroll,
  scrollToBottom,
  get_plot_error,
} from './utils';
import { Spinner } from '../../../../containers/search/styledComponents';
import { CustomDiv } from '../../../styledComponents';
import { ErrorMessage } from '../../errorMessage';
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate';
import { store } from '../../../../contexts/leftSideContext';

interface PlotProps {
  plot: PlotDataProps;
  isPlotSelected: boolean;
  params_for_api: ParamsForApiProps;
  imageRefScrollDown: any;
}

export const Plot = ({
  plot,
  isPlotSelected,
  params_for_api,
  imageRefScrollDown,
}: PlotProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const plot_url = get_plot_url(params_for_api);
  const imageRef = useRef(null);

  const { blink, updated_by_not_older_than } = useBlinkOnUpdate();
  const { configuration } = useContext(store)
  const { root_url, mode } = configuration

  const [source, setSource] = useState(
    `${root_url}${plot_url};notOlderThan=${updated_by_not_older_than}`
  );

  useEffect(() => {
    const scrollPlot = () => {
      scroll(imageRef);
      scrollToBottom(imageRefScrollDown);
    };
    if (isPlotSelected) {
      scrollPlot();
    }
  }, [isPlotSelected, query.selected_plots]);

  useEffect(() => {
    setSource(
      `${root_url}${plot_url};notOlderThan=${updated_by_not_older_than}`
    );
    setImageLoading(blink);
  }, [updated_by_not_older_than]);

  //lazy loading for plots
  const observer = lozad();
  observer.observe();

  return (
    <div ref={imageRef}>
      <StyledCol space={2}>
        <StyledPlotRow
          isLoading={blink.toString()}
          animation={(mode === 'ONLINE').toString()}
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
                  onClick={() => {
                    addPlotToRightSide(query, plot);
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
                {!imageError && (
                  <img
                    key={source}
                    onLoad={() => setImageLoading(false)}
                    className="lozad"
                    alt={plot.name}
                    data-src={source}
                    onError={() => {
                      setImageError(true);
                      setImageLoading(false);
                    }}
                  />
                )}
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
