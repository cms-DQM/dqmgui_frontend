import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  StyledModal,
  ResultsWrapper,
} from '../../styledComponents';
import { StyledButton } from '../../../styledComponents';
import { theme } from '../../../../styles/theme';
import {
  TripleProps,
  QueryProps,
} from '../../../../containers/display/interfaces';
import Nav from '../../../Nav';
import { useSearch } from '../../../../hooks/useSearch';
import SearchResults from '../../../../containers/search/SearchResults';
import {
  changeRouter,
  getChangedQueryParams,
} from '../../../../containers/display/utils';
import { makeURLForOverlayData } from '../../../plots/plot/singlePlot/utils';
import { useRouter } from 'next/router';
import { Table } from './table';

interface SetRunsModalProps {
  open: boolean;
  toggleModal(open: boolean): void;
  overlaid_runs: TripleProps[];
  set_runs_set_for_overlay(runs: TripleProps[]): void;
  setTriples(selected_runs: TripleProps[]): void;
}

export const SetRunsModal = ({
  open,
  toggleModal,
  overlaid_runs,
  setTriples,
}: SetRunsModalProps) => {
  const [serachRunNumber, setSearchRunNumber] = React.useState('');
  const [serachDatasetName, setSearchDatasetName] = React.useState('');

  const initialSelectedRuns = overlaid_runs.length > 0 ? overlaid_runs : []
  const [selected_runs, set_selected_runs] = React.useState<TripleProps[]>(initialSelectedRuns);

  React.useEffect(()=>{
    set_selected_runs(overlaid_runs)
  },[overlaid_runs])

  const { results_grouped, searching, isLoading, errors } = useSearch(
    serachRunNumber,
    serachDatasetName
  );

  //navigationHandler is used for set run and dataset search values
  const navigationHandler = (
    search_by_run_number: string,
    search_by_dataset_name: string
  ) => {
    setSearchRunNumber(search_by_run_number);
    setSearchDatasetName(search_by_dataset_name);
  };

  //searchHandler is used for set run and dataset for overlay
  const searchHandler = (run_number: string, dataset_name: string) => {
    const id = uuidv4();
    const full_run: TripleProps = {
      id: id,
      run_number: run_number,
      dataset_name: dataset_name,
      checked: true,
      label: '',
    };
    const copy = [...selected_runs];
    if (copy.length <= 4) {
      copy.push(full_run);
    }
    set_selected_runs(copy);
  };


  const onOk = () => {
    changeRouter(
      getChangedQueryParams(
        {
          overlay_data: `${makeURLForOverlayData(selected_runs)}`,
        },
        query
      )
    );
    setTriples(selected_runs);
    toggleModal(false);
  }

  const router = useRouter();
  const query: QueryProps = router.query;

  return (
    <StyledModal
      title="Set Runs"
      visible={open}
      onCancel={() => {
        toggleModal(false);
        set_selected_runs(overlaid_runs);
      }}
      footer={[
        <StyledButton
          color={theme.colors.secondary.main}
          background="white"
          key="Close"
          onClick={() => {
            toggleModal(false);
            set_selected_runs([]);
          }}
        >
          Close
        </StyledButton>,
        <StyledButton
          key="OK"
          onClick={onOk}>
          OK
        </StyledButton>
      ]}
    >
      <div>
        <Table
        selectedRuns={selected_runs}
        setSelectedRuns={set_selected_runs}
        />
        <div style={{ padding: 8 }}>
          <Nav
            handler={navigationHandler}
            setRunNumber={setSearchRunNumber}
            setDatasetName={setSearchDatasetName}
            type="overlay"
          />
          {open && searching ? (
            <ResultsWrapper>
              <SearchResults
                handler={searchHandler}
                isLoading={isLoading}
                results_grouped={results_grouped}
                errors={errors}
              />
            </ResultsWrapper>
          ) : (
            <ResultsWrapper />
          )}
        </div>
      </div>
    </StyledModal>
  );
};
