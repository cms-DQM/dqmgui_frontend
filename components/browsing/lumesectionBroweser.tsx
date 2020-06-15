import * as React from 'react'
import { useRouter } from 'next/router';
import { Col, Select, Spin, Button, Row } from 'antd';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';

import { useRequest } from '../../hooks/useRequest'
import { QueryProps } from '../../containers/display/interfaces';
import { getLumisections } from '../../config/config';
import { StyledSelect, OptionParagraph } from '../viewDetailsMenu/styledComponents';
import { StyledFormItem } from '../styledComponents';
import { store } from '../../contexts/leftSideContext';
import { useChangeRouter } from '../../hooks/useChangeRouter';

const { Option } = Select;

interface AllRunsWithLumiProps {
  run: number;
  lumi: number;
  dataset: string;
}

export const LumesectionBroweser = () => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const run = query.run_number ? query.run_number : NaN
  const datasetName = query.dataset_name ? query.dataset_name : ''

  const { data, isLoading, errors } = useRequest(getLumisections({ run_number: run, dataset_name: datasetName, lumi: -1 }))
  const all_runs_with_lumi = data ? data.data : []
  const lumisections: (number | string)[] = all_runs_with_lumi.length > 0 ? all_runs_with_lumi.map((run: AllRunsWithLumiProps) => {
    return run.lumi
  }) : []

  lumisections.unshift('All')
  const { lumisection, setLumisection } = React.useContext(store)
  const currentLumiIndex = lumisections.indexOf(lumisection);

  useChangeRouter({lumi: lumisection}, [lumisection], true)

  return (
    <Col>
      <StyledFormItem labelcolor="white" name={lumisection} label="Lumi:">
        <Row justify="center" align="middle">
          <Col>
            <Button
              disabled={!lumisections[currentLumiIndex - 1]}
              icon={<CaretLeftFilled />}
              type="link"
              onClick={() => {
                setLumisection(lumisections[currentLumiIndex - 1]);
              }}
            />
          </Col>

          <Col>
            <StyledSelect
              value={lumisection}
              onChange={(e: any) => {
                setLumisection(e);
              }}
              showSearch={true}
            >
              {lumisections && lumisections.map((lumisection: number | string) => {
                console.log(lumisection)
                return (
                  <Option value={lumisection} key={lumisection.toString()} >
                    {isLoading ? (
                      <OptionParagraph>
                        <Spin />
                      </OptionParagraph>
                    ) : (
                        <div>{lumisection}</div>
                      )}
                  </Option>
                )
              })
              }
            </StyledSelect>
          </Col>
          <Col>
            <Button
              icon={<CaretRightFilled />}
              disabled={!lumisections[currentLumiIndex + 1]}
              type="link"
              onClick={() => {
                setLumisection(lumisections[currentLumiIndex + 1]);
              }}
            />
          </Col>
        </Row>
      </StyledFormItem>
    </Col>
  )
}