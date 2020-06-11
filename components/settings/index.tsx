import * as React from 'react'
import { Col, Row } from 'antd'
import Form from 'antd/lib/form/Form'

import { ViewPosition } from './viewPosition'
import { SearchOptions } from './searchOptions'
import { StyledModal } from '../viewDetailsMenu/styledComponents'
import { StyledFormItem } from '../styledComponents'
import { store } from '../../contexts/leftSideContext'
import { PlotsProportion } from './plotsRatio'

interface SettingsModalProps {
  openSettings: boolean;
  toggleSettingsModal(value: boolean): void;
}

export const SettingsModal = ({ openSettings, toggleSettingsModal }: SettingsModalProps) => {
  const { viewPlotsPosition, setViewPlotsPosition,
    searchOption, setSearchOption,
    proportion, setProportion } = React.useContext(store)
  return (
    <StyledModal
      title="Settings"
      visible={openSettings}
      onCancel={() => toggleSettingsModal(false)}
    >
      <Form>
        <StyledFormItem
          name="position"
          label="Plots View Position"
          labelweight="bold"
        >
          <Row>
            <Col>
              <ViewPosition
                viewPlotsPosition={viewPlotsPosition}
                setViewPlotsPosition={setViewPlotsPosition}
              />
            </Col>
          </Row>
        </StyledFormItem>
        <StyledFormItem
          name="proportions"
          label="Plots View Propotions"
          labelweight="bold"
        >
          <Row>
            <Col>
              <PlotsProportion
                proportion={proportion}
                setProportion={setProportion}
              />
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