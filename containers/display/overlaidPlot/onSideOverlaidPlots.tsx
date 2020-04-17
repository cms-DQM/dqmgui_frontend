import React from 'react';

import { root_url, get_plot_url } from '../../../config/config';
import { ParamsForApiProps, TripleProps } from '../interfaces';
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

interface OnSideOverlaidPlotsProps {
  params_for_api: ParamsForApiProps;
  plot_name: string;
  dispatch: any;
  isPlotSelected: boolean;
  addPlotToList(plot_name: string): void;
  removePlotFromList(plot_name: string | undefined): void;
}

export const OnSideOverlaidPlots = ({
  plot_name,
  params_for_api,
  dispatch,
  isPlotSelected,
  addPlotToList,
  removePlotFromList,
}: OnSideOverlaidPlotsProps) => {
  params_for_api.plot_name = plot_name;
  const onsidePlotsURLs = [];
  let copy = { ...params_for_api };
  onsidePlotsURLs.push(get_plot_url(copy));
  copy.overlay_plot &&
    copy.overlay_plot.map((plot: TripleProps) => {
      copy.dataset_name = plot.dataset_name
        ? (plot.dataset_name as string)
        : params_for_api.dataset_name;
      copy.run_number = plot.run_number as number;
      onsidePlotsURLs.push(get_plot_url(copy));
    });

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
              <PlotNameCol>{plot_name}</PlotNameCol>
              <Column>
                {isPlotSelected ? (
                  <MinusIcon onClick={() => removePlotFromList(plot_name)} />
                ) : (
                  <PlusIcon onClick={() => addPlotToList(plot_name)} />
                )}{' '}
              </Column>
              <div
                onClick={() => {
                  isPlotSelected
                    ? removePlotFromList(plot_name)
                    : setSelectedPlotsName([plot_name])(dispatch);
                }}
              >
                <img alt={plot_name} src={sourceForOnePlot} />
              </div>
            </StyledPlotRow>
          </StyledCol>
        );
      })}
    </>
  );
};
