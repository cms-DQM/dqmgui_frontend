import React, { useState, MouseEvent } from 'react';
import { Menu, Dropdown, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { OptionProps } from '../containers/display/interfaces';
import { StyledSecondaryButton } from './styledComponents';

export interface MenuProps {
  options: OptionProps[];
  title: string;
}

export const DropdownMenu = ({ options, title }: MenuProps) => {
  const plotMenu = (options: OptionProps[], title: string) => (
    <Menu>
      {options.map((option: OptionProps) => (
        <Menu.Item
          key={option.value}
          onClick={() => option?.action && option.action(option)}
        >
          <p>{option.label} </p>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Row>
      <Col>
        <Dropdown overlay={plotMenu(options, title)} trigger={['click']}>
          <StyledSecondaryButton className="ant-dropdown-link">
            {title} <DownOutlined />
          </StyledSecondaryButton>
        </Dropdown>
      </Col>
    </Row>
  );
};
