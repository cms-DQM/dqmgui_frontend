import React, { useReducer, useState, useEffect } from 'react';
import { Form, Col, Checkbox } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import {
  TripleProps,
  QueryProps,
} from '../../../containers/display/interfaces';
import {
  setPlotToOverlay,
} from '../../../reducers/displayFolderOrPlot';
import {
  referenceReducer,
  initialState,
  removeRun,
  addRun,
  toggleModal,
  change_value_in_reference_table,
} from '../../../reducers/reference';
import { StyledDiv } from '../../styledComponents';
import {
  StyledForm,
  StyledActionButtonRow,
  StyledSecondaryButton,
  StyledButton,
  FormItem,
  FieldsWrapper,
} from '../../styledComponents';
import { filter_plots, filter_valid_runs, formTriples } from '../utils';
import { Field } from './field';
import { useRouter } from 'next/router';
import { CustomModal } from '../search';
import { Container } from './containers';
import Link from 'next/link';
import { addOverlayData } from '../../plots/plot/singlePlot/utils';
import { OverlayOptions } from './overlayOptions';

interface ReferenceProps {
  dispatch_gloabl: any;
  state_global: any;
}

const isAllChecked = (triples: TripleProps[]) => {
  const checks: any[] = triples.map((triple: TripleProps) => {
    return triple.checked
  })
  return checks.includes(false) ? false : true
}

export const Reference = ({
  dispatch_gloabl,
  state_global,
}: ReferenceProps) => {
  const [state, dispatch] = useReducer(referenceReducer, initialState);
  const [selectedTriple, setTriple] = useState<TripleProps>({});

  const { triples } = state;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const router = useRouter();
  const query: QueryProps = router.query;
  const overlayTriples = formTriples(query.overlay_data ? query.overlay_data : '')

  useEffect(() => {
    addRun(overlayTriples)(state, dispatch);
  }, [])

  return (
    <StyledDiv>
      <OverlayOptions
        current_value={state_global.overlay}
        dispatch_gloabl={dispatch_gloabl}
      />
      <StyledForm
        layout={'inline'}
        {...layout}
        name="search_form"
        className="fieldLabel"
        initialValues={{ remember: true }}
      >
        <CustomModal
          dispatch={dispatch}
          visible={state.open}
          id={selectedTriple.id}
          state={state}
        />
        <StyledDiv>
          <Checkbox
            checked={isAllChecked(triples)}
            onChange={(e: any) => {
              triples.map((triple: TripleProps) => {
                change_value_in_reference_table(
                  triple.cheked ? triple.cheked : e.target.checked,
                  'checked',
                  triple.id
                )(state, dispatch)
              })
            }
            }
          >Check All
        </Checkbox>
        </StyledDiv>
        {triples.map((triple: TripleProps) => (
          <FieldsWrapper key={triple.id.toString()}>
            <StyledDiv>
              <FormItem>
                <Checkbox
                  checked={(triple.checked) as boolean}
                  onChange={(e: any) => {
                    change_value_in_reference_table(
                      triple.cheked ? triple.cheked : e.target.checked,
                      'checked',
                      triple.id
                    )(state, dispatch)
                  }
                  }
                />
              </FormItem>
            </StyledDiv>
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
                onClick={() => {
                  toggleModal(!state.open)(dispatch);
                  setTriple(triple);
                }}
              >
                Change
              </StyledSecondaryButton>
            </FormItem>
            <StyledDiv>
              <Field
                state={state}
                dispatch={dispatch}
                id={triple.id}
                field_name="label"
                placeholder="label"
                defaultValue={triple.label as string}
                value={triple.label}
              />
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
          </FieldsWrapper>
        ))}
        <StyledActionButtonRow>
          <Col>
            <Form.Item>
              <Form.Item>
                <StyledButton htmlType="submit"
                  onClick={() => {
                    const filtered: TripleProps[] = filter_valid_runs(triples);
                    setPlotToOverlay(filtered)(dispatch_gloabl);
                  }}
                >
                  <Link
                    href={{
                      pathname: '/',
                      query: {
                        run_number: query.run_number,
                        dataset_name: query.dataset_name,
                        folder_path: query.folder_path,
                        overlay: state_global.overlay,
                        overlay_data: `${addOverlayData(triples)}`,
                        selected_plots: query.selected_plots,
                      }
                    }}
                  >
                    <a>Submit</a>
                  </Link>
                </StyledButton>
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
            >
            </StyledSecondaryButton>
          </Col>
        </StyledActionButtonRow>
      </StyledForm>
    </StyledDiv>
  );
};
