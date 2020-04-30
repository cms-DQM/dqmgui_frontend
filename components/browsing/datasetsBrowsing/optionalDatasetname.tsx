import React, { useState } from 'react';
import { Col, Select, Row } from 'antd';
import { useRouter } from 'next/router';
import _ from 'lodash';

import { StyledFormItem } from '../../styledComponents';
import { StyledSelect } from '../../viewDetailsMenu/styledComponents';
import { QueryProps } from '../../../containers/display/interfaces';
import { useSearch } from '../../../hooks/useSearch';
import Link from 'next/link';
import {
  Spinner,
  SpinnerWrapper,
} from '../../../containers/search/styledComponents';
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

  const [groupBy, setGroupBy] = useState('first')
  const [name, setName] = useState('Cosmics')
  const [datasetError, setDatasetError] = useState(false)

  const { results, results_grouped, searching, isLoading, error } = useSearch(
    query.run_number,
    ''
  );

  const selectedDatasetParts = getOneDatasetParts(datasetName)
  const datasets = results_grouped.map((result) => (result.dataset))
  const resultsNames: any = getDatasetParts(datasets, groupBy)

  const firstResultsNames: string[] = resultsNames[name] ? _.uniq(resultsNames[name].map((datasetame: any) => datasetame.first)) : []
  const allFirstNames = getRestOptions(firstResultsNames, datasets, 'first')

  const secondResultsNames: string[] = resultsNames[name] ? _.uniq(resultsNames[name].map((name: any) => name.second)) : []
  const allSecondNames = getRestOptions(secondResultsNames, datasets, 'second')

  const thirdResultsNames: string[] = resultsNames[name] ? _.uniq(resultsNames[name].map((name: any) => name.third)) : []
  const allThirdNames = getRestOptions(thirdResultsNames, datasets, 'third')

console.log(datasetError)
  return (
    <StyledFormItem label={'Oprional Dataset Name:'}>
      <Row>
        <Col>
          <PartsBrowser
            allParts={allFirstNames}
            part='first'
            resultsNames={firstResultsNames}
            setGroupBy={setGroupBy}
            setName={setName}
            name={selectedDatasetParts.first}
            setDatasetError={setDatasetError}
          />
        </Col>
        <Col>
          <PartsBrowser
            allParts={allSecondNames}
            part='second'
            resultsNames={secondResultsNames}
            setGroupBy={setGroupBy}
            setName={setName}
            name={selectedDatasetParts.second}
            setDatasetError={setDatasetError}
          />
        </Col>
        <Col>
          <PartsBrowser
            allParts={allThirdNames}
            part='third'
            resultsNames={thirdResultsNames}
            setGroupBy={setGroupBy}
            setName={setName}
            name={selectedDatasetParts.third}
            setDatasetError={setDatasetError}
          />
        </Col >
      </Row>
    </StyledFormItem>
  );
};
