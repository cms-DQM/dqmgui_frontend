import React, { useReducer } from 'react';
import { Form, Col } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { TripleProps, FolderPathQuery } from '../../../containers/display/interfaces';
import { setPlotToOverlay, setOverlay } from '../../../reducers/displayFolderOrPlot';
import {
  referenceReducer,
  initialState,
  removeRun,
  addRun,
  openModal,
} from '../../../reducers/reference';
import { StyledDiv } from '../../styledComponents';
import {
  StyledForm,
  StyledActionButtonRow,
  StyledSecondaryButton,
  StyledButton,
  FormItem,
} from '../../styles';
import { overlayOptions } from '../../constants';
import { RadioButtonsGroup } from '../../radioButtonsGroup';
import { filter_plots, filter_valid_runs } from '../utils';
import { Field } from './field';
import { useRouter } from 'next/router';
import { CustomModal } from '../search';
import { Container } from './containers';

interface ReferenceProps {
  dispatch_gloabl: any;
  state_global: any;
}

export const Reference = ({ dispatch_gloabl, state_global }: ReferenceProps) => {
  const [state, dispatch] = useReducer(referenceReducer, initialState);
  const { triples } = state;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const router = useRouter()
  const query: FolderPathQuery = router.query;

  return (
    <StyledDiv>
      <RadioButtonsGroup
        current_value={state_global.overlay}
        action={(value: string) => setOverlay(value)(dispatch_gloabl)}
        options={overlayOptions} />
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
          <div style={{ display: 'flex', alignItems: 'center' }} id={triple.id.toString()}>
            <StyledDiv>
              <Container
                state={state}
                dispatch={dispatch}
                id={triple.id}
                defaultValue={query.run_number}
                field_name="run_number"
                value={triple.run_number}
              />
            </StyledDiv>
            <StyledDiv>
              <Container
                state={state}
                defaultValue={query.dataset_name}
                dispatch={dispatch}
                id={triple.id}
                field_name="dataset_name"
                value={triple.dataset_name}
              />
            </StyledDiv>
            <FormItem>
              <StyledSecondaryButton
                onClick={() => openModal(!state.open)(dispatch)}>Change</StyledSecondaryButton>
              <CustomModal
                dispatch={dispatch}
                visible={state.open}
                id={triple.id}
                state={state}
              />
            </FormItem>
            <StyledDiv>
              <Field
                state={state}
                dispatch={dispatch}
                id={triple.id}
                field_name="label"
                placeholder="label"
                value={triple.label} />
            </StyledDiv>
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
