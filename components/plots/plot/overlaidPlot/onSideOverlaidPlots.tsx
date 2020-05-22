import React, { useRef } from 'react';
import Router, { useRouter } from 'next/router';

import { root_url } from '../../../../config/config';
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
} from '../singlePlot/utils';

interface OnSideOverlaidPlotsProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  isPlotSelected: boolean;
  imageRefScrollDown:any;
}

export const OnSideOverlaidPlots = ({
  plot,
  params_for_api,
  isPlotSelected,
  imageRefScrollDown,
}: OnSideOverlaidPlotsProps) => {
  params_for_api.plot_name = plot.name;
  const onsidePlotsURLs: string[] = getOnSideOverlaidPlots(params_for_api);

  const router = useRouter();
  const query: QueryProps = router.query;
  const imageRef = useRef(null);

  return (
    <OnSidePlotsWrapper>
      {onsidePlotsURLs.map((url: string) => {
        const sourceForOnePlot = `${root_url}${url}`;
        return (
          <div ref={imageRef}>
            <StyledCol space={2} key={url}>
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
                      <PlusIcon onClick={async () => {
                        await addPlotToRightSide(query, plot)
                        scroll(imageRef)
                        scrollToBottom(imageRefScrollDown)
                      }} />
                    )}
                </Column>
                <div onClick={async () => {
                  isPlotSelected ? await removePlotFromRightSide(query, plot) : await addPlotToRightSide(query, plot)
                  scroll(imageRef)
                }}>
                  <img alt={plot.name} src={sourceForOnePlot} />
                </div>
              </StyledPlotRow>
            </StyledCol>
          </div>
        );
      })}
    </OnSidePlotsWrapper>
  );
};
