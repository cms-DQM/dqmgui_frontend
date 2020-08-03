import * as React from 'react';
import { Col, Select, Spin, Button, Row } from 'antd';
import { CaretRightFilled, CaretLeftFilled } from '@ant-design/icons';

import { useRequest } from '../../hooks/useRequest';
import { getLumisections, functions_config } from '../../config/config';
import {
  StyledSelect,
  OptionParagraph,
} from '../viewDetailsMenu/styledComponents';
import { StyledFormItem } from '../styledComponents';
import { OptionProps, QueryProps } from '../../containers/display/interfaces';

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
  //0 - it represents ALL lumisections. If none lumisection is selected, then plots which are displaid
  //consist of ALL lumisections.
  const [lumisections, setLumisections] = React.useState([
    { label: 'All', value: 0 },
  ]);

  const current_time = new Date().getTime();
  const [not_older_than, set_not_older_than] = React.useState(current_time);

  //getting all run lumisections
  const { data, isLoading, errors } = useRequest(
    getLumisections({
      run_number: currentRunNumber,
      dataset_name: currentDataset,
      lumi: -1,
      notOlderThan: not_older_than,
    }),
    {},
    [currentRunNumber, currentDataset, not_older_than]
  );
  const all_runs_with_lumi = data ? data.data : [];

  React.useEffect(() => {
    //extracting just lumisections from data object
    const lumisections_from_api: OptionProps[] =
      all_runs_with_lumi.length > 0
        ? all_runs_with_lumi.map((run: AllRunsWithLumiProps) => {
            return { label: run.lumi.toString(), value: run.lumi };
          })
        : [];
    const copy = [...lumisections];
    const allLumis = copy.concat(lumisections_from_api);
    setLumisections(allLumis);
  }, [all_runs_with_lumi]);

  const lumiValues = lumisections.map((lumi: OptionProps) => lumi.value);

  //0 lumisection is not exists, it added as representation of ALL lumisections. If none of lumesctions is selected
  //it means that should be displaid plots which constist of ALL lumiections.
  //The same situation when run doesn't have lumis at all. It means that it displays plots of ALL Lumis
  const currentLumiIndex =
    lumiValues.indexOf(currentLumisection) === -1
      ? 0
      : lumiValues.indexOf(currentLumisection);
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
              value={lumiValues[currentLumiIndex]}
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
