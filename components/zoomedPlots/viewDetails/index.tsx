import React, { useEffect } from 'react';
import { Collapse } from 'antd';

import { DisplayOptions } from './displayOptions';
import { CostumizeTable } from '../../viewDetailsMenu/customize';

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
    <Collapse defaultActiveKey={['1']} style={{width: '100%'}}>
      <Panel header="Display Options" key="1">
        <DisplayOptions dispatch={dispatch} jsroot_mode={jsroot_mode} />
      </Panel>
      <Panel header="Customize" key="2" disabled={jsroot_mode}>
        {!jsroot_mode && <CostumizeTable dispatch={dispatch} />}
      </Panel>
    </Collapse>
  );
};
