import * as React from 'react'
import { Col, Row, Tooltip, Button } from 'antd'
import Form from 'antd/lib/form/Form'
import { InfoCircleOutlined } from '@ant-design/icons';

import { ViewPosition } from './viewPosition'
import { SearchOptions } from './searchOptions'
import { StyledModal } from '../viewDetailsMenu/styledComponents'
import { StyledFormItem, CustomRow, StyledButton } from '../styledComponents'
import { store } from '../../contexts/leftSideContext'
import { PlotsProportion } from './plotsRatio'
import { theme } from '../../styles/theme';

interface SettingsModalProps {
  openSettings: boolean;
  toggleSettingsModal(value: boolean): void;
  isAnyPlotSelected: boolean;
}

const info = (disabled: boolean) => {
  if (disabled) {
    return (<Tooltip title="At least on plot must be selected">
      <InfoCircleOutlined />
    </Tooltip>)
  } return <></>
}

export const SettingsModal = ({ openSettings, toggleSettingsModal, isAnyPlotSelected }: SettingsModalProps) => {
  const { viewPlotsPosition, setViewPlotsPosition,
    searchOption, setSearchOption,
    proportion, setProportion } = React.useContext(store)
  return (
    <StyledModal
      title="Settings"
      visible={openSettings}
      onCancel={() => toggleSettingsModal(false)}
      footer={[
        <StyledButton
          color={theme.colors.secondary.main}
          background="white"
          key="Close"
          onClick={() => toggleSettingsModal(false)}
        >
          Close
      </StyledButton>
      ]}
    >
      <Form>
        <StyledFormItem
          name="position"
          label="Plots View Position"
          labelweight="bold"
        >
          <CustomRow
            display='flex'
            justifycontent='space-between'>
            <Col>
              <ViewPosition
                viewPlotsPosition={viewPlotsPosition}
                setViewPlotsPosition={setViewPlotsPosition}
                disabled={isAnyPlotSelected}
              />
            </Col>
            <Col>
              {info(isAnyPlotSelected)}
            </Col>
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
            <Col>
              {info(isAnyPlotSelected)}
            </Col>
          </Row>
        </StyledFormItem>
        <hr />
        <StyledFormItem
          name="search"
          label="Search Option"
          labelweight="bold"
        >
          <Row>
            <Col>
              <SearchOptions
                searchOption={searchOption}
                setSearchOption={setSearchOption}
              />
            </Col>
          </Row>
        </StyledFormItem>
      </Form>
    </StyledModal>
  )
}