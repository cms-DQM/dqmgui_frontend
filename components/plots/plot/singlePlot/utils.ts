import {
  PlotDataProps,
  TripleProps,
  QueryProps,
  ParamsForApiProps,
} from '../../../../containers/display/interfaces';
import cleanDeep from 'clean-deep';

import { formTriples } from '../../../viewDetailsMenu/utils';
import {
  changeRouter,
  getChangedQueryParams,
} from '../../../../containers/display/utils';
import { functions_config } from '../../../../config/config';

export const removePlotFromSelectedPlots = (
  plotsQuery: string | undefined,
  plot_to_delete: PlotDataProps
) => {
  const separatedPlots = plotsQuery ? plotsQuery.split('&') : [];

  const fileterdPlotsAndDirs = separatedPlots.map((separatedPlot: string) => {
    const name_of_plot = encodeURI(plot_to_delete.name)
    const plot = [plot_to_delete.run_number as string + plot_to_delete.dataset_name as string, plot_to_delete.path, name_of_plot].join('/')

    if (plot !== separatedPlot) {
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
  const dataset_name = plot.dataset_name?.substring(1)
  const path = plot.path
  const name = plot.name
  const new_plot = [run_number, dataset_name, path, (encodeURI(name))].join('/')

  return (`${plotsQuery ? plotsQuery + '&' : ''}${new_plot}`)
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
  globalState: any,
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
    customise: globalState.customise,
    overlay: globalState.overlayPosition,
    notOlderThan: globalState.updated_by_not_older_than
      ? globalState.updated_by_not_older_than
      : '',
    overlay_plot: query.overlay_data ? formTriples(query.overlay_data) : [],
    normalize: globalState.normalize,
    stats: globalState.stats,
    error: globalState.error,
    lumi: globalState.lumisection,
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
    return plot.qteststatuses && plot.qteststatuses.find((status) => status === 300)
      ? true
      : false;
  }
  plot.qteststatuses &&
    plot.qteststatuses.forEach((qtest) => {
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
