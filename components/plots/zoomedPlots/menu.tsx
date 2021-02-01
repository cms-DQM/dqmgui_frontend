import * as React from 'react';
import Link from 'next/link';
import { Menu, Dropdown, Row, Col, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { OptionProps } from '../../../containers/display/interfaces';

export interface MenuProps {
  options: OptionProps[];
}

export const ZoomedPlotMenu = ({ options, ...props }: MenuProps) => {
  const plotMenu = (options: OptionProps[]) => (
    <Menu>
      {options.map((option: OptionProps) => {
        if (option.value === 'overlay') {
          return (
            <Menu.Item
              icon={option.icon}>
              <Link href={option.url as string}>
                <a target="_bank">
                  {option.label}
                </a>
              </Link>
            </Menu.Item>
          )
        } else {
          return (
            <Menu.Item
              icon={option.icon}
              key={option.value}
              onClick={() => {
                option.action && option.action(option.value);
              }}
            >{option.label}
            </Menu.Item>
          )
        }
      })}
    </Menu >
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
