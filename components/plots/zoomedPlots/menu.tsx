import * as React from 'react'
import { Menu, Dropdown, Row, Col, Button } from 'antd';
import {
  DownOutlined
} from '@ant-design/icons';
import { OptionProps } from '../../../containers/display/interfaces';
import { FullWidthRow } from '../../viewDetailsMenu/styledComponents';
import { CustomDiv } from '../../styledComponents';


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
          <CustomDiv display="flex" justifycontent="space-around">
            <CustomDiv space="2" >{option.icon}</CustomDiv>
            <CustomDiv space="2" >{option.label}</CustomDiv>
          </CustomDiv>
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
