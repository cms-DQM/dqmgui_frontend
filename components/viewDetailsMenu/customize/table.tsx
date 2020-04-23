import React from 'react';
import {
  ParamsForApiProps,
  OptionProps,
  CustomizeProps,
} from '../../../containers/display/interfaces';
import { Form, Col, Select } from 'antd';

import { withReference } from '../../constants';
import {
  StyledInput,
  StyledFormItem,
  StyledButton,
} from '../../styledComponents';
import { Type } from './type';
import { FullWidthRow, StyledSelect } from '../styledComponents';
import { setParamsForCustomize } from '../../../reducers/displayFolderOrPlot';
import cleanDeep from 'clean-deep';

const { Option } = Select;

interface CostumizeTableProps {
  params?: ParamsForApiProps;
  dispatch: any;
}

export const CostumizeTable = ({ dispatch }: CostumizeTableProps) => {
  const referenceCopy: OptionProps[] = [...withReference];

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const types = ['x', 'y', 'z'];

  return (
    <Form
      layout={'inline'}
      {...layout}
      name="search_form"
      className="fieldLabel"
      initialValues={{ remember: true }}
      onFinish={(params) => {
        const cleanedParams = cleanDeep(params);
        console.log(cleanedParams)
        setParamsForCustomize(cleanedParams as CustomizeProps)(dispatch);
      }}
    >
      <FullWidthRow>
        <Col span={8}>
          <StyledFormItem label="Reference" name="withref">
            <StyledSelect
              defaultValue={referenceCopy[0].value}>
              {referenceCopy.map((option: OptionProps) => (
                <Option value={option.value}>{option.label}</Option>
              ))}
            </StyledSelect>
          </StyledFormItem>
        </Col>
        <Col span={8}>
          <StyledFormItem label="Draw options" name="drawopts">
            <StyledInput />
          </StyledFormItem>
        </Col>
      </FullWidthRow>
      <FullWidthRow>
        {types.map((type) => (
          <Type type={type} />
        ))}
      </FullWidthRow>
      <FullWidthRow justify="end">
        <Col>
          <StyledButton htmlType="submit">Submit</StyledButton>
        </Col>
      </FullWidthRow>
    </Form>
  );
};
