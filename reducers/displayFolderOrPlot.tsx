import { FOLDERS_OR_PLOTS_REDUCER, sizes } from '../components/constants'
import { DisplayFolderOrPlotComponentProps } from '../containers/display/interfaces';

export const initialState: DisplayFolderOrPlotComponentProps = {
    errorBars: false,
    overlay: 'overlay',
    height: sizes.medium.size.h,
    width: sizes.medium.size.w,
    normalize: true,
    overlay_plot: [],
    stats: true,
    selected_plots_name: []
  };

export function displayFolderOrPlotComponentReducer(state = initialState, action: any) {
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
        default:
            throw new Error();
    }
}