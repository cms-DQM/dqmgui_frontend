import {
  PlotDataProps,
  TripleProps,
  QueryProps,
  ParamsForApiProps,
} from '../../../../containers/display/interfaces';
import cleanDeep from 'clean-deep';

import { LeftSideState } from '../../../../contexts/leftSideContext';
import { formTriples } from '../../../viewDetailsMenu/utils';
import {
  changeRouter,
  getChangedQueryParams,
} from '../../../../containers/display/utils';
import { SetStateAction } from 'react';

export const removePlotFromSelectedPlots = (
  plotsQuery: string | undefined,
  plotName: PlotDataProps
) => {
  const plotsWithDirs = plotsQuery ? plotsQuery.split('&') : [];
  const fileterdPlotsAndDirs = plotsWithDirs.map((plotWithDir: string) => {
    const plotAndDir = plotWithDir.split('/');
    if (plotAndDir[plotAndDir.length - 1] !== plotName.name) {
      return plotWithDir;
    }
  });
  const cleanedFileterdPlotsAndDirs = cleanDeep(fileterdPlotsAndDirs);
  const plotsForQuery = cleanedFileterdPlotsAndDirs.join('&');
  return plotsForQuery;
};

export const addToSelectedPlots = (
  plotsQuery: string | undefined,
  plot: PlotDataProps
) => `${plotsQuery ? plotsQuery + '&' : ''}${plot.path}/${plot.name}`;

export const addOverlayData = (
  triples: TripleProps[] | undefined 
) => {
  const params =
    triples &&
    triples.map(
      (triple: TripleProps) =>
        `${triple.run_number}${triple.dataset_name}/${
          triple.label ? triple.label : triple.run_number
        }`
    );
  const query = params?.join('&');
  return query;
};

export const FormatParamsForAPI = (
  globalState: LeftSideState,
  query: QueryProps,
  plotName: string,
  path?: string,
  zoomed?: boolean
): ParamsForApiProps => {
  return {
    run_number: query.run_number ? query.run_number : '',
    dataset_name: query.dataset_name ? query.dataset_name : '',
    folders_path: path,
    plot_name: plotName,
    height: zoomed ? globalState.rightSideSize.h : globalState.size.h,
    width: zoomed ? globalState.rightSideSize.w : globalState.size.w,
    customizeProps: globalState.customizeProps,
    stats: globalState.stats,
    overlay: query.overlay,
    overlay_plot: query.overlay_data ? formTriples(query.overlay_data) : [],
    normalize: query.normalize ? query.normalize : 'False',
    lumi: query.lumi,
  };
};

export const addPlotToRightSide = (query: QueryProps, plot: PlotDataProps) =>
  changeRouter(
    getChangedQueryParams(
      {
        selected_plots: `${addToSelectedPlots(query.selected_plots, plot)}`,
      },
      query
    )
  );

export const removePlotFromRightSide = (
  query: QueryProps,
  plot: PlotDataProps
) =>
  changeRouter(
    getChangedQueryParams(
      {
        selected_plots: `${removePlotFromSelectedPlots(
          query.selected_plots,
          plot
        )}`,
      },
      query
    )
  );

export const scroll = (imageRef: any) => {
  if (imageRef) {
    imageRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }
};

export const scrollToBottom = (imageRef: any) => {
  if (imageRef && imageRef.current) {
    imageRef.current.scrollTop = imageRef.current.scrollHeight;
  }
};
