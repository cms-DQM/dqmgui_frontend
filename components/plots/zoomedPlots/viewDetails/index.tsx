import React, { useState } from 'react';
import { Col, } from 'antd';

import { DisplayOptions } from './displayOptions';
import { CostumizeTable } from '../../../viewDetailsMenu/customize';
import {
  OptionsRow,
  ViewDetailsRow,
  ViewDetailsMenuWrapper,
} from '../../../viewDetailsMenu/styledComponents';
import { StyledSecondaryButton } from '../../../styledComponents';
import { OpenCloseIcons } from '../../../viewDetailsMenu/openCloseIcon';
import Form from 'antd/lib/form/Form';


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
    <OptionsRow zoomedPlots="true">
      <Col>
        <StyledSecondaryButton onClick={() => setVisible(!visible)} type="link">
          Options
          <OpenCloseIcons open={visible} />
        </StyledSecondaryButton>
      </Col>
      <ViewDetailsRow visible={visible.toString()}>
        <Form style={{margin: 8}}>
          <Col>
            <DisplayOptions dispatch={dispatch} jsroot_mode={jsroot_mode} />
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
      </ViewDetailsRow>
    </OptionsRow>

  );
};
