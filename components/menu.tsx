import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { OptionProps } from '../containers/display/interfaces';

export interface MenuProps {
  options: OptionProps[];
}

const plotMenu = (options: OptionProps[]) => (
  <Menu>
    {options.map((option: OptionProps) => (
      <Menu.Item
        key={option.value}
        onClick={() => option?.action && option.action()}
      >
        <p>{option.label}</p>
      </Menu.Item>
    ))}
  </Menu>
);

export const DropdownMenu = ({ options }: MenuProps) => {
  return (
    <Dropdown overlay={plotMenu(options)} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Menu <DownOutlined />
      </a>
    </Dropdown>
  );
};
