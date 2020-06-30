import React, { useEffect, useContext, useState } from 'react';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { Collapse, Switch } from 'antd';

import { Reference } from './reference/reference';
import { SizeChanger } from '../sizeChanger';
import { QueryProps } from '../../containers/display/interfaces';
import { formTriples } from './utils';
import { StyledCollapse } from './styledComponents';
import { CutomFormItem, CustomDiv } from '../styledComponents';
import { store } from '../../contexts/leftSideContext';
import { store as rightSideContext } from '../../contexts/rightSideContext';

const { Panel } = Collapse;

interface ViewDetailsMenuProps {
  selected_plots: boolean;
  setCollapseHeight(height: string): void
}

export const ViewDetailsMenu = ({ selected_plots, setCollapseHeight }: ViewDetailsMenuProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const globalState = useContext(store);
  const globalStateRightSide = useContext(rightSideContext);
  const { setJSROOTmode } = globalStateRightSide
  const rightSideSize = globalStateRightSide.size
  const setRightSideSize = globalStateRightSide.setSize

  const { size, setSize, setOverlay } = globalState;

  useEffect(() => {
    if (query) {
      if (query.overlay_data) {
        const formatObjects = formTriples(query.overlay_data);
        setOverlay(formatObjects);
      }
    }
    return () => {
      setOverlay([]);
      setJSROOTmode(false);
    };
  }, []);

  return (
    // <div ref={(refElem: HTMLDivElement) => {
    //   if (refElem) {
    //     setCollapseHeight(refElem.clientHeight.toString());
    //   }
    // }}>
      <StyledCollapse style={{width: '100%'}}>
        <Panel header="Options" key="1">
          <Form>
            <CustomDiv width="fit-content" display="flex" justifycontent="space-between" width="100%">
              <CutomFormItem name="SizeChanger" label="Left side size" style={{ width: '50%' }}>
                <SizeChanger currentValue={size} setSize={setSize} />
              </CutomFormItem>
                <CutomFormItem name="SizeChanger" label="Right side size" style={{ width: '50%' }}>
                  <SizeChanger currentValue={rightSideSize} setSize={setRightSideSize} disabled={!selected_plots}/>
                </CutomFormItem>
            </CustomDiv>
            <hr />
            <div style={{display: 'flex', justifyContent:'flex-end'}}>
              <CutomFormItem name="Jsroot" label="JSROOT" style={{ display: 'flex', justifyContent: 'flex-end', width: '50%' }}>
                <Switch
                  style={{ width: 'fit-content' }}
                  checkedChildren="JSROOT enabled"
                  unCheckedChildren="JSROOT disabled"
                  disabled={!selected_plots}
                  onChange={(e) => {
                    setJSROOTmode(e);
                  }}
                />
              </CutomFormItem>
            </div>
            <hr />
            <CutomFormItem name="Reference" label="Reference">
              <Reference />
            </CutomFormItem>
          </Form>
        </Panel>
      </StyledCollapse>
    // </div >

  );
};
