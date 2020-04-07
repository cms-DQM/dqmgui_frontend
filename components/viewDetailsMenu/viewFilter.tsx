import React from 'react';

import { setErrorBars, setNormalize, setStats } from "../../reducers/displayFolderOrPlot";

interface ViewFilerProps {
  dispatch(obj: any): any
}

export const ViewFiler = ({ dispatch }: ViewFilerProps) => {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <label htmlFor="stats">Stats:</label>
        <input type="checkbox" onClick={(e: any) => {
          setStats(e.target.checked)(dispatch)
        }} />
      </div>
      <div>
        <label htmlFor="normalize">Normalize</label>
        <input type="checkbox" onClick={(e: any) =>
          setNormalize(e.target.checked)(dispatch)
        } />
      </div>
      <div>
        <label htmlFor="errorBars">ErrorBars:</label>
        <input type="checkbox" onClick={(e: any) =>
          setErrorBars(e.target.checked)(dispatch)
        } />
      </div>
    </div>
  )
}
