import React from 'react';
import { Select, Row, Col, Input } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

import { StyledInput } from '../styledComponents';
import { xyzTypes } from '../constants';
import { OptionProps } from '../../containers/display/interfaces';
import { StyledSelect } from '../viewDetailsMenu/styledComponents';

const { Option } = Select;

interface TypesProps {
  type: string;
}

export const Type = ({ type }: TypesProps) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={8}>
        <FormItem name={`${type}type`} label={`${type} type`}>
          <StyledSelect defaultValue={xyzTypes[0].value}>
            {xyzTypes.map((option: OptionProps) => (
              <Option value={option.value} key={option.value.toString()}>
                {option.label}
              </Option>
            ))}
          </StyledSelect>
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem name={`${type}min`}>
          <StyledInput prefix={'min:'} fullWidth={true} />
        </FormItem>
      </Col>
      <Col span={8}>
        <FormItem name={`${type}max`} style={{ display: 'flex' }}>
          <StyledInput prefix={'max:'} fullWidth={true} />
        </FormItem>
      </Col>
    </Row>
  );
};
