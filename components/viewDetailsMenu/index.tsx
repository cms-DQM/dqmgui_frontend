import React, { useEffect, useContext } from 'react';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import { Collapse } from 'antd';

import { Reference } from './reference/reference';
import { SizeChanger } from '../sizeChanger';
import { QueryProps } from '../../containers/display/interfaces';
import { formTriples } from './utils';
import { StyledCollapse } from './styledComponents';
import { CutomFormItem } from '../styledComponents';
import { store } from '../../contexts/leftSideContext';

const { Panel } = Collapse;

interface ViewDetailsMenuProps {
  selected_plots: boolean;
}

export const ViewDetailsMenu = ({ selected_plots }: ViewDetailsMenuProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const globalState = useContext(store);
  const {
    size,
    setSize,
    normalize,
    setNormalize,
    overlayPlots,
    setOverlay,
    overlayPosition,
    setOverlaiPosition,
  } = globalState;

  useEffect(() => {
    if (query) {
      if (query.overlay_data) {
        const formatObjects = formTriples(query.overlay_data);
        setOverlay(formatObjects);
      }
    }

    return () => {
      setOverlay([]);
    };
  }, []);

  return (
    <StyledCollapse>
      <Panel header="Options" key="1">
        <Form>
          <CutomFormItem name="SizeChanger" label="Size">
            <SizeChanger currentValue={size} setSize={setSize} />
          </CutomFormItem>
          <hr />
          <CutomFormItem name="Reference" label="Reference">
            <Reference/>
          </CutomFormItem>
        </Form>
      </Panel>
    </StyledCollapse>
  );
};
