import * as React from 'react';
import { Button } from 'antd';
import { Menu, Dropdown } from 'antd';
import { mode as setMode } from '../../config/config';

const modes = [{
  name: 'Online',
  link: 'https://cmsweb.cern.ch/dqm/online-new/'
},
{
  name: 'Online-playback',
  link: 'https://cmsweb.cern.ch/dqm/online-playback-new/'
},
{
  name: 'Offline',
  link: 'https://dqm-gui.web.cern.ch/'
}]

const menu = (
  <Menu>
    {modes.map(mode => (
      <Menu.Item
        disabled={setMode === mode.name.toUpperCase()}>
        <Button
          type="link"
          disabled={setMode === mode.name.toUpperCase()}
          onClick={() => location.href = mode.link} >
          {mode.name}
        </Button>
      </Menu.Item>
    ))}
  </Menu>
);


export const ModesSelection = () => {
  return (
    <Dropdown overlay={menu} placement="bottomCenter" arrow>
      <Button
        type="link"
        style={{ color: 'white', fontVariant: 'all-small-caps' }}>
        {setMode}
      </Button>
    </Dropdown>
  )

}