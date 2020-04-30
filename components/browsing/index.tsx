import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { WrapperDiv } from '../../containers/display/styledComponents';
import { DatasetsBrowser } from './datasetsBrowsing/datasetsBrowser';
import { OptionalDatasetsBrowser } from './datasetsBrowsing/optionalDatasetname';
import { QueryProps } from '../../containers/display/interfaces';
import { RunBrowser } from './runsBrowser';
import Form from 'antd/lib/form/Form';

interface BrowserProps { }

export const Browser = () => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const [datasetName, setDatasetName] = useState(query.dataset_name);
  const [run_number, setRunNumber] = useState(query.run_number);
  const [value, setValue] = useState();

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
        <WrapperDiv>
          <DatasetsBrowser
            datasetName={datasetName}
            setDatasetName={setDatasetName}
            setValue={setValue}
          />
        </WrapperDiv>
        <WrapperDiv>
          <OptionalDatasetsBrowser
            datasetName={datasetName}
            setDatasetName={setDatasetName}
            setValue={setValue}
          />
        </WrapperDiv>
      </WrapperDiv>
    </Form>
  );
};
