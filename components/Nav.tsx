import React, { FC, ChangeEvent, Dispatch, FormEvent, useReducer } from 'react';
import { Form, Input } from 'antd';

import {
  navReducer,
  initialState,
  setSearchFieldByDatasetName,
  setSearchFieldByRunNumber,
} from '../reducers/navReducer';
import { StyledButton, StyledFormItem } from './styles'

interface NavProps {
  setRunNumber: Dispatch<any>;
  setDatasetName: Dispatch<any>;
}

const Nav: FC<NavProps> = ({ setRunNumber, setDatasetName }) => {
  const [state, dispatch] = useReducer(navReducer, initialState);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 4 },
  };
  return (
    <Form
      layout={'inline'}
      {...layout}
      name="search_form"
      className="fieldLabel"
      initialValues={{ remember: true }}
      onFinish={() => {
        setRunNumber(state.search_by_run_number);
        setDatasetName(state.search_by_dataset_name);
      }}
    // onFinishFailed={onFinishFailed}
    >
      <StyledFormItem
        label="Run number:"
        name="run_number"
      >
        <Input
          id="run_number"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchFieldByRunNumber(e.target.value)(dispatch)
          }
          type="text"
          name="run_number"
        />
      </StyledFormItem>
      <StyledFormItem
        label="Dataset name:"
        name="dataset_name"
      >
        <Input
          id="dataset_name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchFieldByDatasetName(e.target.value)(dispatch)
          }
          type="text"
        />
      </StyledFormItem>
      <Form.Item {...tailLayout}>
        <StyledButton
          type="primary"
          htmlType="submit"
        >
          Search
        </StyledButton>
      </Form.Item>
    </Form>
  );
};

export default Nav;
