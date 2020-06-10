import React, { useState } from 'react';
import { Col, Collapse } from 'antd';

import { DisplayOptions } from './displayOptions';
import { StyledCollapse } from '../../../viewDetailsMenu/styledComponents';
import Form from 'antd/lib/form/Form';

const { Panel } = Collapse;

export const ViewDetailsMenu = () => {
  return (
    <StyledCollapse>
      <Panel header="Options" key="1">
        <Form style={{ margin: 8 }}>
          <Col>
            <DisplayOptions />
          </Col>
        </Form>
      </Panel>
    </StyledCollapse>
  );
};
