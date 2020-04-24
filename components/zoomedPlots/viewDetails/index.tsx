import React, { useEffect, useState } from 'react';
import { Collapse, Typography, Row, Col } from 'antd';

import { DisplayOptions } from './displayOptions';
import { CostumizeTable } from '../../viewDetailsMenu/customize';
import {
  StyledCollapse,
  CheckboxesWrapper,
} from '../../viewDetailsMenu/styledComponents';

const { Title } = Typography;

const { Panel } = Collapse;

interface ViewDetailsMenuProps {
  dispatch: any;
  jsroot_mode: boolean;
}

export const ViewDetailsMenu = ({
  dispatch,
  jsroot_mode,
}: ViewDetailsMenuProps) => {
  return (
    <StyledCollapse>
      <Panel header="Display Options" key="1">
        <DisplayOptions dispatch={dispatch} jsroot_mode={jsroot_mode} />
      </Panel>
      <Panel header="Customize" key="2" disabled={jsroot_mode}>
        {!jsroot_mode && (
          <>
            <CheckboxesWrapper>
              <Title level={4}>Customize</Title>
            </CheckboxesWrapper>
            <CheckboxesWrapper>
              <CostumizeTable dispatch={dispatch} />
            </CheckboxesWrapper>
          </>
        )}
      </Panel>
      {/* <Panel header="Options" key="1">
        <Row>
          <Col>
            <CheckboxesWrapper>
              <Title
              level={4}>Display Options</Title>
            </CheckboxesWrapper>
            <CheckboxesWrapper>
              <DisplayOptions dispatch={dispatch} jsroot_mode={jsroot_mode} />
            </CheckboxesWrapper>
          </Col>
          <Col>
            {!jsroot_mode &&
              <>
                <CheckboxesWrapper>
                  <Title level={4}>Customize</Title>
                </CheckboxesWrapper>
                <CheckboxesWrapper>
                  <CostumizeTable dispatch={dispatch} />
                </CheckboxesWrapper>
              </>
            }
          </Col>
        </Row>
      </Panel> */}
    </StyledCollapse>
  );
};
