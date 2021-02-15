import * as React from 'react';
import { Button } from 'antd';
import { Menu, Dropdown } from 'antd';
import { current_mode } from '../../config/config';

const modes = [{
  name: 'Online-new',
  link: 'https://cmsweb.cern.ch/dqm/online-new/'
},
{
  name: 'Online-playback-new',
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
        disabled={current_mode && current_mode.toUpperCase() === mode.name.toUpperCase()}>
        <Button
          type="link"
          disabled={current_mode && current_mode.toUpperCase() === mode.name.toUpperCase()}
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
        {current_mode}
      </Button>
    </Dropdown>
  )

}