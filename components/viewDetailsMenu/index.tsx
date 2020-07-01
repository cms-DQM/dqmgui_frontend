import React, { useEffect, useContext } from 'react';
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

const { Panel } = Collapse;

interface ViewDetailsMenuProps {
  selected_plots: boolean;
}

export const ViewDetailsMenu = ({ selected_plots }: ViewDetailsMenuProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const globalState = useContext(store);
  const { size, setSize, setOverlay,setJSROOTmode, rightSideSize, setRightSideSize } = globalState;

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
    <StyledCollapse style={{ width: '100%' }}>
      <Panel header="Options" key="1">
        <Form>
          <CustomDiv display="flex" justifycontent="space-between" width="100%">
            <CutomFormItem name="SizeChanger" label="Left side size" width="50%">
              <SizeChanger currentValue={size} setSize={setSize} />
            </CutomFormItem>
            <CutomFormItem name="SizeChanger" label="Right side size" width="50%">
              <SizeChanger currentValue={rightSideSize} setSize={setRightSideSize} disabled={!selected_plots} />
            </CutomFormItem>
          </CustomDiv>
          <hr />
          <CustomDiv display='flex' justifycontent='flex-end' width="100%">
            <CutomFormItem name="Jsroot" label="JSROOT" width="50%" display="flex" justifycontent='flex-end'>
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
          </CustomDiv>
          <hr />
          <CutomFormItem name="Reference" label="Reference">
            <Reference />
          </CutomFormItem>
        </Form>
      </Panel>
    </StyledCollapse>
  );
};
