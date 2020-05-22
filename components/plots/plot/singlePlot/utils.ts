import {
  PlotDataProps,
  TripleProps,
  QueryProps,
  ParamsForApiProps,
} from '../../../../containers/display/interfaces';
import cleanDeep from 'clean-deep';
import Router, { useRouter } from 'next/router';

import { LeftSideState } from '../../../../contexts/leftSideContext';
import { RightSideState } from '../../../../contexts/rightSideContext';
import { formTriples } from '../../../viewDetailsMenu/utils';

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
) => `${plotsQuery ? plotsQuery + '&' : ''}${plot.dir}/${plot.name}`;

export const addOverlayData = (triples: TripleProps[] | undefined) => {
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

export const FormatParamsForAPI = (globalState: LeftSideState & RightSideState, query: QueryProps, plotName: string, dir?: string): ParamsForApiProps => {
  return ({
    run_number: query.run_number ? query.run_number : NaN,
    dataset_name: query.dataset_name ? query.dataset_name : '',
    folders_path: dir,
    plot_name: plotName,
    height: globalState.size.h,
    width: globalState.size.w,
    customizeProps: globalState.customizeProps,
    stats: globalState.stats,
    overlay_plot: query.overlay_data ? formTriples(query.overlay_data) : []
  })
}

export const addPlotToRightSide = (query: QueryProps, plot: PlotDataProps) => Router.replace({
  pathname: '/',
  query: {
    run_number: query.run_number,
    dataset_name: query.dataset_name,
    folder_path: query.folder_path,
    overlay: query.overlay,
    overlay_data: query.overlay_data,
    //addig selected plots name and directories to url
    selected_plots: `${addToSelectedPlots(
      query.selected_plots,
      plot
    )}`,
  },
})

export const removePlotFromRightSide = (query: QueryProps, plot: PlotDataProps) => Router.replace({
  pathname: '/',
  query: {
    run_number: query.run_number,
    dataset_name: query.dataset_name,
    folder_path: query.folder_path,
    overlay: query.overlay,
    overlay_data: query.overlay_data,
    selected_plots: `${removePlotFromSelectedPlots(
      query.selected_plots,
      plot
    )}`,
  },
})

export const scroll = (imageRef: any) => {
  if (imageRef) {
    imageRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }
}

export const scrollToBottom = (imageRef: any) => {
  if (imageRef && imageRef.current) {
    imageRef.current.scrollTop  = imageRef.current.scrollHeight
  }
}
