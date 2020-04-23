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
import { StyledDiv } from '../styledComponents';
const { Title } = Typography;

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
      <Panel header="Options" key="1">
        <Row>
          <Col style={{borderRight: '1px solid'}}>
            <CheckboxesWrapper>
              <Title level={3}>Overlay options</Title>
            </CheckboxesWrapper>
            <Reference state_global={state} dispatch_gloabl={dispatch} />
          </Col>
          <Col>
            <CheckboxesWrapper>
              <Title level={3}>Display options</Title>
            </CheckboxesWrapper>
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
          </Col >
        </Row >
      </Panel >
    </StyledCollapse >
  );
};
