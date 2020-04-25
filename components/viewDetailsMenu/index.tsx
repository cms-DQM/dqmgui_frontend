import React, { useEffect } from 'react';
import { Collapse, Row, Col, Typography } from 'antd';

import { Reference } from './reference/reference';
import { ViewFiler } from './viewFilter';
import { SizeChanger } from '../sizeChanger';
import { setSize } from '../../reducers/displayFolderOrPlot';
import {
  setPlotToOverlay,
  setSelectedPlotsName,
} from '../../reducers/displayFolderOrPlot';
import { sizes } from '../constants';
import { StyledCollapse, CheckboxesWrapper } from './styledComponents';

const { Panel } = Collapse;

interface ViewDetailsMenuProps {
  dispatch: any;
  state: any;
  overlay_plot: any[];
}

export const ViewDetailsMenu = ({ dispatch, state }: ViewDetailsMenuProps) => {
  useEffect(() => {
    return () => {
      setPlotToOverlay([])(dispatch);
      setSelectedPlotsName([])(dispatch);
    };
  }, []);

  return (
    <StyledCollapse>
      <Panel header="Overlay options" key="2">
        <Reference state_global={state} dispatch_gloabl={dispatch} />
      </Panel>
      <Panel header="Display options" key="3">
        <CheckboxesWrapper>
          <ViewFiler state={state} dispatch={dispatch} />
        </CheckboxesWrapper>
        <CheckboxesWrapper>
          <SizeChanger
            dispatch={dispatch}
            setSize={setSize}
            currentValue={sizes.medium.size}
          />
        </CheckboxesWrapper>
      </Panel>
    </StyledCollapse>
  );
};
