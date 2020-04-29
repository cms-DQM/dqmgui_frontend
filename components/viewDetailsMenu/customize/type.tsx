import React, { useState } from 'react';
import { StyledFormItem, StyledInput } from '../../styledComponents';
import { xyzTypes } from '../../constants';
import { OptionProps } from '../../../containers/display/interfaces';
import { Select, Row, Col } from 'antd';
import { StyledSelect } from '../styledComponents';
import { StyledCol } from '../../../containers/display/styledComponents';

const { Option } = Select;

interface TypesProps {
  type: string;
}

export const Type = ({ type }: TypesProps) => {
  return (
    <>
      <Col span={8}>
        <StyledFormItem name={`${type}type`} label={`${type} type`}>
          <StyledSelect defaultValue={xyzTypes[0].value}>
            {xyzTypes.map((option: OptionProps) => (
              <Option value={option.value} key={option.value.toString()}>
                {option.label}
              </Option>
            ))}
          </StyledSelect>
        </StyledFormItem>
      </Col>
      <StyledCol space={1} span={8}>
        <StyledFormItem label="min" name={`${type}min`}>
          <StyledInput />
        </StyledFormItem>
      </StyledCol>
      <Col span={8}>
        <StyledFormItem label="max" name={`${type}max`}>
          <StyledInput />
        </StyledFormItem>
      </Col>
    </>
  );
};
