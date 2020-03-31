import { FOLDERS_OR_PLOTS_REDUCER } from '../components/constants'

import { sizes } from './constants'

interface SizeChangerProps {
  dispatch(params: any): void;
}
export const SizeChanger = ({ dispatch }: SizeChangerProps) => {
  return (
    <>
      <button onClick={() => {
        dispatch({
          type: FOLDERS_OR_PLOTS_REDUCER.SET_HEIGHT,
          payload: sizes.large.size.h
        })
        dispatch({
          type: FOLDERS_OR_PLOTS_REDUCER.SET_WIDTH,
          payload: sizes.large.size.w
        })
      }}>
        {sizes.large.label
        }
      </button>
      <button onClick={() => {
        dispatch({
          type: FOLDERS_OR_PLOTS_REDUCER.SET_HEIGHT,
          payload: sizes.fill.size.h
        })
        dispatch({
          type: FOLDERS_OR_PLOTS_REDUCER.SET_WIDTH,
          payload: sizes.fill.size.w
        })
      }}>
        {sizes.fill.label
        }
      </button>
      <button onClick={() => {
        dispatch({
          type: FOLDERS_OR_PLOTS_REDUCER.SET_HEIGHT,
          payload: sizes.small.size.h
        })
        dispatch({
          type: FOLDERS_OR_PLOTS_REDUCER.SET_WIDTH,
          payload: sizes.small.size.w
        })
      }}>
        {sizes.small.label
        }
      </button></>
  )
}