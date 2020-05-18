import React, { useEffect, useState } from 'react';
import { Col, Form } from 'antd';
import { useRouter } from 'next/router';
import { Collapse, Row } from 'antd';

import { Reference } from './reference/reference';
import { SizeChanger } from '../sizeChanger';
import { setSize } from '../../reducers/displayFolderOrPlot';
import { setPlotToOverlay } from '../../reducers/displayFolderOrPlot';
import { sizes } from '../constants';
import { QueryProps } from '../../containers/display/interfaces';
import { formTriples } from './utils';
import { StyledCollapse } from './styledComponents';
import { CutomFormItem } from '../styledComponents';

const { Panel } = Collapse;


interface ViewDetailsMenuProps {
  dispatch: any;
  state: any;
  overlay_plot: any[];
  selected_plots: boolean
}

export const ViewDetailsMenu = ({ selected_plots, dispatch, state }: ViewDetailsMenuProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const [visible, setVisible] = useState(false)

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
    <StyledCollapse >
      <Panel header="Options" key="1">
        <Form>
          <CutomFormItem
            name="SizeChanger"
            label="Size">
            <SizeChanger
              dispatch={dispatch}
              setSize={setSize}
              currentValue={sizes.medium.size}
            />
          </CutomFormItem>
          <hr />
          <CutomFormItem
            name="Reference"
            label="Reference">
            <Reference state_global={state} dispatch_gloabl={dispatch} />
          </CutomFormItem>
        </Form>
      </Panel>
    </StyledCollapse>
  );
};
