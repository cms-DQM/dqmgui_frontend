import React, { useContext } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox, Col, Row } from 'antd';
import { addOverlayData } from '../../plots/plot/singlePlot/utils';

import {
  TripleProps,
  QueryProps,
} from '../../../containers/display/interfaces';
import {
  FieldsWrapper,
  StyledDiv,
  StyledSecondaryButton,
  StyledButton,
  CustomCol,
  CustomDiv,
} from '../../styledComponents';
import { Field } from './field';
import { filter_plots, filter_valid_runs } from '../utils';
import { Container } from './containers';
import { store } from '../../../contexts/leftSideContext';
import {
  changeRouter,
  getChangedQueryParams,
} from '../../../containers/display/utils';

interface OverlayRunsProps {
  triples: TripleProps[];
  query: QueryProps;
  setTriple(triple: TripleProps): void;
}

export const OverlayRuns = ({
  triples,
  query,
  setTriple,
}: OverlayRunsProps) => {
  const globalState = useContext(store);
  const {
    setOverlay,
    overlayPosition,
    change_value_in_reference_table,
    removeRun,
    addRun,
    toggleOverlayDataMenu,
  } = globalState;

  return (
    <CustomDiv>
      <Row justify="space-between">
        <Col span={24}>
          {triples.map((triple: TripleProps) => (
            <FieldsWrapper key={triple.id.toString()}>
              <Col>
                <CustomCol space="2">
                  <Checkbox
                    checked={triple.checked as boolean}
                    onChange={(e: any) => {
                      change_value_in_reference_table(
                        triple.cheked ? triple.cheked : e.target.checked,
                        'checked',
                        triple.id
                      );
                    }}
                  />
                </CustomCol>
              </Col>
              <CustomCol space="2">
                <Container
                  change_value_in_reference_table={
                    change_value_in_reference_table
                  }
                  removeRun={removeRun}
                  id={triple.id}
                  defaultValue={query.run_number}
                  field_name="run_number"
                  value={triple.run_number}
                />
              </CustomCol>
              <CustomCol space="2">
                <Container
                  change_value_in_reference_table={
                    change_value_in_reference_table
                  }
                  removeRun={removeRun}
                  defaultValue={query.dataset_name}
                  id={triple.id}
                  field_name="dataset_name"
                  value={triple.dataset_name}
                />
              </CustomCol>
              <CustomCol space="2">
                <StyledDiv>
                  <CustomCol space="2">
                    <StyledSecondaryButton
                      onClick={() => {
                        toggleOverlayDataMenu(true);
                        setTriple(triple);
                      }}
                    >
                      Change
                    </StyledSecondaryButton>
                  </CustomCol>
                </StyledDiv>
              </CustomCol>
              <CustomCol space="2">
                <Field
                  change_value_in_reference_table={
                    change_value_in_reference_table
                  }
                  removeRun={removeRun}
                  id={triple.id}
                  field_name="label"
                  placeholder="label"
                  defaultValue={triple.label as string}
                  value={triple.label}
                />
              </CustomCol>
              <CustomCol space="2">
                <StyledSecondaryButton
                  onClick={async () => {
                    await removeRun(triple.id);
                    const filteredPlots = filter_plots(triples, triple.id);
                    setOverlay(filteredPlots);
                    changeRouter(
                      getChangedQueryParams(
                        {
                          overlay_data: `${addOverlayData(filteredPlots)}`,
                        },
                        query
                      )
                    );
                  }}
                  icon={<MinusOutlined />}
                ></StyledSecondaryButton>
              </CustomCol>
            </FieldsWrapper>
          ))}
        </Col>
      </Row>
      <Row justify="space-between">
        <CustomCol space="2">
          <StyledButton
            htmlType="submit"
            onClick={() => {
              const filtered: TripleProps[] = filter_valid_runs(triples);
              setOverlay(filtered);
              changeRouter(
                getChangedQueryParams(
                  {
                    overlay: overlayPosition,
                    overlay_data: `${addOverlayData(filtered)}`,
                  },
                  query
                )
              );
            }}
          >
            <a>Submit</a>
          </StyledButton>
        </CustomCol>
        <CustomCol space="2">
          <StyledSecondaryButton
            onClick={() => {
              if (triples.length < 4) {
                addRun();
              }
            }}
            icon={<PlusOutlined />}
          ></StyledSecondaryButton>
        </CustomCol>
      </Row>
    </CustomDiv>
  );
};
