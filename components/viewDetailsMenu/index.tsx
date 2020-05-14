import React, { useEffect, useState } from 'react';
import { Col, Form } from 'antd';
import { useRouter } from 'next/router';

import { Reference } from './reference/reference';
import { SizeChanger } from '../sizeChanger';
import { setSize } from '../../reducers/displayFolderOrPlot';
import { setPlotToOverlay } from '../../reducers/displayFolderOrPlot';
import { sizes } from '../constants';
import { QueryProps } from '../../containers/display/interfaces';
import { formTriples } from './utils';
import { OptionsRow, ViewDetailsRow } from './styledComponents';
import { StyledSecondaryButton, CutomFormItem } from '../styledComponents';
import { OpenCloseIcons } from './openCloseIcon';


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
    <OptionsRow zoomedPlots={selected_plots.toString()}>
      <Col>
        <StyledSecondaryButton style={{ background: 'white', color: "blue" }} onClick={() => setVisible(!visible)} type="primary">
          Options
          <OpenCloseIcons open={visible} />
        </StyledSecondaryButton>
      </Col>
      <ViewDetailsRow visible={visible.toString()}>
        <Form>
          <Col>
              <CutomFormItem
                name="SizeChanger"
                color="white"
                label="Size">
                <SizeChanger
                  dispatch={dispatch}
                  setSize={setSize}
                  currentValue={sizes.medium.size}
                />
              </CutomFormItem>
              <hr />
              <CutomFormItem
                color="white"
                name="Reference"
                label="Reference">
                <Reference state_global={state} dispatch_gloabl={dispatch} />
              </CutomFormItem>
          </Col>
        </Form>
      </ViewDetailsRow>
    </OptionsRow>
  );
};
