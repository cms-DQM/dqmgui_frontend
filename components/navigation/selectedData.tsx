import * as React from 'react'
import { Row, Col } from 'antd'
import { LumesectionBroweser } from '../browsing/lumesectionBroweser'
import Form from 'antd/lib/form/Form'
import { StyledFormItem } from '../styledComponents'

interface SelectedDataProps {
  dataset_name: string | undefined;
  run_number: string | number | undefined;
}

export const SelectedData = ({ dataset_name, run_number }: SelectedDataProps) => {
  return (
    <Form>
      <hr/>
      <Row>
        <StyledFormItem name={dataset_name} label="Dataset name">
          <Col style={{fontWeight: 'bold', fontStyle: "italic"}}>{dataset_name}</Col>
        </StyledFormItem>
      </Row>
      <Row>
        <StyledFormItem name={dataset_name} label="Run number">
          <Col style={{fontWeight: 'bold', fontStyle: "italic"}} >{run_number}</Col>
        </StyledFormItem>
      </Row>
      <Row>
        <StyledFormItem name={dataset_name} label="Lumi">
          <Col><LumesectionBroweser /></Col>
        </StyledFormItem>
      </Row>
      <hr/>
    </Form>
  )
}