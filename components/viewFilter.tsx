import { Dispatch, SetStateAction, ChangeEvent } from "react"
import { sizes, FOLDERS_OR_PLOTS_REDUCER } from '../components/constants';

interface ViewFilerProps {
  dispatch(obj: any): any
  // set_stats: Dispatch<SetStateAction<boolean>>
  // set_errBars: Dispatch<SetStateAction<boolean>>
}

export const ViewFiler = ({ dispatch }: ViewFilerProps) => {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <label htmlFor="stats">Stats:</label>
        <input type="checkbox" onClick={(e: any) => {
          dispatch({ type: FOLDERS_OR_PLOTS_REDUCER.SET_STATS, payload: e.target.checked })
        }} />
      </div>
      <div>
        <label htmlFor="normalize">Normalize</label>
        <input type="checkbox" onClick={(e: any) =>
          dispatch({
            type: FOLDERS_OR_PLOTS_REDUCER.SET_NORMALIZE,
            payload: e.target.checked
          })
        } />
      </div>
      <div>
        <label htmlFor="errorBars">ErrorBars:</label>
        <input type="checkbox" onClick={(e: any) =>
          dispatch({
            type: FOLDERS_OR_PLOTS_REDUCER.SET_ERR_BARS,
            payload: e.target.checked
          })
        } />
      </div>
    </div>
  )
}