import React, { useState } from 'react';
import {
  ParamsForApiProps,
  OptionProps,
  CustomizeProps,
} from '../../../containers/display/interfaces';
import { Form, Col, Select } from 'antd';

import { DropdownMenu } from '../../menu';
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
  const [reference, setReference] = useState<OptionProps>(withReference[0]);
  const [form] = Form.useForm();

  const referenceCopy: OptionProps[] = [...withReference];
  referenceCopy.map((option: OptionProps) => (option.action = setReference));

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
        setParamsForCustomize(cleanedParams as CustomizeProps)(dispatch);
      }}
    >
      <FullWidthRow>
        <Col span={24}>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ width: '30%', paddingBottom: '8px' }}>
                  <StyledFormItem label="Reference" name="withref">
                    <StyledSelect
                      allowClear
                      defaultValue={referenceCopy[0].value}
                    >
                      {referenceCopy.map((option: OptionProps) => (
                        <Option value={option.value}>{option.label}</Option>
                      ))}
                    </StyledSelect>
                    {/* <DropdownMenu title="Reference" options={referenceCopy} /> */}
                  </StyledFormItem>
                </td>
                <td style={{ width: '30%', paddingBottom: '8px' }}>
                  <StyledFormItem label="Draw options" name="drawopts">
                    <StyledInput />
                  </StyledFormItem>
                </td>
              </tr>
              {types.map((type) => (
                <Type type={type} />
              ))}
            </tbody>
          </table>
        </Col>
      </FullWidthRow>
      <FullWidthRow justify="end">
        <Col>
          <StyledButton htmlType="submit">Submit</StyledButton>
        </Col>
      </FullWidthRow>
    </Form>
  );
};
