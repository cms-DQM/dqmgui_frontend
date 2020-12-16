import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MinusOutlined } from '@ant-design/icons';

import {
  StyledModal,
  ResultsWrapper,
  SelectedRunsTh,
  SelectedRunsTr,
  SelectedRunsTd,
  SelectedRunsTable,
} from '../../styledComponents';
import { StyledButton, StyledSecondaryButton } from '../../../styledComponents';
import { theme } from '../../../../styles/theme';
import {
  TripleProps,
  FolderPathQuery,
  QueryProps,
} from '../../../../containers/display/interfaces';
import Nav from '../../../Nav';
import { useSearch } from '../../../../hooks/useSearch';
import SearchResults from '../../../../containers/search/SearchResults';
import { concatArrays } from '../../utils';
import {
  changeRouter,
  getChangedQueryParams,
} from '../../../../containers/display/utils';
import { addOverlayData } from '../../../plots/plot/singlePlot/utils';
import { useRouter } from 'next/router';

interface SetRunsModalProps {
  open: boolean;
  toggleModal(open: boolean): void;
  overlaid_runs: TripleProps[];
  set_runs_set_for_overlay(runs: TripleProps[]): void;
  triples: TripleProps[];
  setTriples(selected_runs: TripleProps[]): void;
}

export const SetRunsModal = ({
  open,
  toggleModal,
  triples,
  setTriples,
}: SetRunsModalProps) => {
  const [serachRunNumber, setSearchRunNumber] = React.useState('');
  const [serachDatasetName, setSearchDatasetName] = React.useState('');

  const [selected_runs, set_selected_runs] = React.useState<TripleProps[]>([]);

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

  const deleteRunFromSelectedList = (id: string) => {
    const copy = [...selected_runs];
    const index = copy.findIndex((run) => {
      return run.id === id;
    });

    if (index !== -1) {
      copy.splice(index, 1);
      set_selected_runs(copy);
    }
  };

  //overlaid_and_selected_runs combines list of runs which are already overlaid (triples)
  // with those which are just selected (selected_runs) in "Set Runs" dialog
  const overlaid_and_selected_runs = concatArrays([selected_runs, triples]);

  const router = useRouter();
  const query: QueryProps = router.query;

  return (
    <StyledModal
      title="Set Runs"
      visible={open}
      onCancel={() => {
        toggleModal(false);
        set_selected_runs([]);
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
          onClick={() => {
            changeRouter(
              getChangedQueryParams(
                {
                  overlay_data: `${addOverlayData(overlaid_and_selected_runs)}`,
                },
                query
              )
            );
            setTriples(overlaid_and_selected_runs);
            toggleModal(false);
            set_selected_runs([]);
          }}
        >
          OK
        </StyledButton>,
      ]}
    >
      <div>
        {overlaid_and_selected_runs.length > 0 && (
          <SelectedRunsTable>
            <thead>
              <SelectedRunsTr>
                <SelectedRunsTh>Nr.</SelectedRunsTh>
                <SelectedRunsTh>Run</SelectedRunsTh>
                <SelectedRunsTh>Dataset name</SelectedRunsTh>
                <SelectedRunsTh>Action</SelectedRunsTh>
              </SelectedRunsTr>
            </thead>
            <tbody>
              {overlaid_and_selected_runs.map(
                (run: FolderPathQuery, index: number) => {
                  return (
                    <SelectedRunsTr>
                      <SelectedRunsTd>{index + 1}.</SelectedRunsTd>
                      <SelectedRunsTd>{run.run_number}</SelectedRunsTd>
                      <SelectedRunsTd>{run.dataset_name}</SelectedRunsTd>
                      <SelectedRunsTd>
                        <StyledSecondaryButton
                          onClick={() => {
                            deleteRunFromSelectedList(run.id as string);
                          }}
                          icon={<MinusOutlined />}
                        ></StyledSecondaryButton>
                      </SelectedRunsTd>
                    </SelectedRunsTr>
                  );
                }
              )}
            </tbody>
          </SelectedRunsTable>
        )}
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
