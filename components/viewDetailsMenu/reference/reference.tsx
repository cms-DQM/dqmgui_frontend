import React, { useReducer, useState, useEffect, useContext } from 'react';
import { Col } from 'antd';

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
import {
  StyledDiv,
  CustomCheckbox,
  CustomRow,
  CustomCol,
} from '../../styledComponents';
import { formTriples } from '../utils';
import { useRouter } from 'next/router';
import { CustomModal } from '../search';
import { OverlayOptions } from './overlayOptions';
import { OverlayRuns } from './overlayRuns';
import FormItem from 'antd/lib/form/FormItem';
import { useChangeRouter } from '../../../hooks/useChangeRouter';
import { store } from '../../../contexts/leftSideContext';

const isAllChecked = (triples: TripleProps[]) => {
  const checks: any[] = triples.map((triple: TripleProps) => {
    return triple.checked;
  });
  return checks.includes(false) ? false : true;
};

export const Reference = () => {
  const [state, dispatch] = useReducer(referenceReducer, initialState);
  const [selectedTriple, setTriple] = useState<TripleProps>({});

  const globalState = useContext(store);
  const {
    normalize,
    setNormalize,
    addRun,
    triples,
    change_value_in_reference_table
  } = globalState;

  const checkedValue = normalize === 'True' ? true : false;
  const [checked, setChecked] = useState(checkedValue);
console.log(triples)
  // const { triples } = state;

  const router = useRouter();
  const query: QueryProps = router.query;
  const overlayTriples = formTriples(
    query.overlay_data ? query.overlay_data : ''
  );

  useEffect(() => {
    addRun(overlayTriples);
  }, []);

  useChangeRouter({ normalize: normalize }, [normalize as any], true);
  return (
    <StyledDiv>
      <CustomRow>
        <CustomCol space={'2'}>
          <FormItem name="CustomizeAll">
            <CustomCheckbox
              checked={isAllChecked(triples)}
              onChange={(e: any) => {
                triples.map((triple: TripleProps) => {
                  change_value_in_reference_table(
                    triple.cheked ? triple.cheked : e.target.checked,
                    'checked',
                    triple.id
                  );
                });
              }}
            >
              Check All
            </CustomCheckbox>
          </FormItem>
        </CustomCol>
        <CustomCol space={'2'}>
          <FormItem name="OverlayPosition" label="Position:">
            <OverlayOptions />
          </FormItem>
        </CustomCol>
        <CustomCol space={'2'}>
          <FormItem>
            <CustomCheckbox
              onClick={(e: any) => {
                setChecked(e.target.checked);
                const normalizeValue = e.target.checked ? 'True' : 'False';
                setNormalize(normalizeValue);
              }}
              checked={normalize === 'True' ? true : false}
            >
              Normalize
            </CustomCheckbox>
          </FormItem>
        </CustomCol>
        <Col></Col>
      </CustomRow>
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
      />
    </StyledDiv>
  );
};
