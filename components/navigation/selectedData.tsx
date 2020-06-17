import * as React from 'react'
import { Row, Col } from 'antd'
import { LumesectionBrowser } from '../browsing/lumesectionBroweser'
import Form from 'antd/lib/form/Form'
import { StyledFormItem } from '../styledComponents'
import { store } from '../../contexts/leftSideContext'
import { changeRouter, getChangedQueryParams } from '../../containers/display/utils'
import { useRouter } from 'next/router'
import { QueryProps } from '../../containers/display/interfaces'

interface SelectedDataProps {
  dataset_name: string;
  run_number: number | string;
  form: any;
}

export const SelectedData = ({ dataset_name, run_number, form }: SelectedDataProps) => {
  const { lumisection, setLumisection } = React.useContext(store)
  const router = useRouter();
  const query: QueryProps = router.query;
  return (
    <Form
      form={form}
      onFinish={(params) => {
        console.log(params)
        changeRouter(getChangedQueryParams(params, query))
      }}
      fields={[{ name: 'dataset_name', value: dataset_name },
      { name: 'run_number', value: run_number },
      { name: 'lumi', value: lumisection }]}
    >
      <hr />
      <Row>
        <StyledFormItem name={'dataset_name'} label="Dataset name">
          <Col style={{ fontWeight: 'bold', fontStyle: "italic" }}>{dataset_name}</Col>
        </StyledFormItem>
      </Row>
      <Row>
        <StyledFormItem name={'run_number'} label="Run number">
          <Col style={{ fontWeight: 'bold', fontStyle: "italic" }} >{run_number}</Col>
        </StyledFormItem>
      </Row>
      {/* <Row>
        <Col>
          <LumesectionBrowser
            color="black"
            query={query}
            setCurrentLumisection={setLumisection}
            currentLumisection={lumisection}
            currentDataset={dataset_name}
            currentRunNumber={run_number}
          /></Col>
      </Row> */}
      <hr />
    </Form>
  )
}