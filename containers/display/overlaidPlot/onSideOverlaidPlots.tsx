import React from 'react';

import { root_url, get_plot_url } from '../../../config/config';
import { ParamsForApiProps, TripleProps, PlotDataProps } from '../interfaces';
import {
  setSelectedPlotsName,
  addPlotToList,
} from '../../../reducers/displayFolderOrPlot';
import {
  StyledCol,
  PlotNameCol,
  StyledPlotRow,
  Column,
  PlusIcon,
  MinusIcon,
} from '../styledComponents';
import { getOnSideOverlaidPlots } from './utils';

interface OnSideOverlaidPlotsProps {
  params_for_api: ParamsForApiProps;
  plot: PlotDataProps;
  dispatch: any;
  isPlotSelected: boolean;
  addPlotToList(plot: PlotDataProps): void;
  removePlotFromList(plot: PlotDataProps | undefined): void;
}

export const OnSideOverlaidPlots = ({
  plot,
  params_for_api,
  dispatch,
  isPlotSelected,
  addPlotToList,
  removePlotFromList,
}: OnSideOverlaidPlotsProps) => {

  params_for_api.plot_name = plot.name;
  const onsidePlotsURLs: string[] = getOnSideOverlaidPlots(params_for_api)

  return (
    <>
      {onsidePlotsURLs.map((url: string) => {
        const sourceForOnePlot = `${root_url}/${url}`;
        return (
          <StyledCol key={url}>
            <StyledPlotRow
              minHeight={params_for_api.height}
              width={params_for_api.width}
              isPlotSelected={isPlotSelected}
            >
              <PlotNameCol>{plot.name}</PlotNameCol>
              <Column>
                {isPlotSelected ? (
                  <MinusIcon onClick={() => removePlotFromList(plot)} />
                ) : (
                    <PlusIcon onClick={() => addPlotToList(plot)} />
                  )}{' '}
              </Column>
              <div
                onClick={() => {
                  isPlotSelected
                    ? removePlotFromList(plot)
                    : setSelectedPlotsName([plot])(dispatch);
                }}
              >
                <img alt={plot.name} src={sourceForOnePlot} />
              </div>
            </StyledPlotRow>
          </StyledCol>
        );
      })}
    </>
  );
};
