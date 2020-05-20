import React, { useReducer, useState, useEffect } from 'react';
import { Col, Row } from 'antd';

import {
  TripleProps,
  QueryProps,
} from '../../../containers/display/interfaces';
import {
  referenceReducer,
  initialState,
  addRun,
  change_value_in_reference_table,
} from '../../../reducers/reference';
import { StyledDiv, CustomCheckbox } from '../../styledComponents';
import {
  StyledForm,
} from '../../styledComponents';
import { formTriples } from '../utils';
import { useRouter } from 'next/router';
import { CustomModal } from '../search';
import { OverlayOptions } from './overlayOptions';
import { OverlayRuns } from './overlayRuns'
import FormItem from 'antd/lib/form/FormItem';

interface ReferenceProps {
  normalize: boolean;
  setNormalize(normalize: boolean): void;
  overlayPlots: string;
  setOverlay(overlayPlots: TripleProps[]): void
}

const isAllChecked = (triples: TripleProps[]) => {
  const checks: any[] = triples.map((triple: TripleProps) => {
    return triple.checked;
  });
  return checks.includes(false) ? false : true;
};

export const Reference = ({
  normalize,
  setNormalize,
  overlayPlots,
  setOverlay
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
  const overlayTriples = formTriples(
    query.overlay_data ? query.overlay_data : ''
  );

  useEffect(() => {
    addRun(overlayTriples)(state, dispatch);
  }, []);

  return (
    <StyledDiv>
      <StyledForm
        layout={'inline'}
        {...layout}
        name="search_form"
        className="fieldLabel"
        initialValues={{ remember: true }}
      >
        <Row>
          <FormItem
            name="CustomizeAll"
          >
            <CustomCheckbox
              checked={isAllChecked(triples)}
              onChange={(e: any) => {
                triples.map((triple: TripleProps) => {
                  change_value_in_reference_table(
                    triple.cheked ? triple.cheked : e.target.checked,
                    'checked',
                    triple.id
                  )(state, dispatch);
                });
              }}
            >
              Check All
          </CustomCheckbox>
          </FormItem>
          <Col>
            <FormItem
              name="OverlayPosition"
              label="Position:">
              <OverlayOptions/>
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <CustomCheckbox
                onClick={(e: any) => setNormalize(e.target.checked)}
                checked={normalize}
              >
                Normalize
               </CustomCheckbox>
            </FormItem>
          </Col>
          <Col>
          </Col>
        </Row>
        <CustomModal
          dispatch={dispatch}
          visible={state.open}
          id={selectedTriple.id}
          state={state}
        />
        <OverlayRuns
          triples={triples}
          state={state}
          dispatch={dispatch}
          query={query}
          setTriple={setTriple}
          setOverlay={setOverlay}
          overlayPlots={overlayPlots}
        />
      </StyledForm>
    </StyledDiv>
  );
};
