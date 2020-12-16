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
import { functions_config } from '../../../../config/config';

export const removePlotFromSelectedPlots = (
  plotsQuery: string | undefined,
  plot: PlotDataProps
) => {
  const separatedPlots = plotsQuery ? plotsQuery.split('&') : [];
  const fileterdPlotsAndDirs = separatedPlots.map((separatedPlot: string) => {
    const plotString = [plot.run_number, plot.dataset_name, plot.path, plot.name].join('/')
    const selectedNotOverlaidPlot = separatedPlot.split(';overlayed=')
    if (plotString !== selectedNotOverlaidPlot[0]) {
      return separatedPlot;
    }
  });
  const cleanedFileterdPlotsAndDirs = cleanDeep(fileterdPlotsAndDirs);
  const plotsForQuery = cleanedFileterdPlotsAndDirs.join('&');
  return plotsForQuery;
};

export const addToSelectedPlots = (
  plotsQuery: string | undefined,
  plot: PlotDataProps
) => {
  const run_number = plot.run_number
  const dataset_name = plot.dataset_name
  const overlaid_separately = plot.overlaidSeparately
  if (overlaid_separately) {
    const overlaid_separately_string = overlaid_separately?.plots.map(plot => {
      return `${plot.folder_path}/${plot.name};lab=${plot.label}`
    })
    const overlaid_separately_full_string = overlaid_separately_string?.join('/') + `;norm=${overlaid_separately?.normalize};ref=${overlaid_separately?.ref}`
    return (`${plotsQuery ? plotsQuery + '&' : ''}${run_number}${dataset_name}/${plot.path}/${plot.name};overlayed=${overlaid_separately_full_string}`)
  }
  else {
    return (`${plotsQuery ? plotsQuery + '&' : ''}${run_number}${dataset_name}/${plot.path}/${plot.name}`)
  }
};

export const addOverlayData = (triples: TripleProps[] | undefined) => {
  const params =
    triples &&
    triples.map(
      (triple: TripleProps) =>
        `${triple.run_number}${triple.dataset_name}/${triple.label ? triple.label : triple.run_number
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
  const cleaned_parameters: any = cleanDeep({
    run_number: query.run_number ? query.run_number : '',
    dataset_name: query.dataset_name ? query.dataset_name : '',
    folders_path: path,
    plot_name: plotName,
    height: zoomed ? globalState.rightSideSize.h : globalState.size.h,
    width: zoomed ? globalState.rightSideSize.w : globalState.size.w,
    customizeProps: globalState.customizeProps,
    stats: globalState.stats,
    overlay: query.overlay,
    notOlderThan: globalState.updated_by_not_older_than
      ? globalState.updated_by_not_older_than
      : '',
    overlay_plot: query.overlay_data ? formTriples(query.overlay_data) : [],
    normalize: globalState.normalize ? globalState.normalize : 'False',
    lumi: query.lumi,
  });

  return cleaned_parameters;
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
) => {
  changeRouter(
    getChangedQueryParams(
      {
        selected_plots: `${removePlotFromSelectedPlots(
          query.selected_plots,
          plot,
        )}`,
      },
      query
    )
  )
};

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

export const shrink_or_expand = (name: string, layouts_sections: string[]) => {
  const copy = [...layouts_sections];

  if (layouts_sections.includes(name)) {
    const filtered_names = copy.filter(
      (name_form_names: string) => name !== name_form_names
    );
    return filtered_names;
  } else {
    copy.push(name);
    return copy;
  }
};

export const get_plot_error = (plot: PlotDataProps) => {
  let found = false;
  if (functions_config.new_back_end.new_back_end) {
    return plot.qresults && plot.qresults.find((status) => status === 300)
      ? true
      : false;
  }
  plot.qresults &&
    plot.qresults.forEach((qtest) => {
      if (qtest.hasOwnProperty('status')) {
        const status = qtest.status;
        if (status === 300) {
          found = true;
          return true;
        }
      }
    });
  if (!found) {
    return found;
  }
  return found;
};
