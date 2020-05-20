import React from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';
import { Checkbox, Col, Row } from 'antd';
import { addOverlayData } from '../../plots/plot/singlePlot/utils';

import { TripleProps, QueryProps } from '../../../containers/display/interfaces';
import { FieldsWrapper, StyledDiv, StyledSecondaryButton, StyledButton } from '../../styledComponents';
import { change_value_in_reference_table, toggleModal, removeRun, addRun } from '../../../reducers/reference';
import { Field } from './field';
import { filter_plots, filter_valid_runs } from '../utils';
import { Container } from './containers';
import Link from 'next/link';

interface OverlayRunsProps {
  triples: TripleProps[];
  state: any;
  dispatch: any;
  query: QueryProps;
  setTriple(triple: TripleProps): void;
  overlayPlots: string;
  setOverlay(overlayPlots: TripleProps[]): void
}

export const OverlayRuns = ({  overlayPlots, setOverlay, triples, state, dispatch, query, setTriple }: OverlayRunsProps) => {
  return (
    <div>
      <Row justify="space-between">
        <Col span={24}>
          {triples.map((triple: TripleProps) => (
            <FieldsWrapper key={triple.id.toString()}>
              <FormItem>
                <Checkbox
                  checked={triple.checked as boolean}
                  onChange={(e: any) => {
                    change_value_in_reference_table(
                      triple.cheked ? triple.cheked : e.target.checked,
                      'checked',
                      triple.id
                    )(state, dispatch);
                  }}
                />
              </FormItem>
              <Container
                state={state}
                dispatch={dispatch}
                id={triple.id}
                defaultValue={query.run_number}
                field_name="run_number"
                value={triple.run_number}
              />
              <Container
                state={state}
                defaultValue={query.dataset_name}
                dispatch={dispatch}
                id={triple.id}
                field_name="dataset_name"
                value={triple.dataset_name}
              />
              <StyledDiv>
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
              </StyledDiv>
              <Field
                state={state}
                dispatch={dispatch}
                id={triple.id}
                field_name="label"
                placeholder="label"
                defaultValue={triple.label as string}
                value={triple.label}
              />
              <FormItem>
                <StyledSecondaryButton
                  onClick={() => {
                    if (triples.length > 1) {
                      removeRun(triple.id)(state, dispatch);
                      const filteredPlots = filter_plots(triples, triple.id);
                      setOverlay(filteredPlots);
                    }
                  }}
                  icon={<MinusOutlined />}
                >
                </StyledSecondaryButton>
              </FormItem>
            </FieldsWrapper>
          ))}
        </Col>
      </Row>
      <Col span={24}>
        <Row justify="space-between">
          <Col>
            <FormItem>
              <StyledButton
                htmlType="submit"
                onClick={() => {
                  const filtered: TripleProps[] = filter_valid_runs(triples);
                  setOverlay(filtered);
                }}
              >
                <Link
                  href={{
                    pathname: '/',
                    query: {
                      run_number: query.run_number,
                      dataset_name: query.dataset_name,
                      folder_path: query.folder_path,
                      overlay: overlayPlots,
                      overlay_data: `${addOverlayData(triples)}`,
                      selected_plots: query.selected_plots,
                    },
                  }}
                >
                  <a>Submit</a>
                </Link>
              </StyledButton>
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <StyledSecondaryButton
                onClick={() => {
                  if (triples.length < 4) {
                    addRun()(state, dispatch);
                  }
                }}
                icon={<PlusOutlined />}
              ></StyledSecondaryButton>
            </FormItem>
          </Col>
        </Row>
      </Col>
    </div>
  )
}