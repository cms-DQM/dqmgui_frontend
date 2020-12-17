import React, { useContext, useEffect } from 'react';
import { Form } from 'antd';
import { Collapse, Switch } from 'antd';

import { ReferenceWithOverlaidRuns } from './reference/reference';
import { SizeChanger } from '../sizeChanger';
import { StyledCollapse } from './styledComponents';
import { CutomFormItem, CustomDiv } from '../styledComponents';
import { store } from '../../contexts/leftSideContext';
import { useChangeRouter } from '../../hooks/useChangeRouter';
import { QueryProps } from '../../containers/display/interfaces';

const { Panel } = Collapse;

interface ViewDetailsMenuProps {
  selected_plots: boolean;
  query:QueryProps;
}

export const ViewDetailsMenu = ({ selected_plots, query }: ViewDetailsMenuProps) => {
  const globalState = useContext(store);
  const {
    size,
    setSize,
    setJSROOTmode,
    JSROOTmode,
    rightSideSize,
    setRightSideSize,
    setOverlaiPosition,
    setNormalize,
    setStats,
    overlayPosition,
    normalize,
    stats
  } = globalState;

  const normalize_value = query.normalize ? query.normalize : normalize
  const stats_value = query.stats === '' || query.stats === '0' ? query.stats : stats
  const position_value = query.overlay ? query.overlay : overlayPosition

  useEffect(() => {
    setOverlaiPosition(position_value)
    setNormalize(normalize_value)
    setStats(stats_value)
  }, [])

  useChangeRouter({ overlay: overlayPosition, normalize: normalize, stats: stats }, [overlayPosition, normalize, stats], true)
  
  return (
    <StyledCollapse style={{ width: '100%' }}>
      <Panel header="Options" key="1">
        <Form>
          <CustomDiv display="flex" justifycontent="space-between" width="100%">
            <CutomFormItem
              name="SizeChanger"
              label="Left side size"
              width="50%"
            >
              <SizeChanger currentValue={size} setSize={setSize} />
            </CutomFormItem>
            <CutomFormItem
              name="SizeChanger"
              label="Right side size"
              width="50%"
            >
              <SizeChanger
                currentValue={rightSideSize}
                setSize={setRightSideSize}
                disabled={!selected_plots}
              />
            </CutomFormItem>
          </CustomDiv>
          <hr />
          <CustomDiv display="flex" justifycontent="flex-end" width="100%">
            <CutomFormItem
              name="Jsroot"
              label="JSROOT"
              width="50%"
              display="flex"
              justifycontent="flex-end"
            >
              <Switch
                style={{ width: 'fit-content' }}
                checkedChildren="JSROOT enabled"
                unCheckedChildren="JSROOT disabled"
                disabled={!selected_plots}
                checked={JSROOTmode}
                onChange={(e) => {
                  setJSROOTmode(e);
                }}
              />
            </CutomFormItem>
          </CustomDiv>
          <hr />
          <CutomFormItem name="Reference" label="Reference">
            <ReferenceWithOverlaidRuns />
          </CutomFormItem>
        </Form>
      </Panel>
    </StyledCollapse>
  );
};
