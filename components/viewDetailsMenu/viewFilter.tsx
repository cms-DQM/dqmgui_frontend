import React from 'react';
import { Checkbox } from 'antd';

import {
  setErrorBars,
  setNormalize,
  setStats,
} from '../../reducers/displayFolderOrPlot';
import { CheckboxesWrapper } from './styledComponents';
interface ViewFilerProps {
  dispatch(obj: any): any;
  state: any;
}

export const ViewFiler = ({ dispatch, state }: ViewFilerProps) => {
  return (
    <div style={{ display: 'flex', width: '50%' }}>
      <CheckboxesWrapper>
        <Checkbox
          onClick={(e: any) => {
            setStats(e.target.checked)(dispatch);
          }}
          checked={state.stats}
        >
          Stats
        </Checkbox>
      </CheckboxesWrapper>
      <CheckboxesWrapper>
        <Checkbox
          onClick={(e: any) => setNormalize(e.target.checked)(dispatch)}
          checked={state.normalize}
        >
          Normalize
        </Checkbox>
      </CheckboxesWrapper>
      <CheckboxesWrapper>
        <Checkbox
          onClick={(e: any) => setErrorBars(e.target.checked)(dispatch)}
          checked={state.errorBars}
        >
          ErrorBars
        </Checkbox>
      </CheckboxesWrapper>
    </div>
  );
};
