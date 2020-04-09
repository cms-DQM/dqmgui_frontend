import React, { useState, ChangeEvent, FormEvent, useReducer } from 'react';
import { Form, Col } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { field_name } from '../constants';
import { TripleProps } from '../../containers/display/interfaces';
import { setPlotToOverlay, setOverlay } from '../../reducers/displayFolderOrPlot';
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
  state_global: any;
}

export const Reference = ({ dispatch_gloabl, state_global }: ReferenceProps) => {
  const [state, dispatch] = useReducer(referenceReducer, initialState);
  const { triples } = state;

  const filter_valid_runs = (triples: TripleProps[]) =>
    triples.filter((triple: TripleProps) => {
      if (triple.run_number) {
        return triple;
      }
    });

  const filter_plots = (triples: TripleProps[], id: any, ) => {
    return triples.filter((triple: TripleProps) => {
      if (triple.id !== id && triple.run_number) {
        return triple;
      }
    })
  }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <StyledDiv>
      <RadioButtonsGroup current_value={state_global.overlay} action={(value: string) => setOverlay(value)(dispatch_gloabl)} options={overlayOptions} />
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
                  <StyledDiv>
                    <StyledFormItem
                      key={field}
                      name={`${triple.id}_${field}`}
                    >
                      <StyledInput
                        id={field}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          change_value(
                            e.target.value,
                            field,
                            triple.id
                          )(state, dispatch)
                        }
                        value={triple[field]}
                        placeholder={`Enter ${field_name[field]}`}
                        type="text"
                        name={field}
                      />
                    </StyledFormItem>
                  </StyledDiv>
                );
              }
            })}
            <FormItem>
              <StyledSecondaryButton
                onClick={() => {
                  if (triples.length > 1) {
                    removeRun(triple.id)(state, dispatch);
                    const filteredPlots = filter_plots(triples, triple.id);
                    setPlotToOverlay(filteredPlots)(dispatch_gloabl);
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
                <StyledButton
                  htmlType="submit">
                  Submit</StyledButton>
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
