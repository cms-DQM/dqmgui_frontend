import React, { useContext } from 'react';
import { OptionProps } from '../../containers/display/interfaces';
import { Col, Select, Form } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import cleanDeep from 'clean-deep';

import { withReference } from '../constants';
import {
  StyledInput,
} from '../styledComponents';
import { Type } from './type';
import { FullWidthRow, StyledSelect } from '../viewDetailsMenu/styledComponents';
import FormItem from 'antd/lib/form/FormItem';
import { store } from '../../contexts/rightSideContext';
import { Info } from '../info';
import { mostPopularCommands } from './drawOptions';

const { Option } = Select;

interface CostumizeTableProps {
  form: any;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


export const CostumizeTable = ({ form }: CostumizeTableProps) => {
  const referenceCopy: OptionProps[] = [...withReference];
  const types = ['x', 'y', 'z'];
  const globalState = useContext(store)
  const { setCustomize } = globalState

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
        setCustomize(cleanedParams)
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
            <StyledInput suffix={
              <Info content={mostPopularCommands} >
                <InfoCircleOutlined />
              </Info>} fullWidth={true} />
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
