import * as React from 'react';
import { Row, Col } from 'antd';

import { functions_config } from '../../config/config';
import { LumesectionBrowser } from '../browsing/lumisectionBroweser';
import Form from 'antd/lib/form/Form';
import { StyledFormItem, SelectedDataCol } from '../styledComponents';
import { store } from '../../contexts/leftSideContext';
import {
  changeRouter,
  getChangedQueryParams,
} from '../../containers/display/utils';
import { useRouter } from 'next/router';
import { QueryProps } from '../../containers/display/interfaces';
import { RadioButtonsGroup } from '../radioButtonsGroup';
import { OptionProps } from 'antd/lib/mentions';

interface SelectedDataProps {
  dataset_name: string;
  run_number: string;
  form: any;
  toggleRunInNewTab(open: boolean): void;
  openRunInNewTab: boolean;
}

const open_in_a_new_tab_options = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  },
];

export const SelectedData = ({
  //router ok
  dataset_name,
  run_number,
  form,
  toggleRunInNewTab,
  openRunInNewTab,
}: SelectedDataProps) => {
  const { lumisection, setLumisection } = React.useContext(store);
  const router = useRouter();
  const query: QueryProps = router.query;

  const lumisectionsChangeHandler = (lumi: number) => {
    //we set lumisection in inseContext store in order to save a it's value.
    //When form is submitted(onFinish...)(clicked button "OK" in dialog), then
    //url is changed
    setLumisection(lumi);
  };

  return (
    <Form
      form={form}
      onFinish={(params) => {
        //when OK is clicked, run number, dataset and lumi params in url is changed.
        changeRouter(getChangedQueryParams(params, query));
      }}
      fields={[
        { name: 'dataset_name', value: dataset_name },
        { name: 'run_number', value: run_number },
        { name: 'lumi', value: lumisection },
      ]}
    >
      <hr />
      <Row>
        <StyledFormItem name={'dataset_name'} label="Dataset name">
          <SelectedDataCol>{dataset_name}</SelectedDataCol>
        </StyledFormItem>
      </Row>
      <Row>
        <StyledFormItem name={'run_number'} label="Run number">
          <SelectedDataCol>{run_number}</SelectedDataCol>
        </StyledFormItem>
      </Row>
      {functions_config.mode === 'OFFLINE' && functions_config.new_back_end && (
        <Row>
          <Col>
            <LumesectionBrowser
              color="black"
              handler={lumisectionsChangeHandler}
              currentLumisection={lumisection}
              currentDataset={dataset_name}
              currentRunNumber={run_number}
            />
          </Col>
        </Row>
      )}
      <hr />
      <Row>
        <StyledFormItem name={'open_in_a_new_a_tab'} label="Open in a new tab?">
          <RadioButtonsGroup
            options={open_in_a_new_tab_options}
            getOptionLabel={(option: OptionProps) => option.label}
            getOptionValue={(option: OptionProps) => option.value}
            current_value={openRunInNewTab}
            action={(value: boolean) => {
              toggleRunInNewTab(value);
            }}
          />
        </StyledFormItem>
      </Row>
      <hr />
    </Form>
  );
};
