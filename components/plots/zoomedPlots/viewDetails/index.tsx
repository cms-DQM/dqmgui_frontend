import React, { useState } from 'react';
import { Col, Collapse } from 'antd';

import { DisplayOptions } from './displayOptions';
import { StyledCollapse } from '../../../viewDetailsMenu/styledComponents';
import Form from 'antd/lib/form/Form';

const { Panel } = Collapse;

interface ViewDetailsMenuProps {}

export const ViewDetailsMenu = ({}: ViewDetailsMenuProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <StyledCollapse>
      <Panel header="Options" key="1">
        {/* <ViewDetailsRow visible={visible.toString()}> */}
        <Form style={{ margin: 8 }}>
          <Col>
            <DisplayOptions />
          </Col>
          {/* {!jsroot_mode && (
            <>
              <hr />
              <FormItem
                name="Customize"
                label="Customize">
                <CostumizeTable dispatch={dispatch} />
              </FormItem>
            </>
          )} */}
        </Form>
      </Panel>
    </StyledCollapse>
  );
};
