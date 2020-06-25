import React, { useEffect } from 'react';
import { Col, Row } from 'antd';

import { PartsBrowser } from './partBrowser';
import { StyledSuccessIcon, StyledErrorIcon } from '../../styledComponents';
import { useAvailbleAndNotAvailableDatasetPartsOptions } from '../../../hooks/useAvailbleAndNotAvailableDatasetPartsOptions';
import { QueryProps } from '../../../containers/display/interfaces';
import { getChangedQueryParams, changeRouter } from '../../../containers/display/utils';

export interface DatasetPartsProps {
  part_0: any;
  part_1: any;
  part_2: any;
}

interface DatasetsBuilderProps {
  currentDataset: string;
  query: QueryProps;
  currentRunNumber: string;
}

export const DatasetsBuilder = ({ currentDataset, query, currentRunNumber }: DatasetsBuilderProps) => {
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
    currentRunNumber,
    currentDataset
  );

  useEffect(() => {
    if (doesCombinationOfSelectedDatasetPartsExists) {
      changeRouter(getChangedQueryParams({ dataset_name: fullDatasetName }, query));
    }
  }, [fullDatasetName])

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
