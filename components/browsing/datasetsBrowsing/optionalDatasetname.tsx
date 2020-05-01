import React, { useState } from 'react';
import { Col, Select, Row } from 'antd';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

import { StyledFormItem } from '../../styledComponents';
import { QueryProps } from '../../../containers/display/interfaces';
import { useSearch } from '../../../hooks/useSearch';
import { getDatasetParts } from '../../viewDetailsMenu/utils';
import { PartsBrowser } from './firstPart';
import { getRestOptions, getOneDatasetParts } from '../utils';

const { Option } = Select;

interface DatasetsBrowserProps {
  setValue(value: any): void;
  datasetName: string | undefined;
  setDatasetName(name: string): void;
}

export const OptionalDatasetsBrowser = ({
  setValue,
  datasetName,
  setDatasetName,
}: DatasetsBrowserProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const selectedDatasetParts = getOneDatasetParts(datasetName)

  // groupBy- save the last selected dataset part (first, second or third). Group by is used for do
  // a grouping by last selected part of dataset. By default it set 'first'
  //setGroupBy set a groupBy variable value.
  const [groupBy, setGroupBy] = useState('first')
  const [name, setName] = useState(selectedDatasetParts.first)

  const [selectedParts, setSelectedParts] = useState({
    first: selectedDatasetParts.first,
    second: selectedDatasetParts.second,
    third: selectedDatasetParts.third
  })

  const { results, results_grouped, searching, isLoading, error } = useSearch(
    query.run_number,
    ''
  );

  const datasets = results_grouped.map((result) => (result.dataset))
  //grouping by last selected part of dataset
  const resultsNames: any = getDatasetParts(datasets, groupBy)

  //finding first part of dataset name, which exists by last selected part.
  // Uniq because more than one item from resultsNames[name] array could have the same 'first' attribute value
  const firstResultsNames: string[] = resultsNames[name] ? _.uniq(resultsNames[name].map((datasetname: any) => datasetname.first)) : []
  //all existing first parts of dataset (from all available choices)
  const restFirstNames = getRestOptions(firstResultsNames, datasets, 'first')

  const secondResultsNames: string[] = resultsNames[name] ? _.uniq(resultsNames[name].map((name: any) => name.second)) : []
  const restSecondNames = getRestOptions(secondResultsNames, datasets, 'second')

  const thirdResultsNames: string[] = resultsNames[name] ? _.uniq(resultsNames[name].map((name: any) => name.third)) : []
  const restThirdNames = getRestOptions(thirdResultsNames, datasets, 'third')
  // we put the first item in array as empty string, because by default dataset name starts with slash
  const fullDatasetName = ['', selectedParts.first, selectedParts.second, selectedParts.third].join('/')
  const isThatDatasetExist = datasets.includes(fullDatasetName)

  return (
    <StyledFormItem label={'Dataset Name Builder:'}>
      <Row>
        <Col>
          <PartsBrowser
            restParts={restFirstNames}
            part='first'
            resultsNames={firstResultsNames}
            setGroupBy={setGroupBy}
            setName={setName}
            name={selectedDatasetParts.first}
            setSelectedParts={setSelectedParts}
            selectedParts={selectedParts}
          />
        </Col>
        <Col>
          <PartsBrowser
            restParts={restSecondNames}
            part='second'
            resultsNames={secondResultsNames}
            setGroupBy={setGroupBy}
            setName={setName}
            name={selectedDatasetParts.second}
            setSelectedParts={setSelectedParts}
            selectedParts={selectedParts}
          />
        </Col>
        <Col>
          <PartsBrowser
            restParts={restThirdNames}
            part='third'
            resultsNames={thirdResultsNames}
            setGroupBy={setGroupBy}
            setName={setName}
            name={selectedDatasetParts.third}
            setSelectedParts={setSelectedParts}
            selectedParts={selectedParts}
          />
        </Col >
        <Col>
          {
            isThatDatasetExist ?
              <CheckCircleFilled style={{ fontSize: 25, paddingLeft: 8, color: 'green' }} /> :
              <CloseCircleFilled style={{ fontSize: 25, paddingLeft: 8, color: 'red' }} />}
        </Col>
      </Row>
    </StyledFormItem>
  );
};
