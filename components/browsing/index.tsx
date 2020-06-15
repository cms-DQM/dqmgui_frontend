import React, { useState } from 'react';
import Form from 'antd/lib/form/Form';

import { WrapperDiv } from '../../containers/display/styledComponents';
import { DatasetsBrowser } from './datasetsBrowsing/datasetsBrowser';
import { DatasetsBuilder } from './datasetsBrowsing/datasetNameBuilder';
import { RunBrowser } from './runsBrowser';
import { LumesectionBroweser } from './lumesectionBroweser';
import { dataSetSelections } from '../constants';
import { StyledFormItem } from '../styledComponents';
import { DropdownMenu } from '../menu';

export const Browser = () => {
  const [datasetOption, setDatasetOption] = useState(
    dataSetSelections[0].value
  );

  return (
    <Form>
      <WrapperDiv>
        <WrapperDiv>
          <RunBrowser />
        </WrapperDiv>
        <WrapperDiv>
          <LumesectionBroweser />
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
              <DatasetsBrowser />
            </WrapperDiv>
          ) : (
              <WrapperDiv>
                <DatasetsBuilder />
              </WrapperDiv>
            )}
        </StyledFormItem>
      </WrapperDiv>
    </Form>
  );
};
