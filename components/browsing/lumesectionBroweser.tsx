import * as React from 'react';
import { Col, Select, Spin, Button, Row } from 'antd';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';

import { useRequest } from '../../hooks/useRequest';
import { getLumisections } from '../../config/config';
import {
  StyledSelect,
  OptionParagraph,
} from '../viewDetailsMenu/styledComponents';
import { StyledFormItem } from '../styledComponents';
import { OptionProps } from '../../containers/display/interfaces';

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

export const LumesectionBrowser = ({
  color,
  currentLumisection,
  handler,
  currentRunNumber,
  currentDataset,
}: LumesectionBrowserProps) => {
  //getting all run lumisections
  const { data, isLoading, errors } = useRequest(
    getLumisections({
      run_number: currentRunNumber,
      dataset_name: currentDataset,
      lumi: 0,
    }),
    {},
    [currentRunNumber, currentDataset]
  );

  const all_runs_with_lumi = data ? data.data : [];
  //extracting just lumisections from data object
  const lumisections: OptionProps[] =
    all_runs_with_lumi.length > 0
      ? all_runs_with_lumi.map((run: AllRunsWithLumiProps) => {
          return { label: run.lumi.toString(), value: run.lumi };
        })
      : [];

  //0 - it represents ALL lumisections. If none lumisection is selected, then plots which are displaid
  //consist of ALL lumisections.
  lumisections.unshift({ label: 'All', value: 0 });

  const lumiValues = lumisections.map((lumi: OptionProps) => lumi.value);
  const currentLumiIndex = lumiValues.indexOf(currentLumisection);

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
                handler(lumiValues[currentLumiIndex - 1]);
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
              {lumisections &&
                lumisections.map((current_lumisection: OptionProps) => {
                  return (
                    <Option
                      value={current_lumisection.value}
                      key={current_lumisection.value.toString()}
                    >
                      {isLoading ? (
                        <OptionParagraph>
                          <Spin />
                        </OptionParagraph>
                      ) : (
                        <p>{current_lumisection.label}</p>
                      )}
                    </Option>
                  );
                })}
            </StyledSelect>
          </Col>
          <Col>
            <Button
              icon={<CaretRightFilled />}
              disabled={!lumisections[currentLumiIndex + 1]}
              type="link"
              onClick={() => {
                handler(lumiValues[currentLumiIndex + 1]);
              }}
            />
          </Col>
        </Row>
      </StyledFormItem>
    </Col>
  );
};
