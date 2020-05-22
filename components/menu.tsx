import React, { useState } from 'react';
import { Menu, Dropdown, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { OptionProps } from '../containers/display/interfaces';

export interface MenuProps {
  options: OptionProps[];
  defaultValue: OptionProps;
  action?(value: any): void;
}

export const DropdownMenu = ({ options, defaultValue, action }: MenuProps) => {
  const [value, setValue] = useState(defaultValue);
  const plotMenu = (options: OptionProps[], defaultValue: OptionProps) => (
    <Menu>
      {options.map((option: OptionProps) => (
        <Menu.Item
          key={option.value}
          onClick={() => {
            action && action(option.value);
            setValue(option);
          }}
        >
          <div>{option.label}</div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Row>
      <Col>
        <Dropdown overlay={plotMenu(options, defaultValue)} trigger={['hover']}>
          <a style={{color: 'white'}}>
            {value.label} <DownOutlined />{' '}
          </a>
        </Dropdown>
      </Col>
    </Row>
  );
};
