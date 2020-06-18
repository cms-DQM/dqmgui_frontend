import * as React from 'react'
import { Col, Select, Spin, Button, Row } from 'antd';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';

import { useRequest } from '../../hooks/useRequest'
import { getLumisections } from '../../config/config';
import { StyledSelect, OptionParagraph } from '../viewDetailsMenu/styledComponents';
import { StyledFormItem } from '../styledComponents';
import { useChangeRouter } from '../../hooks/useChangeRouter';
import { QueryProps } from '../../containers/display/interfaces';
import { useRouter } from 'next/router';

const { Option } = Select;

interface AllRunsWithLumiProps {
  run: string;
  lumi: number;
  dataset: string;
}
interface LumesectionBrowserProps {
  currentLumisection: number;
  currentRunNumber: string;
  currentDataset: string;
  handler(lumi: number): void;
  color?: string;
}

export const LumesectionBrowser = ({ color, currentLumisection, handler, currentRunNumber, currentDataset }: LumesectionBrowserProps) => {
  //getting all run lumisections 
  const { data, isLoading, errors } = useRequest(getLumisections({
    run_number: currentRunNumber,
    dataset_name: currentDataset, lumi: -1
  }), {}, [currentRunNumber, currentDataset])

  const router = useRouter();
  const query: QueryProps = router.query;

  const all_runs_with_lumi = data ? data.data : []
  //extracting just lumisections from data object
  const lumisections: number[] = all_runs_with_lumi.length > 0 ? all_runs_with_lumi.map((run: AllRunsWithLumiProps) => {
    return run.lumi
  }) : []

  //-1 - it represents ALL lumisections. If none lumisection is selected, then plots which are displaid 
  //consist of ALL lumisections. 
  //*TO DO** change -1 to ALL
  lumisections.unshift(-1)

  //if lumisection is not setted to url, we set lumisection to -1
  useChangeRouter({ lumi: lumisections[0] }, [], !query.lumi)
  const currentLumiIndex = lumisections.indexOf(currentLumisection);

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
                handler(lumisections[currentLumiIndex - 1]);
              }}
            />
          </Col>

          <Col>
            <StyledSelect
              dropdownMatchSelectWidth={false}
              value={currentLumisection}
              onChange={(e: any) => {
                handler(parseInt(e));
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
                handler(lumisections[currentLumiIndex + 1]);
              }}
            />
          </Col>
        </Row>
      </StyledFormItem>
    </Col>
  )
}