import React, { FC, ChangeEvent, Dispatch, useReducer, useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import {
  navReducer,
  initialState,
  setSearchFieldByDatasetName,
  setSearchFieldByRunNumber,
} from '../reducers/navReducer';
import { StyledFormItem, StyledInput } from './styledComponents';
import { SearchButton } from './searchButton';
import { QuestionButton } from './helpButton';

interface NavProps {
  setRunNumber: Dispatch<any>;
  setDatasetName: Dispatch<any>;
  handler(search_by_run_number: number, search_by_dataset_name: string): void;
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
      <Row>
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
          <Col span={2}>
            <Form.Item {...tailLayout}>
              <QuestionButton />
            </Form.Item>
          </Col>
          <Col span={10}>
            <StyledFormItem name="run_number">
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
          </Col>
          <Col span={10}>
            <StyledFormItem name="dataset_name">
              <StyledInput
                id="dataset_name"
                placeholder="Enter dataset name"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchFieldByDatasetName(e.target.value)(dispatch)
                }
                type="text"
              />
            </StyledFormItem>
          </Col>
          <Col span={2}>
            <Form.Item {...tailLayout}>
              <SearchButton
                onClick={() =>
                  handler(
                    state.search_by_run_number,
                    state.search_by_dataset_name
                  )
                }
              />
            </Form.Item>
          </Col>
        </Form>
      </Row>
    </div>
  );
};

export default Nav;
