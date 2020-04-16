import React, { FC, ChangeEvent, Dispatch, useReducer, useEffect } from 'react';
import { Form } from 'antd';

import {
  navReducer,
  initialState,
  setSearchFieldByDatasetName,
  setSearchFieldByRunNumber,
} from '../reducers/navReducer';
import { StyledFormItem, StyledInput } from './styles';
import { SearchButton } from './searchButton';
import { QuestionButton } from './helpButton';

interface NavProps {
  setRunNumber: Dispatch<any>;
  setDatasetName: Dispatch<any>;
  handler(search_by_run_number: number,
    search_by_dataset_name: string): void
}

const Nav: FC<NavProps> = ({ setRunNumber, setDatasetName, handler }) => {
  const [state, dispatch] = useReducer(navReducer, initialState);

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
        layout={'inline'}
        {...layout}
        name="search_form"
        className="fieldLabel"
        initialValues={{ remember: true }}
        onFinish={() => {
          setRunNumber(state.search_by_run_number);
          setDatasetName(state.search_by_dataset_name);
        }}
      >
        <Form.Item {...tailLayout}>
          <QuestionButton />
        </Form.Item>
        <StyledFormItem
          name="run_number" >
          <StyledInput
            id="run_number"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchFieldByRunNumber(e.target.value)(dispatch)
            }
            placeholder="Enter run number"
            type="text"
            name="run_number"
          />
        </StyledFormItem>
        <StyledFormItem
          name="dataset_name">
          <StyledInput
            id="dataset_name"
            placeholder="Enter dataset name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchFieldByDatasetName(e.target.value)(dispatch)
            }
            type="text"
          />
        </StyledFormItem>
        <Form.Item {...tailLayout}>
          <SearchButton onClick={() => handler(state.search_by_run_number, state.search_by_dataset_name)} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Nav;
