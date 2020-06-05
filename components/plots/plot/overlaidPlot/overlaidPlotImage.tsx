import React, { useRef } from 'react';
import Router, { useRouter } from 'next/router';

import { root_url } from '../../../../config/config';
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
  removePlotFromSelectedPlots,
  addToSelectedPlots,
  scroll,
  removePlotFromRightSide,
  addPlotToRightSide,
  scrollToBottom,
} from '../singlePlot/utils';

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
  params_for_api.plot_name = plot.name;
  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;

  const plot_with_overlay = get_plot_with_overlay(params_for_api);
  const source = `${root_url}${plot_with_overlay}`;

  const router = useRouter();
  const query: QueryProps = router.query;

  const imageRef = useRef(null);

  return (
    <div ref={imageRef}>
      <StyledCol space={2}>
        <StyledPlotRow
          minheight={params_for_api.height}
          width={params_for_api.width}
          is_plot_selected={isPlotSelected.toString()}
          report={plot.properties.report}
        >
          <PlotNameCol>{plot.name}</PlotNameCol>
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
