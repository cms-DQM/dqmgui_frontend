import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { Form } from 'antd';

import { StyledFormItem, StyledInput, CustomForm } from './styledComponents';
import { SearchButton } from './searchButton';
import { QuestionButton } from './helpButton';
import { functions_config } from '../config/config';

interface NavProps {
  setRunNumber?: Dispatch<any>;
  setDatasetName?: Dispatch<any>;
  initial_search_run_number?: string;
  initial_search_dataset_name?: string;
  initial_search_lumisection?: string;
  handler(search_by_run_number: string, search_by_dataset_name: string): void;
  type: string;
  defaultRunNumber?: undefined | string;
  defaultDatasetName?: string | undefined;
}

export const Nav = ({
  initial_search_run_number,
  initial_search_dataset_name,
  setRunNumber,
  setDatasetName,
  handler,
  type,
  defaultRunNumber,
  defaultDatasetName,
}: NavProps) => {
  const [form] = Form.useForm();
  const [form_search_run_number, setFormRunNumber] = useState(
    initial_search_run_number || ''
  );
  const [form_search_dataset_name, setFormDatasetName] = useState(
    initial_search_dataset_name || ''
  );

  // We have to wait for changin initial_search_run_number and initial_search_dataset_name coming from query, because the first render they are undefined and therefore the initialValues doesn't grab them
  useEffect(() => {
    form.resetFields();
    setFormRunNumber(initial_search_run_number || '');
    setFormDatasetName(initial_search_dataset_name || '');
  }, [initial_search_run_number, initial_search_dataset_name, form]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div style={{justifyContent: 'center', width: 'max-content'}}> 
      <CustomForm
        form={form}
        layout={'inline'}
        justifycontent="center"
        {...layout}
        name={`search_form${type}`}
        className="fieldLabel"
        initialValues={{
          run_number: initial_search_run_number,
          dataset_name: initial_search_dataset_name,
        }}
        onFinish={() => {
          form_search_run_number && setRunNumber(form_search_run_number);
          form_search_dataset_name && setDatasetName(form_search_dataset_name);
        }}
      >
        <Form.Item>
          <QuestionButton />
        </Form.Item>
        <StyledFormItem name="run_number">
          <StyledInput
            id="run_number"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormRunNumber(e.target.value)
            }
            placeholder="Enter run number"
            type="text"
            name="run_number"
            value={defaultRunNumber}
          />
        </StyledFormItem>
        {functions_config.mode !== 'ONLINE' && (
          <StyledFormItem name="dataset_name">
            <StyledInput
              id="dataset_name"
              placeholder="Enter dataset name"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormDatasetName(e.target.value)
              }
              type="text"
              value={defaultDatasetName}
            />
          </StyledFormItem>
        )}
        <Form.Item >
          <SearchButton
            onClick={() =>
              handler(form_search_run_number, form_search_dataset_name)
            }
          />
        </Form.Item>
      </CustomForm>
    </div>
  );
};

export default Nav;
