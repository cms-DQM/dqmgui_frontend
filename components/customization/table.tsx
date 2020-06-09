import React from 'react';
import {
  OptionProps,
  CustomizeProps,
} from '../../containers/display/interfaces';
import { Col, Select, Form } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import cleanDeep from 'clean-deep';

import { withReference } from '../constants';
import { StyledInput } from '../styledComponents';
import { Type } from './type';
import {
  FullWidthRow,
  StyledSelect,
} from '../viewDetailsMenu/styledComponents';
import FormItem from 'antd/lib/form/FormItem';
import { Info } from '../info';
import { mostPopularCommands } from './drawOptions';
import { Store } from 'antd/lib/form/interface';

const { Option } = Select;

interface CostumizeTableProps {
  form: any;
  setCustomizationParams(custProps: Partial<Store> & CustomizeProps): void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const CostumizeTable = ({
  form,
  setCustomizationParams,
}: CostumizeTableProps) => {
  const referenceCopy: OptionProps[] = [...withReference];
  const types = ['x', 'y', 'z'];

  return (
    <Form
      layout={'inline'}
      {...layout}
      form={form}
      name="search_form"
      className="fieldLabel"
      initialValues={{ remember: true }}
      onFinish={(params) => {
        const cleanedParams = cleanDeep(params);
        setCustomizationParams(
          cleanedParams as Partial<Store> & CustomizeProps
        );
      }}
    >
      <FullWidthRow gutter={[8, 8]}>
        <Col span={24}>
          <FormItem label="Reference" name="withref">
            <StyledSelect defaultValue={referenceCopy[0].value}>
              {referenceCopy.map((option: OptionProps) => (
                <Option value={option.value} key={option.value.toString()}>
                  {option.label}
                </Option>
              ))}
            </StyledSelect>
          </FormItem>
        </Col>
        <Col span={24}>
          <FormItem label="Draw options" name="drawopts">
            <StyledInput
              suffix={
                <Info content={mostPopularCommands}>
                  <InfoCircleOutlined />
                </Info>
              }
              fullWidth={true}
            />
          </FormItem>
        </Col>
        <>
          {types.map((type) => (
            <Type type={type} />
          ))}
        </>
      </FullWidthRow>
    </Form>
  );
};
