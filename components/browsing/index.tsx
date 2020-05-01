import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { WrapperDiv } from '../../containers/display/styledComponents';
import { DatasetsBrowser } from './datasetsBrowsing/datasetsBrowser';
import { OptionalDatasetsBrowser } from './datasetsBrowsing/optionalDatasetname';
import { QueryProps, OptionProps } from '../../containers/display/interfaces';
import { RunBrowser } from './runsBrowser';
import Form from 'antd/lib/form/Form';
import { dataSetSelections } from '../constants';
import { RadioButtonsGroup } from '../radioButtonsGroup';

interface BrowserProps { }

export const Browser = () => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const [datasetName, setDatasetName] = useState(query.dataset_name);
  const [run_number, setRunNumber] = useState(query.run_number);
  const [value, setValue] = useState();
  const [datasetOption, setDatasetOption] = useState(dataSetSelections[0].value)

  return (
    <Form>
      <WrapperDiv>
        <WrapperDiv>
          <RunBrowser
            value={value}
            run_number={run_number}
            setRunNumber={setRunNumber}
          />
        </WrapperDiv>
        <RadioButtonsGroup
          action={(value) => setDatasetOption(value)}
          options={dataSetSelections}
          getOptionLabel={(option: OptionProps) => option.label}
          getOptionValue={(option: OptionProps) => option.value}
        />
        {datasetOption === dataSetSelections[0].value ?
          <WrapperDiv>
            <DatasetsBrowser
              datasetName={datasetName}
              setDatasetName={setDatasetName}
              setValue={setValue}
            />
          </WrapperDiv>
          :
          <WrapperDiv>
            <OptionalDatasetsBrowser
              datasetName={datasetName}
              setDatasetName={setDatasetName}
              setValue={setValue}
            />
          </WrapperDiv>
        }
      </WrapperDiv>
    </Form>
  );
};
