import * as React from 'react'
import { Menu, Dropdown, Row, Col, Button } from 'antd';
import {
  DownOutlined
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
          <Button type="link">
            More <DownOutlined />
          </Button>
        </Dropdown>
      </Col>
    </Row>
  );
};
