import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

import { root_url } from '../../../../config/config';
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
} from './utils';

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

  const plot_url = get_plot_url(params_for_api);
  const source = `${root_url}${plot_url}`;

  const imageRef = useRef(null);
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
          minheight={params_for_api.height}
          width={params_for_api.width?.toString()}
          is_plot_selected={isPlotSelected.toString()}
          // report={plot.properties.report}
        >
          <PlotNameCol>{plot.displayedName}</PlotNameCol>
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
          <div
            onClick={async () => {
              isPlotSelected
                ? await removePlotFromRightSide(query, plot)
                : await addPlotToRightSide(query, plot);
              scroll(imageRef);
            }}
          >
            <img alt={plot.name} src={source} />
          </div>
        </StyledPlotRow>
      </StyledCol>
    </div>
  );
};
