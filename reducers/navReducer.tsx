import { NavigationSearchFieldsProps } from "../containers/display/interfaces";
import { NAV_REDUCER } from "../components/constants";

export const initialState: NavigationSearchFieldsProps = {
  search_by_dataset_name: '',
  search_by_run_number: NaN
}

export const setSearchFieldByDatasetName = (search: string) => (dispatch: any) => {
  dispatch({
    type: NAV_REDUCER.SET_SEARCH_BY_DATASET_NAME,
    payload: search
  })
}

export const setSearchFieldByRunNumber = (search: string) => (dispatch: any) => {
  dispatch({
    type: NAV_REDUCER.SET_SEARCH_BY_RUN_NUMBER,
    payload: search
  })
}

export const navReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case NAV_REDUCER.SET_SEARCH_BY_DATASET_NAME:
      return { ...state, search_by_dataset_name: action.payload }
    case NAV_REDUCER.SET_SEARCH_BY_RUN_NUMBER:
      return { ...state, search_by_run_number: action.payload }
    default:
      throw new Error();
  }
}