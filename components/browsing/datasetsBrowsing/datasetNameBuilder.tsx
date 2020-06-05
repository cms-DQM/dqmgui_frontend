import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router';

import { QueryProps } from '../../../containers/display/interfaces';
import { PartsBrowser } from './partBrowser';
import { StyledSuccessIcon, StyledErrorIcon } from '../../styledComponents';
import { useAvailbleAndNotAvailableDatasetPartsOptions } from '../../../hooks/useAvailbleAndNotAvailableDatasetPartsOptions';
import { useChangeRouter } from '../../../hooks/useChangeRouter';

export interface DatasetPartsProps {
  part_0: any;
  part_1: any;
  part_2: any;
}

export const DatasetsBuilder = () => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const run_number = query.run_number ? query.run_number : NaN;
  const currentDatasetName = query.dataset_name ? query.dataset_name : '';

  const {
    availableAndNotAvailableDatasetParts,
    setSelectedParts,
    selectedParts,
    setLastSelectedDatasetPartValue,
    lastSelectedDatasetPartValue,
    setLastSelectedDatasetPartPosition,
    doesCombinationOfSelectedDatasetPartsExists,
    fullDatasetName,
  } = useAvailbleAndNotAvailableDatasetPartsOptions(
    run_number,
    currentDatasetName
  );

  useChangeRouter(
    { dataset_name: fullDatasetName },
    [fullDatasetName],
    doesCombinationOfSelectedDatasetPartsExists)

  return (
    <Row>
      {availableAndNotAvailableDatasetParts.map((part: any) => {
        const partName = Object.keys(part)[0];
        return (
          <Col>
            <PartsBrowser
              restParts={part[partName].notAvailableChoices}
              part={partName}
              resultsNames={part[partName].availableChoices}
              setGroupBy={setLastSelectedDatasetPartPosition}
              setName={setLastSelectedDatasetPartValue}
              selectedName={lastSelectedDatasetPartValue}
              //@ts-ignore
              name={selectedParts[partName]}
              setSelectedParts={setSelectedParts}
              selectedParts={selectedParts}
            />
          </Col>
        );
      })}
      <Col>
        {doesCombinationOfSelectedDatasetPartsExists ? (
          <StyledSuccessIcon />
        ) : (
            <StyledErrorIcon />
          )}
      </Col>
    </Row>
  );
};
