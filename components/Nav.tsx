import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { Form } from 'antd';

import { StyledFormItem, StyledInput } from './styledComponents';
import { SearchButton } from './searchButton';
import { QuestionButton } from './helpButton';

interface NavProps {
  setRunNumber?: Dispatch<any>;
  setDatasetName?: Dispatch<any>;
  initial_search_run_number?: number;
  initial_search_dataset_name?: string;
  handler(search_by_run_number: number, search_by_dataset_name: string): void;
  type: string;
  defaultRunNumber?: number | undefined;
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
  searchForm
}: NavProps) => {
  const [form] = Form.useForm();
  const [form_search_run_number, setFormRunNumber] = useState(
    initial_search_run_number || NaN
  );
  const [form_search_dataset_name, setFormDatasetName] = useState(
    initial_search_dataset_name || ''
  );

  // We have to wait for changin initial_search_run_number and initial_search_dataset_name coming from query, because the first render they are undefined and therefore the initialValues doesn't grab them
  useEffect(() => {
    form.resetFields();
    setFormRunNumber(initial_search_run_number || NaN);
    setFormDatasetName(initial_search_dataset_name || '');
  }, [initial_search_run_number, initial_search_dataset_name, form]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 4 },
  };

  return (
    <div>
      <Form
        form={form}
        layout={'inline'}
        style={{ justifyContent: 'center', width: 'max-content' }}
        {...layout}
        name={`search_form${type}`}
        className="fieldLabel"
        initialValues={{
          run_number: initial_search_run_number,
          dataset_name: initial_search_dataset_name,
        }}
        onFinish={() => {
          setRunNumber && setRunNumber(form_search_run_number);
          setDatasetName && setDatasetName(form_search_dataset_name);
        }}
      >
        <Form.Item {...tailLayout}>
          <QuestionButton />
        </Form.Item>
        <StyledFormItem name="run_number">
          <StyledInput
            id="run_number"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormRunNumber(+e.target.value)
            }
            placeholder="Enter run number"
            type="text"
            name="run_number"
            value={defaultRunNumber}
          />
        </StyledFormItem>
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
        <Form.Item {...tailLayout}>
          <SearchButton
            onClick={() =>
              handler(form_search_run_number, form_search_dataset_name)
            }
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Nav;
