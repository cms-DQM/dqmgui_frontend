import React, { useState } from 'react';
import { ParamsForApiProps, OptionProps } from '../../../containers/display/interfaces';
import { Form, Button, Checkbox } from 'antd';

import { DropdownMenu } from '../../menu'
import { xyzTypes, withReference } from '../../constants';
import { StyledInput, StyledFormItem } from '../../styledComponents';
import { Type } from './type';

interface CostumizeTableProps {
  params?: ParamsForApiProps
}

export const CostumizeTable = (params = {}) => {
  
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 4 },
  };
  const types = ['x', 'y', 'z']

  return (
    <Form
      layout={'inline'}
      {...layout}
      name="search_form"
      className="fieldLabel"
      initialValues={{ remember: true }}
      onFinish={() => { }}
    >
      <table>
        <tbody>
          {
            types.map((type) =>
              <Type type={type}/>
            )
          }
        </tbody>
      </table>
      <StyledFormItem
        label="Draw options"
        name="drawOptions"
      >
        <StyledInput />
      </StyledFormItem>
      <DropdownMenu title="Reference" options={withReference} />
    </Form>
  );
};
