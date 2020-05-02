import React, { useState, useEffect } from 'react';
import { Col, Select, Row } from 'antd';
import { useRouter } from 'next/router';
import _ from 'lodash';
import Router from 'next/router';

import { QueryProps } from '../../../containers/display/interfaces';
import { useSearch } from '../../../hooks/useSearch';
import { PartsBrowser } from './partBrowser';
import {
  getOneDatasetParts,
} from '../utils';
import { StyledSuccessIcon, StyledErrorIcon } from '../../styledComponents';
import { useDatasetPart } from '../../../hooks/useDatasetParts';

export interface DatasetPartsProps {
  first: string;
  second: string;
  third: string;
}

export const DatasetsBuilder = () => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const selectedDatasetParts = getOneDatasetParts(query.dataset_name);

  // groupBy- save the last selected dataset part (first, second or third). Group by is used for do
  // a grouping by last selected part of dataset. By default it set 'first'
  //setGroupBy set a groupBy variable value.
  const [groupBy, setGroupBy] = useState('first');
  const [name, setName] = useState(selectedDatasetParts.first);

  const [selectedParts, setSelectedParts] = useState<DatasetPartsProps>({
    first: selectedDatasetParts.first,
    second: selectedDatasetParts.second,
    third: selectedDatasetParts.third,
  });

  const { results, results_grouped, searching, isLoading, error } = useSearch(
    query.run_number,
    ''
  );
  const run_number = query.run_number ? query.run_number : NaN
  const datasets = results_grouped.map((result) => result.dataset);

  // we put the first item in array as empty string, because by default dataset name starts with slash
  const fullDatasetName = [
    '',
    selectedParts.first,
    selectedParts.second,
    selectedParts.third,
  ].join('/');
  const isThatDatasetExist = datasets.includes(fullDatasetName);

  useEffect(() => {
    if (isThatDatasetExist) {
      Router.replace({
        pathname: '/',
        query: {
          run_number: query.run_number,
          dataset_name: fullDatasetName,
          folder_path: query.folder_path,
          overlay: query.overlay,
          overlay_data: query.overlay_data,
          selected_plots: query.selected_plots,
        },
      });
    }
  }, [fullDatasetName]);

  const datasetParts = useDatasetPart(run_number, ['first', 'second', 'third'], name, groupBy)

  return (
    <Row>
      {
        datasetParts.map((part: any) => {
          const partName = Object.keys(part)[0]

          return (
            <Col>
              <PartsBrowser
                restParts={part[partName].notAvailableChoices}
                part={partName}
                resultsNames={part[partName].availableChoices}
                setGroupBy={setGroupBy}
                setName={setName}
                selectedName={name}
                //@ts-ignore
                name={selectedDatasetParts[partName]}
                setSelectedParts={setSelectedParts}
                selectedParts={selectedParts}
              />
            </Col>)

        })
      }
      <Col>
        {isThatDatasetExist ? <StyledSuccessIcon /> : <StyledErrorIcon />}
      </Col>
    </Row>
  );
};
