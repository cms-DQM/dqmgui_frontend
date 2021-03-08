import cleanDeep from 'clean-deep';
import { root_url_ } from '../config/config';
import { InfoProps, PlotDataProps, QueryProps } from '../containers/display/interfaces';

export const seperateRunAndLumiInSearch = (runAndLumi: string) => {
  const runAndLumiArray = runAndLumi.split(':');
  const parsedRun = runAndLumiArray[0];
  const parsedLumi = runAndLumiArray[1] ? parseInt(runAndLumiArray[1]) : 0;

  return { parsedRun, parsedLumi }
}

export const get_label = (info: InfoProps, data?: any) => {
  const value = data ? data.fString : null;

  if (info?.type && info.type === 'time' && value) {
    const milisec = new Date(parseInt(value) * 1000);
    const time = milisec.toUTCString();
    return time;
  } else {
    return value ? value : 'No information';
  }
}

export const getPathName = () => {
  const isBrowser = () => typeof window !== 'undefined';
  let pathName = (isBrowser() && window.location.pathname) || '/';
  const the_lats_char = pathName.charAt(pathName.length - 1);
  if (the_lats_char !== '/') {
    pathName = pathName + '/'
  }
  return pathName;
}


export const makeid = () => {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

const isProd = process.env.NODE_ENV === 'production'

export const getZoomedPlotsUrlForOverlayingPlotsWithDifferentNames = (query: QueryProps, selected_plot: PlotDataProps) => {
  const plotsOverlaidByLayout = selected_plot.overlays ? selected_plot.overlays.map(plot => [selected_plot.run_number + selected_plot.dataset_name, plot, selected_plot.run_number].join('/')) : []
  const global_overlay = 'overlaidGlobally=' + (plotsOverlaidByLayout as string[]).join('&')
  const page = isProd ? 'plotsLocalOverlay' : 'plotsLocalOverlay/'
  const run = 'run_number=' + query.run_number as string
  const dataset = 'dataset_name=' + query.dataset_name as string
  const path = 'folders_path=' + selected_plot.path
  const plot_name = 'plot_name=' + selected_plot.name

  const xtype = selected_plot.draw && selected_plot.draw.xtype ? `xtype=${selected_plot.draw && selected_plot.draw.xtype}` : '';
  const xmin = selected_plot.draw && selected_plot.draw.xmin ? `xmin=${selected_plot.draw && selected_plot.draw.xmin}` : '';
  const xmax = selected_plot.draw && selected_plot.draw.xmax ? `xmax=${selected_plot.draw && selected_plot.draw.xmax}` : '';

  const ytype = selected_plot.draw && selected_plot.draw.ytype ? `ytype=${selected_plot.draw && selected_plot.draw.ytype}` : '';
  const ymin = selected_plot.draw && selected_plot.draw.ymin ? `ymin=${selected_plot.draw && selected_plot.draw.ymin}` : '';
  const ymax = selected_plot.draw && selected_plot.draw.ymax ? `ymax=${selected_plot.draw && selected_plot.draw.ymax}` : '';

  const ztype = selected_plot.draw && selected_plot.draw.ztype ? `ztype=${selected_plot.draw && selected_plot.draw.ztype}` : '';
  const zmin = selected_plot.draw && selected_plot.draw.zmin ? `zmin=${selected_plot.draw && selected_plot.draw.zmin}` : '';
  const zmax = selected_plot.draw && selected_plot.draw.zmax ? `zmax=${selected_plot.draw && selected_plot.draw.zmax}` : '';

  const drawopts = selected_plot.draw && selected_plot.draw.drawopts ? `drawopts=${selected_plot.draw && selected_plot.draw.drawopts}` : '';
  const withref = selected_plot.draw && selected_plot.draw.withref ? `withref=${selected_plot.draw && selected_plot.draw.withref}` : '';
  const customisation = cleanDeep([xtype, xmin, xmax, ytype, ymin, ymax, ztype, zmin, zmax, drawopts, withref])
  const params = customisation.concat([run, dataset, path, plot_name, global_overlay])
  const queryURL = params.join('&')
  const plotsLocalOverlayURL = [page, queryURL].join('?')
  return (plotsLocalOverlayURL)
}

export const getZoomedOverlaidPlotsUrlForOverlayingPlotsWithDifferentNames = (query: QueryProps, selected_plot: PlotDataProps) => {
  const page = isProd ? 'plotsLocalOverlay' : 'plotsLocalOverlay/'
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
  const xtype = selected_plot.draw && selected_plot.draw.xtype ? `xtype=${selected_plot.draw && selected_plot.draw.xtype}` : '';
  const xmin = selected_plot.draw && selected_plot.draw.xmin ? `xmin=${selected_plot.draw && selected_plot.draw.xmin}` : '';
  const xmax = selected_plot.draw && selected_plot.draw.xmax ? `xmax=${selected_plot.draw && selected_plot.draw.xmax}` : '';

  const ytype = selected_plot.draw && selected_plot.draw.ytype ? `ytype=${selected_plot.draw && selected_plot.draw.ytype}` : '';
  const ymin = selected_plot.draw && selected_plot.draw.ymin ? `ymin=${selected_plot.draw && selected_plot.draw.ymin}` : '';
  const ymax = selected_plot.draw && selected_plot.draw.ymax ? `ymax=${selected_plot.draw && selected_plot.draw.ymax}` : '';

  const ztype = selected_plot.draw && selected_plot.draw.ztype ? `ztype=${selected_plot.draw && selected_plot.draw.ztype}` : '';
  const zmin = selected_plot.draw && selected_plot.draw.zmin ? `zmin=${selected_plot.draw && selected_plot.draw.zmin}` : '';
  const zmax = selected_plot.draw && selected_plot.draw.zmax ? `zmax=${selected_plot.draw && selected_plot.draw.zmax}` : '';

  const drawopts = selected_plot.draw && selected_plot.draw.drawopts ? `drawopts=${selected_plot.draw && selected_plot.draw.drawopts}` : '';
  const withref = selected_plot.draw && selected_plot.draw.withref ? `withref=${selected_plot.draw && selected_plot.draw.withref}` : '';
  const customisation = cleanDeep([xtype, xmin, xmax, ytype, ymin, ymax, ztype, zmin, zmax, drawopts, withref])

  const plotsOverlaidByLayout = selected_plot.overlays ? selected_plot.overlays.map(plot => [selected_plot.run_number + selected_plot.dataset_name, plot, selected_plot.run_number].join('/')) : []
  const allOverlaidPlots = plotsOverlaidByLayout.concat(globally_overlaid_plots)
  const global_overlay = 'overlaidGlobally=' + (allOverlaidPlots as string[]).join('&')
  const params = customisation.concat([run, dataset, path, plot_name, global_overlay])
  const queryURL = params.join('&')
  const plotsLocalOverlayURL = [page, queryURL].join('?')
  return plotsLocalOverlayURL
}


export const decodePlotName = (tooLong: boolean, plot_name: string) => {
  try {
    if (tooLong) {
      const decode_name = decodeURI(plot_name)
      return decode_name.substring(0, 25) + '...' //some of names are double encoded 
    } else {
      return decodeURI(plot_name)
    }
  } catch {
    if (tooLong) {
      return plot_name.substring(0, 25) + '...' //some of names are double encoded 
    } else {
      return plot_name
    }
  }

}