import React, { useState } from 'react';
import { Button, Row, Col, } from 'antd';

import { DisplayOptions } from './displayOptions';
import { CostumizeTable } from '../../../viewDetailsMenu/customize';
import {
  StyledCollapse,
  CheckboxesWrapper,
} from '../../../viewDetailsMenu/styledComponents';
import FormItem from 'antd/lib/form/FormItem';


interface ViewDetailsMenuProps {
  dispatch: any;
  jsroot_mode: boolean;
}

export const ViewDetailsMenu = ({
  dispatch,
  jsroot_mode,
}: ViewDetailsMenuProps) => {
  const [visible, setVisible] = useState(false)

  return (
    <Row style={{ position: 'fixed', zIndex: 3, background: '#f0f2f5', opacity: 0.93, width: '50%' }}>
      <Col>
        <Button onClick={() => setVisible(!visible)} type="link">
          Options
          </Button>
      </Col>
      <Row style={{ width: '100%', background: 'white', margin: 8, display: visible ? '' : 'none', opacity: 1 }}>
        <Col>
          <DisplayOptions dispatch={dispatch} jsroot_mode={jsroot_mode} />
        </Col>
        {!jsroot_mode && (
          <>
          <hr />
          <FormItem
            name="Customize"
            label="Customize">
            <CostumizeTable dispatch={dispatch} />
          </FormItem>
          </>
        )}
      </Row>
    </Row>

  );
};
