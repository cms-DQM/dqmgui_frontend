import * as React from 'react'
import { Col, Select, Spin, Button, Row } from 'antd';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';

import { useRequest } from '../../hooks/useRequest'
import { getLumisections } from '../../config/config';
import { StyledSelect, OptionParagraph } from '../viewDetailsMenu/styledComponents';
import { StyledFormItem } from '../styledComponents';
import { useChangeRouter } from '../../hooks/useChangeRouter';
import { QueryProps } from '../../containers/display/interfaces';
import { store } from '../../contexts/leftSideContext';

const { Option } = Select;

interface AllRunsWithLumiProps {
  run: string;
  lumi: number;
  dataset: string;
}
interface LumesectionBrowserProps {
  currentLumisection: number | string;
  setCurrentLumisection(currentLumisection: number | string): void;
  currentRunNumber: string;
  currentDataset: string;
  color?: string;
  query: QueryProps;
}
export const LumesectionBrowser = ({ query, color, currentLumisection, setCurrentLumisection, currentRunNumber, currentDataset }: LumesectionBrowserProps) => {
  const { lumisection } = React.useContext(store)

  const { data, isLoading, errors } = useRequest(getLumisections({
    run_number: currentRunNumber,
    dataset_name: currentDataset, lumi: -1
  }), {}, [currentRunNumber, currentDataset])

  const all_runs_with_lumi = data ? data.data : []
  const lumisections: number[] = all_runs_with_lumi.length > 0 ? all_runs_with_lumi.map((run: AllRunsWithLumiProps) => {
    return run.lumi
  }) : []

  lumisections.unshift(-1)
  useChangeRouter({ lumi: lumisections[0] }, [], true)

  const lumi = query.lumi ? parseInt(query.lumi) : lumisection
  const currentLumiIndex = lumisections.indexOf(lumi);

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
              dropdownMatchSelectWidth={false}
              value={currentLumisection}
              onChange={(e: any) => {
                setCurrentLumisection(parseInt(e));
              }}
              showSearch={true}
            >
              {lumisections && lumisections.map((current_lumisection: number) => {
                return (
                  <Option value={current_lumisection.toString()} key={current_lumisection.toString()} >
                    {isLoading ? (
                      <OptionParagraph>
                        <Spin />
                      </OptionParagraph>
                    ) : (
                        <p>{current_lumisection}</p>
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