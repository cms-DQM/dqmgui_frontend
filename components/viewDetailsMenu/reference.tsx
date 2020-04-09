import React, { useState, ChangeEvent, FormEvent, useReducer } from 'react';
import { Form, Col } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { field_name } from '../constants';
import { TripleProps } from '../../containers/display/interfaces';
import { setPlotToOverlay } from '../../reducers/displayFolderOrPlot';
import {
  referenceReducer,
  initialState,
  change_value,
  removeRun,
  addRun,
} from '../../reducers/reference';
import { StyledDiv } from '../styledComponents';
import {
  StyledInput,
  StyledFormItem,
  StyledForm,
  StyledActionButtonRow,
  StyledSecondaryButton,
  StyledButton,
  FormItem,
} from '../styles';
import { overlayOptions } from '../constants';
import { RadioButtonsGroup } from '../radioButtonsGroup';

interface ReferenceProps {
  dispatch_gloabl: any;
}

export const Reference = ({ dispatch_gloabl }: ReferenceProps) => {
  const [state, dispatch] = useReducer(referenceReducer, initialState);
  const { triples } = state;

  const filter_valid_runs = (triples: TripleProps[]) =>
    triples.filter((triple: TripleProps) => {
      if (triple.run_number) {
        return triple;
      }
    });

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <StyledDiv>
      <RadioButtonsGroup options={overlayOptions} />
      <StyledForm
        layout={'inline'}
        {...layout}
        name="search_form"
        className="fieldLabel"
        initialValues={{ remember: true }}
        onFinish={() => {
          const filtered: TripleProps[] = filter_valid_runs(triples);
          setPlotToOverlay(filtered)(dispatch_gloabl);
        }}
        // onFinishFailed={onFinishFailed}
      >
        {triples.map((triple: TripleProps) => (
          <div style={{ display: 'flex' }} id={triple.id.toString()}>
            {Object.keys(triple).map((field: string) => {
              if (field !== 'id') {
                return (
                  <StyledFormItem key={field} name={field}>
                    <StyledInput
                      id={field}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        change_value(
                          e.target.value,
                          field,
                          triple.id
                        )(state, dispatch)
                      }
                      placeholder={`Enter ${field_name[field]}`}
                      type="text"
                      name={field}
                    />
                  </StyledFormItem>
                );
              }
            })}
            <FormItem>
              <StyledSecondaryButton
                onClick={() => {
                  if (triples.length > 1) {
                    removeRun(triple.id)(state, dispatch);
                  }
                }}
                icon={<MinusOutlined />}
              ></StyledSecondaryButton>
            </FormItem>
          </div>
        ))}
        <StyledActionButtonRow>
          <Col>
            <Form.Item>
              <Form.Item>
                <StyledButton type="submit">Submit</StyledButton>
              </Form.Item>
            </Form.Item>
          </Col>
          <Col>
            <StyledSecondaryButton
              onClick={() => {
                if (triples.length < 4) {
                  addRun()(state, dispatch);
                }
              }}
              icon={<PlusOutlined />}
            ></StyledSecondaryButton>
          </Col>
        </StyledActionButtonRow>
      </StyledForm>
    </StyledDiv>
  );
};
