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
import { store as rightSideStore } from '../../contexts/rightSideContext';
import { store as leftSideStore } from '../../contexts/leftSideContext';
import { useChangeRouter } from '../../hooks/useChangeRouter';


const { Panel } = Collapse;

interface ViewDetailsMenuProps {
  selected_plots: boolean;
  plotsAreaWidth: number;
}

export const ViewDetailsMenu = ({ selected_plots, plotsAreaWidth }: ViewDetailsMenuProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const rightSideState = useContext(rightSideStore);
  const leftSideState = useContext(leftSideStore);

  const { size,
    setSize,
    setTriples,
    normalize,
    setNormalize,
    stats,
    setStats,
    error,
    setError,
    overlayPosition,
    setOverlaiPosition,
    triples } = leftSideState;
  const { setJSROOTmode, JSROOTmode, rightSideSize, setRightSideSize, } = rightSideState

  useEffect(() => {
    if (query) {
      if (query.overlay_data) {
        const formatObjects = formTriples(query.overlay_data);
        setTriples(formatObjects);
      }
    }
    return () => {
      setTriples([]);
      setJSROOTmode(false);
    };
  }, []);

  useChangeRouter(
    {
      overlay: overlayPosition,
      error: error,
      stats: stats,
      normalize: normalize
    },
    [normalize, stats, error, overlayPosition], true);

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
              <SizeChanger
                plotsAreaWidth={plotsAreaWidth}
                currentValue={size}
                setSize={setSize} />
            </CutomFormItem>
            <CutomFormItem
              name="SizeChanger"
              label="Right side size"
              width="50%"
            >
              <SizeChanger
                plotsAreaWidth={plotsAreaWidth}
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
            <Reference
              normalize={normalize}
              setNormalize={setNormalize}
              stats={stats}
              setStats={setStats}
              error={error}
              setError={setError}
              overlayPosition={overlayPosition}
              setOverlaiPosition={setOverlaiPosition}
              triples={triples}
            />
          </CutomFormItem>
        </Form>
      </Panel>
    </StyledCollapse>
  );
};
