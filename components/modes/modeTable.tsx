import * as React from 'react';
import { Button, Row } from 'antd';

import { functions_config } from '../../config/config';

const modes = [
  {
    key: '1',
    mode: 'Online',
    link: 'https://cmsweb.cern.ch/dqm/online-new/',
  },
  {
    key: '2',
    mode: 'Online-playback',
    link: 'https://cmsweb.cern.ch/dqm/online-playback-new/',
  },
  {
    key: '3',
    mode: 'Offline',
    link: 'https://dqm-gui.web.cern.ch/',
  },
];


export const ModesTable = () => {
  return (<Row style={{ display: 'flex', justifyContent: 'space-between' }}>
    {modes.map((mode) => {
      return (<Button
        disabled={mode.mode.toUpperCase() === functions_config.mode.toUpperCase()}
        onClick={() => location.href = mode.link}
        type="link">{mode.mode}</Button>)
    })}
  </Row>)
}