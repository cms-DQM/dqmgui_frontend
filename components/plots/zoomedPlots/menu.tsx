import * as React from 'react'
import { Menu, Dropdown, Row, Col } from 'antd';
import {
  MoreOutlined
} from '@ant-design/icons';
import { OptionProps } from '../../../containers/display/interfaces';


export interface MenuProps {
  options: OptionProps[];
}

export const ZoomedPlotMenu = ({ options }: MenuProps) => {

  const plotMenu = (options: OptionProps[]) => (
    <Menu>
      {options.map((option: OptionProps) => (
        <Menu.Item
          key={option.value}
          onClick={() => {
            option.action && option.action(option.value);
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
        <Dropdown overlay={plotMenu(options)} trigger={['hover']}>
          <a style={{ color: 'white' }}>
            More <MoreOutlined />{' '}
          </a>
        </Dropdown>
      </Col>
    </Row>
  );
};
