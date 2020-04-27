import React from 'react';
import { Checkbox, Row, Col } from 'antd';

import {
  setErrorBars,
  setNormalize,
  setStats,
} from '../../reducers/displayFolderOrPlot';

interface ViewFilerProps {
  dispatch(obj: any): any;
  state: any;
}

export const ViewFiler = ({ dispatch, state }: ViewFilerProps) => {
  return (
    <Row>
      <Col>
        <Checkbox
          onClick={(e: any) => {
            setStats(e.target.checked)(dispatch);
          }}
          checked={state.stats}
        >
          Stats
        </Checkbox>
      </Col>
      <Col>
        <Checkbox
          onClick={(e: any) => setNormalize(e.target.checked)(dispatch)}
          checked={state.normalize}
        >
          Normalize
        </Checkbox>
      </Col>
      <Col>
        <Checkbox
          onClick={(e: any) => setErrorBars(e.target.checked)(dispatch)}
          checked={state.errorBars}
        >
          ErrorBars
        </Checkbox>
      </Col>
    </Row>
  );
};
