import React, { useState, useEffect } from 'react';
import Form from 'antd/lib/form/Form';

import { WrapperDiv } from '../../containers/display/styledComponents';
import { DatasetsBrowser } from './datasetsBrowsing/datasetsBrowser';
import { DatasetsBuilder } from './datasetsBrowsing/datasetNameBuilder';
import { RunBrowser } from './runsBrowser';
import { LumesectionBrowser } from './lumesectionBroweser';
import { dataSetSelections } from '../constants';
import { StyledFormItem } from '../styledComponents';
import { DropdownMenu } from '../menu';
import { useRouter } from 'next/router';
import { QueryProps } from '../../containers/display/interfaces';
import { useChangeRouter } from '../../hooks/useChangeRouter';


export const Browser = () => {
  const [datasetOption, setDatasetOption] = useState(
    dataSetSelections[0].value
  );
  const router = useRouter();
  const query: QueryProps = router.query;
  const run_number = query.run_number ? query.run_number : '';
  const dataset_name = query.dataset_name ? query.dataset_name : '';
  const lumi = query.lumi ? parseInt(query.lumi) : -1;

  const [currentRunNumber, setCurrentRunNumber] = useState(run_number);
  const [currentDataset, setCurrentDataset] = useState<string>(dataset_name);
  const [currentLumisection, setCurrentLumisection] = useState<string | number>(lumi);

  useChangeRouter({
    lumi: currentLumisection,
    run_number: currentRunNumber, dataset_name: currentDataset
  }, [currentLumisection, currentRunNumber, currentDataset], true)

  return (
    <Form>
      <WrapperDiv>
        <WrapperDiv>
          <RunBrowser
            query={query}
            currentRunNumber={currentRunNumber}
            setCurrentRunNumber={setCurrentRunNumber}
            currentDataset={currentDataset}
          />
        </WrapperDiv>
        <WrapperDiv>
          <LumesectionBrowser
            currentLumisection={currentLumisection}
            setCurrentLumisection={setCurrentLumisection}
            currentRunNumber={currentRunNumber}
            currentDataset={currentDataset}
            query={query}
            color='white'
          />
        </WrapperDiv>
        <StyledFormItem
          label={
            <DropdownMenu
              options={dataSetSelections}
              action={setDatasetOption}
              defaultValue={dataSetSelections[0]}
            />
          }
        >
          {datasetOption === dataSetSelections[0].value ? (
            <WrapperDiv>
              <DatasetsBrowser
                currentRunNumber={currentRunNumber}
                currentDataset={currentDataset}
                setCurrentDataset={setCurrentDataset}
                query={query}
              />
            </WrapperDiv>
          ) : (
              <WrapperDiv>
                <DatasetsBuilder
                  currentRunNumber={currentRunNumber}
                  currentDataset={currentDataset}
                  query={query}
                />
              </WrapperDiv>
            )}
        </StyledFormItem>
      </WrapperDiv>
    </Form>
  );
};
