import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'

import { openModal } from '../../../reducers/reference'
import Nav from '../../Nav'
import { useSearch } from '../../../hooks/useSearch'
import SearchResults from '../../../containers/search/SearchResults'
import { NotFoundDivWrapper, ChartIcon, NotFoundDiv } from '../../../containers/search/styledComponents'
import { change_value, removeRun } from '../../../reducers/reference';

interface CustomModalProps {
  visible: boolean;
  dispatch: any;
  id: any;
  state: any;
}

export const CustomModal = ({ visible, dispatch, id, state }: CustomModalProps) => {
  const [search_run_number, setSearchRunNumber] = useState(NaN);
  const [search_dataset_name, setSearchDatasetName] = useState('');

  const [run_number, setRunNumber] = useState(NaN);
  const [dataset_name, setDatasetName] = useState('');

  const navigationHandler = (search_by_run_number: number, search_by_dataset_name: string) => {
    setSearchRunNumber(search_by_run_number)
    setSearchDatasetName(search_by_dataset_name)
  }

  const searchHandler = (run_number: number, dataset_name: string) => {
    setRunNumber(run_number)
    setDatasetName(dataset_name)

    change_value(
      run_number,
      'run_number',
      id
    )(state, dispatch)

    change_value(
      dataset_name,
      'dataset_name',
      id
    )(state, dispatch)

    openModal(false)(dispatch)
  }
  
console.log(state)
  const { results, results_grouped, searching, isLoading } = useSearch(
    search_run_number,
    search_dataset_name,
  );

  return (
    <Modal
      title="Overlay Plots data search"
      visible={visible}
      onCancel={() => openModal(false)(dispatch)}
      footer={[
        <Button key="Close"  onClick={() => openModal(false)(dispatch)}>
          Close
        </Button>,
      ]}
    >
      <div style={{width: '25vw'}}>
        <Nav handler={navigationHandler} setRunNumber={setSearchRunNumber} setDatasetName={setSearchDatasetName} />
      </div>
      {
        searching ? (
          <div style={{overflow: 'scroll', overflowX:'hidden',  height: '60vh', width:'fit-content', paddingTop: 8}}>
          <SearchResults
            handler={searchHandler}
            isLoading={isLoading}
            results={results}
            results_grouped={results_grouped}
          />
          </div>
        ) : (
            <NotFoundDivWrapper>
              <NotFoundDiv style={{ border: 'hidden' }}>
                {/* <ChartIcon />
                Welcome to DQM GUI */}
              </NotFoundDiv>
            </NotFoundDivWrapper>
          )
      }
    </Modal>
  )
}