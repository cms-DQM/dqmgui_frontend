import React, { useState } from 'react';
import Form from 'antd/lib/form/Form';

import { functions_config } from '../../config/config';
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
import { store } from '../../contexts/leftSideContext';
import {
  changeRouter,
  getChangedQueryParams,
} from '../../containers/display/utils';

export const Browser = () => {
  const [datasetOption, setDatasetOption] = useState(
    dataSetSelections[0].value
  );
  const router = useRouter();
  const query: QueryProps = router.query;

  const run_number = query.run_number ? query.run_number : '';
  const dataset_name = query.dataset_name ? query.dataset_name : '';
  const lumi = query.lumi ? parseInt(query.lumi) : NaN;

  const { setLumisection } = React.useContext(store);
  const [currentRunNumber, setCurrentRunNumber] = useState(run_number);
  const [currentDataset, setCurrentDataset] = useState<string>(dataset_name);

  const lumisectionsChangeHandler = (lumi: number) => {
    //in main navigation when lumisection is changed, new value have to be set to url
    changeRouter(getChangedQueryParams({ lumi: lumi }, query));
    //setLumisection from store(using useContext) set lumisection value globally.
    //This set value is reachable for lumisection browser in free search dialog (you can see it, when search button next to browsers is clicked).

    //Both lumisection browser have different handlers, they have to act differently according to their place:
    //IN THE MAIN NAV: lumisection browser value in the main navigation is changed, this HAVE to be set to url;
    //FREE SEARCH DIALOG: lumisection browser value in free search dialog is changed it HASN'T to be set to url immediately, just when button 'ok'
    //in dialog is clicked THEN value is set to url. So, useContext let us to change lumi value globally without changing url, when wee no need that.
    //And in this handler lumi value set to useContext store is used as initial lumi value in free search dialog.
    setLumisection(lumi);
  };

  useChangeRouter(
    {
      run_number: currentRunNumber,
      dataset_name: currentDataset,
    },
    [currentRunNumber, currentDataset],
    true
  );

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
          {functions_config.lumisections_on && (
            <LumesectionBrowser
              currentLumisection={lumi}
              currentRunNumber={currentRunNumber}
              currentDataset={currentDataset}
              handler={lumisectionsChangeHandler}
              color="white"
            />
          )}
        </WrapperDiv>
        <StyledFormItem
          labelcolor="white"
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
