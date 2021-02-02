import { NextRouter } from 'next/router';
import QueryString from 'qs';
import { InfoProps, PlotDataProps, QueryProps } from '../containers/display/interfaces';

export const seperateRunAndLumiInSearch = (runAndLumi: string) => {
  const runAndLumiArray = runAndLumi.split(':');
  const parsedRun = runAndLumiArray[0];
  const parsedLumi = runAndLumiArray[1] ? parseInt(runAndLumiArray[1]) : 0;

  return { parsedRun, parsedLumi };
};

export const get_label = (info: InfoProps, data?: any) => {
  const value = data ? data.fString : null;

  if (info?.type && info.type === 'time' && value) {
    const milisec = new Date(parseInt(value) * 1000);
    const time = milisec.toUTCString();
    return time;
  } else {
    return value ? value : 'No information';
  }
};

export const getPathName = () => {
  const isBrowser = () => typeof window !== 'undefined';
  let pathName = (isBrowser() && window.location.pathname) || '/';
  const the_lats_char = pathName.charAt(pathName.length - 1);
  if (the_lats_char !== '/') {
    pathName = pathName + '/'
  }
  return pathName;
};

export const makeid = () => {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};


export const getZoomedPlotsUrlForOverlayingPlotsWithDifferentNames = (basePath: string, query: QueryProps, selected_plot: PlotDataProps) => {

  const page = 'plotsLocalOverlay'
  const run = 'run_number=' + query.run_number as string
  const dataset = 'dataset_name=' + query.dataset_name as string
  const path = 'folders_path=' + selected_plot.path
  const plot_name = 'plot_name=' + selected_plot.name
  const baseURL = [basePath, page].join('/')
  const queryURL = [run, dataset, path, plot_name].join('&')
  const plotsLocalOverlayURL = [baseURL, queryURL].join('?')
  return (plotsLocalOverlayURL)
}

export const getZoomedOverlaidPlotsUrlForOverlayingPlotsWithDifferentNames = (basePath: string, query: QueryProps, selected_plot: PlotDataProps) => {
  const page = 'plotsLocalOverlay'
  const run = 'run_number=' + query.run_number as string
  const dataset = 'dataset_name=' + query.dataset_name as string
  const path = 'folders_path=' + selected_plot.path
  const plot_name = 'plot_name=' + selected_plot.name
  const globally_overlaid_plots = query.overlay_data?.split('&').map((plot) => {
    const parts = plot.split('/')
    const run_number = parts.shift()
    const pathAndLabel = parts.splice(3)
    const dataset_name = parts.join('/')
    const path = selected_plot.path
    const plot_name = selected_plot.name
    const label = pathAndLabel.pop()
    const string = [run_number, dataset_name, path, plot_name, label].join('/')
    return string
  })
  const global_overlay = 'overlaidGlobally=' + (globally_overlaid_plots as string[]).join('&')
  const baseURL = [basePath, page].join('/')
  const queryURL = [run, dataset, path, plot_name, global_overlay].join('&')
  const plotsLocalOverlayURL = [baseURL, queryURL].join('?')
  return plotsLocalOverlayURL
}


export const decodePlotName = (tooLong: boolean, plot_name: string) => {
  if (tooLong) {
    const decode_name = decodeURI(plot_name)
    return decode_name.substring(0, 25) + '...' //some of names are double encoded 
  } else {
    return decodeURI(plot_name)
  }
}