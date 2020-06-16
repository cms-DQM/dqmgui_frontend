import * as React from 'react'
import { Col, Select, Spin, Button, Row } from 'antd';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';

import { useRequest } from '../../hooks/useRequest'
import { getLumisections } from '../../config/config';
import { StyledSelect, OptionParagraph } from '../viewDetailsMenu/styledComponents';
import { StyledFormItem } from '../styledComponents';
import { useChangeRouter } from '../../hooks/useChangeRouter';

const { Option } = Select;

interface AllRunsWithLumiProps {
  run: number;
  lumi: number;
  dataset: string;
}
interface LumesectionBrowserProps {
  currentLumisection: number | string;
  setCurrentLumisection(currentLumisection: number | string): void;
  currentRunNumber: number;
  currentDataset: string;
  color?: string;
}
export const LumesectionBrowser = ({ color, currentLumisection, setCurrentLumisection, currentRunNumber, currentDataset }: LumesectionBrowserProps) => {
  const { data, isLoading, errors } = useRequest(getLumisections({
    run_number: currentRunNumber,
    dataset_name: currentDataset, lumi: -1
  }))

  const all_runs_with_lumi = data ? data.data : []
  const lumisections: (number | string)[] = all_runs_with_lumi.length > 0 ? all_runs_with_lumi.map((run: AllRunsWithLumiProps) => {
    return run.lumi
  }) : []

  lumisections.unshift('All')
  const currentLumiIndex = lumisections.indexOf(currentLumisection);

  useChangeRouter({ lumi: currentLumisection }, [currentLumisection], true)

  return (
    <Col>
      <StyledFormItem labelcolor={color} name={'lumi'} label="Lumi">
        <Row justify="center" align="middle">
          <Col>
            <Button
              disabled={!lumisections[currentLumiIndex - 1]}
              icon={<CaretLeftFilled />}
              type="link"
              onClick={() => {
                setCurrentLumisection(lumisections[currentLumiIndex - 1]);
              }}
            />
          </Col>

          <Col>
            <StyledSelect
              value={currentLumisection}
              onChange={(e: any) => {
                setCurrentLumisection(e);
              }}
              showSearch={true}
            >
              {lumisections && lumisections.map((currentLumisection: number | string) => {
                return (
                  <Option value={currentLumisection} key={currentLumisection.toString()} >
                    {isLoading ? (
                      <OptionParagraph>
                        <Spin />
                      </OptionParagraph>
                    ) : (
                        <div>{currentLumisection}</div>
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
                setCurrentLumisection(lumisections[currentLumiIndex + 1]);
              }}
            />
          </Col>
        </Row>
      </StyledFormItem>
    </Col>
  )
}