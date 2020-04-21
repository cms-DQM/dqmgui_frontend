import { FOLDERS_OR_PLOTS_REDUCER, sizes } from '../components/constants';
import {
  DisplayFolderOrPlotComponentProps,
  SizeProps,
  CustomizeProps,
} from '../containers/display/interfaces';

import { summariesWorkspace } from '../workspaces/offline';

export const initialState: DisplayFolderOrPlotComponentProps = {
  errorBars: false,
  overlay: 'overlay',
  height: sizes.medium.size.h,
  width: sizes.medium.size.w,
  normalize: true,
  overlay_plot: [],
  stats: true,
  selected_plots_name: [],
  jsroot_mode: false,
  worskpaceMenu: false,
  workspace: summariesWorkspace[5],
  zoomedPlotSize: { h: sizes.fill.size.h, w: sizes.fill.size.w },
  customizeProps: {
    xtype: '',
    xmin: NaN,
    xmax: NaN,
    ytype: '',
    ymin: NaN,
    ymax: NaN,
    ztype: '',
    zmin: NaN,
    zmax: NaN,
    drawopts: '',
    withref: '',
  },
};

export const setErrorBars = (errBars: boolean) => (dispatch: any) =>
  dispatch({
    type: FOLDERS_OR_PLOTS_REDUCER.SET_ERR_BARS,
    payload: errBars,
  });

export const setParamsForCustomize = (params: CustomizeProps) => (
  dispatch: any
) => {
  console.log(params);
  return dispatch({
    type: FOLDERS_OR_PLOTS_REDUCER.SET_PARAMS_FOR_CUSTOMIZE,
    payload: params,
  });
};

export const setHeight = (height: number) => (dispatch: any) =>
  dispatch({
    type: FOLDERS_OR_PLOTS_REDUCER.SET_HEIGHT,
    payload: height,
  });

export const setWidth = (width: number) => (dispatch: any) =>
  dispatch({
    type: FOLDERS_OR_PLOTS_REDUCER.SET_WIDTH,
    payload: width,
  });

export const setSize = (options: any) => (dispatch: any) => {
  setWidth(options.w)(dispatch);
  setHeight(options.h)(dispatch);
};
export const setNormalize = (normalize: boolean) => (dispatch: any) =>
  dispatch({
    type: FOLDERS_OR_PLOTS_REDUCER.SET_NORMALIZE,
    payload: normalize,
  });

export const setPlotToOverlay = (plot_to_overlay: any) => (dispatch: any) =>
  dispatch({
    type: FOLDERS_OR_PLOTS_REDUCER.SET_PLOT_TO_OVERLAY,
    payload: plot_to_overlay,
  });

export const setOverlay = (overlay: string) => (dispatch: any) =>
  dispatch({
    type: FOLDERS_OR_PLOTS_REDUCER.SET_OVERLAY,
    payload: overlay,
  });

export const setSelectedPlotsName = (selected_plots_name: string[]) => (
  dispatch: any
) => {
  console.log(selected_plots_name);
  return dispatch({
    type: FOLDERS_OR_PLOTS_REDUCER.SET_SELECTED_PLOTS_NAMES,
    payload: selected_plots_name,
  });
};

export const removePlotFromList = (plot_name: string) => (
  state: any,
  dispatch: any
) => {
  const copy = [...state.selected_plots_name];
  const filtered = copy.filter((plot: string) => plot !== plot_name);
  setSelectedPlotsName(filtered)(dispatch);
};

export const addPlotToList = (plot_name: string) => (
  state: any,
  dispatch: any
) => {
  const copy = [...state.selected_plots_name];
  copy.push(plot_name);
  setSelectedPlotsName(copy)(dispatch);
};

export const setStats = (stats: boolean) => (dispatch: any) =>
  dispatch({
    type: FOLDERS_OR_PLOTS_REDUCER.SET_STATS,
    payload: stats,
  });

export const setJSROOTMode = (jsroot_mode: boolean) => (dispatch: any) =>
  dispatch({
    type: FOLDERS_OR_PLOTS_REDUCER.JSROOT_MODE,
    payload: jsroot_mode,
  });

export const setZoomedPlotSize = (size: SizeProps) => (dispatch: any) =>
  dispatch({
    type: FOLDERS_OR_PLOTS_REDUCER.SET_ZOOMED_PLOT_SIZE,
    payload: size,
  });

export const toggleWorkspaceMenu = (open: boolean) => (dispatch: any) =>
  dispatch({
    type: FOLDERS_OR_PLOTS_REDUCER.TOGGLE_WORKSPACES_MENU,
    payload: open,
  });

export const setWorkspace = (workspace: any) => (dispatch: any) =>
  dispatch({
    type: FOLDERS_OR_PLOTS_REDUCER.SET_WORKSPACE,
    payload: workspace,
  });


export function displayFolderOrPlotComponentReducer(
  state = initialState,
  action: any
) {
  switch (action.type) {
    case FOLDERS_OR_PLOTS_REDUCER.SET_ERR_BARS:
      return { ...state, errorBars: action.payload };
    case FOLDERS_OR_PLOTS_REDUCER.SET_HEIGHT:
      return { ...state, height: action.payload };
    case FOLDERS_OR_PLOTS_REDUCER.SET_WIDTH:
      return { ...state, width: action.payload };
    case FOLDERS_OR_PLOTS_REDUCER.SET_NORMALIZE:
      return { ...state, normalize: action.payload };
    case FOLDERS_OR_PLOTS_REDUCER.SET_PLOT_TO_OVERLAY:
      return { ...state, overlay_plot: action.payload };
    case FOLDERS_OR_PLOTS_REDUCER.SET_OVERLAY:
      return { ...state, overlay: action.payload };
    case FOLDERS_OR_PLOTS_REDUCER.SET_SELECTED_PLOTS_NAMES:
      return { ...state, selected_plots_name: action.payload };
    case FOLDERS_OR_PLOTS_REDUCER.SET_STATS:
      return { ...state, stats: action.payload };
    case FOLDERS_OR_PLOTS_REDUCER.JSROOT_MODE:
      return { ...state, jsroot_mode: action.payload };
    case FOLDERS_OR_PLOTS_REDUCER.SET_ZOOMED_PLOT_SIZE:
      return { ...state, zoomedPlotSize: action.payload };
    case FOLDERS_OR_PLOTS_REDUCER.SET_PARAMS_FOR_CUSTOMIZE:
      return { ...state, customizeProps: action.payload };
    case FOLDERS_OR_PLOTS_REDUCER.TOGGLE_WORKSPACES_MENU:
      return { ...state, worskpaceMenu: action.payload };
    case FOLDERS_OR_PLOTS_REDUCER.SET_WORKSPACE:
      return { ...state, workspace: action.payload };
    default:
      throw new Error();
  }
}
