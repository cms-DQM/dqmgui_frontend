import React, { useEffect } from 'react';
import { Collapse, Row, Col, Typography } from 'antd';
import { useRouter } from 'next/router';

import { Reference } from './reference/reference';
import { ViewFiler } from './viewFilter';
import { SizeChanger } from '../sizeChanger';
import { setSize } from '../../reducers/displayFolderOrPlot';
import { setPlotToOverlay } from '../../reducers/displayFolderOrPlot';
import { sizes } from '../constants';
import { StyledCollapse, CheckboxesWrapper } from './styledComponents';
import { QueryProps } from '../../containers/display/interfaces';
import { formTriples } from './utils';

const { Panel } = Collapse;

interface ViewDetailsMenuProps {
  dispatch: any;
  state: any;
  overlay_plot: any[];
}

export const ViewDetailsMenu = ({ dispatch, state }: ViewDetailsMenuProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  useEffect(() => {
    if (query) {
      if (query.overlay_data) {
        const formatObjects = formTriples(query.overlay_data);
        setPlotToOverlay(formatObjects)(dispatch);
      }
    }

    return () => {
      setPlotToOverlay([])(dispatch);
    };
  }, []);

  return (
    <StyledCollapse>
      <Panel header="Overlay options" key="2">
        <Reference state_global={state} dispatch_gloabl={dispatch} />
      </Panel>
      <Panel header="Display options" key="3">
        <CheckboxesWrapper>
          <ViewFiler state={state} dispatch={dispatch} />
        </CheckboxesWrapper>
        <CheckboxesWrapper>
          <SizeChanger
            dispatch={dispatch}
            setSize={setSize}
            currentValue={sizes.medium.size}
          />
        </CheckboxesWrapper>
      </Panel>
    </StyledCollapse>
  );
};
