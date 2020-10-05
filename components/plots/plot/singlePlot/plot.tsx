import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

import { functions_config, get_plot_url } from '../../../../config/config';
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
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate';
import { PlotImage } from '../plotImage';

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

  const imageRef = useRef(null);

  const { blink, updated_by_not_older_than } = useBlinkOnUpdate();
  const url = get_plot_url(params_for_api);
  useEffect(() => {
    const scrollPlot = () => {
      scroll(imageRef);
      scrollToBottom(imageRefScrollDown);
    };
    if (isPlotSelected) {
      scrollPlot();
    }
  }, [isPlotSelected, query.selected_plots]);

  return (
    <div ref={imageRef}>
      <StyledCol space={2}>
        <StyledPlotRow
          justifycontent="center"
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
                onClick={() => {
                  addPlotToRightSide(query, plot);
                }}
              />
            )}
          </Column>
          <PlotImage
            blink={blink}
            params_for_api={params_for_api}
            plot={plot}
            plotURL={url}
            updated_by_not_older_than={updated_by_not_older_than}
            imageRef={imageRef}
            isPlotSelected={isPlotSelected}
            query={query}
          />
        </StyledPlotRow>
      </StyledCol>
    </div>
  );
};
