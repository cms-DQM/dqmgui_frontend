import * as React from 'react'
import { Menu, Dropdown } from 'antd';
import { BulbOutlined } from '@ant-design/icons';

import { StyledSecondaryButton } from '../styledComponents';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://cmsrunregistry.web.cern.ch/online/global?">
        Run Registry
        </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://cmsoms.cern.ch/">
        OMS
        </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="https://cmsonline.cern.ch/">
        CMS online
        </a>
    </Menu.Item>
  </Menu>
);

export const UsefulLinks = () => {
  return (
    <Dropdown overlay={menu} placement="bottomCenter" arrow>
      <StyledSecondaryButton
      icon={<BulbOutlined />}
      >Useful Links</StyledSecondaryButton>
    </Dropdown>
  )
}