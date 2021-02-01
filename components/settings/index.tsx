import * as React from 'react';
import { Col, Row } from 'antd';
import Form from 'antd/lib/form/Form';

import { ViewPosition } from './viewPosition';
import { StyledModal } from '../viewDetailsMenu/styledComponents';
import { StyledFormItem, CustomRow, StyledButton } from '../styledComponents';
import { store } from '../../contexts/leftSideContext';
import { PlotsProportion } from './plotsRatio';
import { theme } from '../../styles/theme';
import { info } from '../notifications/infoMessages';

interface SettingsModalProps {
  openSettings: boolean;
  toggleSettingsModal(value: boolean): void;
  isAnyPlotSelected: boolean;
}

export const SettingsModal = ({
  openSettings,
  toggleSettingsModal,
  isAnyPlotSelected,
}: SettingsModalProps) => {
  const {
    viewPlotsPosition,
    setViewPlotsPosition,
    proportion,
    setProportion,
  } = React.useContext(store);
  return (
    <StyledModal
      title="Settings"
      visible={openSettings}
      onCancel={() => toggleSettingsModal(false)}
      footer={null}
    >
      <Form>
        <StyledFormItem
          name="position"
          label="Plots View Position"
          labelweight="bold"
        >
          <CustomRow display="flex" justifycontent="space-between">
            <Col>
              <ViewPosition
                viewPlotsPosition={viewPlotsPosition}
                setViewPlotsPosition={setViewPlotsPosition}
                disabled={isAnyPlotSelected}
              />
            </Col>
            <Col>{info(isAnyPlotSelected)}</Col>
          </CustomRow>
        </StyledFormItem>
        <StyledFormItem
          name="proportions"
          label="Plots View Proportions"
          labelweight="bold"
        >
          <Row>
            <Col>
              <PlotsProportion
                proportion={proportion}
                setProportion={setProportion}
                disabled={isAnyPlotSelected}
              />
            </Col>
            <Col>{info(isAnyPlotSelected)}</Col>
          </Row>
        </StyledFormItem>
      </Form>
    </StyledModal>
  );
};
