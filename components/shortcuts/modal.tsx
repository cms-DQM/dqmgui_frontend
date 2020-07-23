import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';


import { useRouter } from 'next/router';
import { TripleProps, QueryProps, FolderPathQuery } from '../../containers/display/interfaces';
import { useSearch } from '../../hooks/useSearch';
import { concatArrays } from '../viewDetailsMenu/utils';
import { StyledModal, SelectedRunsTable, SelectedRunsTr, SelectedRunsTh, SelectedRunsTd, ResultsWrapper } from '../viewDetailsMenu/styledComponents';
import { StyledButton } from '../styledComponents';
import { theme } from '../../styles/theme';
import Nav from '../Nav';
import SearchResults from '../../containers/search/SearchResults';

interface SetRunsToShortcutModalProps {
  openAddRunsToShortcut: boolean;
  toggleAddRunsToShortcut(open: boolean): void;
  runs_in_shortcut: {
    run_number: string | undefined;
    dataset_name: string | undefined;
  }[];
  set_runs_in_shortcut: React.Dispatch<React.SetStateAction<{
    run_number: string | undefined;
    dataset_name: string | undefined;
  }[]>>
}

export const SetRunsToShortcutModal = ({
  openAddRunsToShortcut,
  toggleAddRunsToShortcut,
  runs_in_shortcut,
  set_runs_in_shortcut
}: SetRunsToShortcutModalProps) => {
  const [serachRunNumber, setSearchRunNumber] = React.useState('');
  const [serachDatasetName, setSearchDatasetName] = React.useState('');
  const router = useRouter();
  const query: QueryProps = router.query;

  const [selected_runs, set_selected_runs] = React.useState<TripleProps[]>([]);

  const { results, results_grouped, searching, isLoading, errors } = useSearch(
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
    };
    const copy = [...selected_runs];
    if (copy.length <= 4) {
      copy.push(full_run);
    }
    set_selected_runs(copy);
  };

  //runs_which_are_now_in_shortcut_and_selected_now combines list of runs which are already added to shortcut
  // with those which are just selected (selected_runs) in "Add runs to shortcut" modal(dialog)
  const runs_which_are_now_in_shortcut_and_selected_now = concatArrays([selected_runs, runs_in_shortcut]);

  return (
    <StyledModal
      title="Add runs to shortcut"
      visible={openAddRunsToShortcut}
      onCancel={() => {
        toggleAddRunsToShortcut(false);
        set_selected_runs([]);
      }}
      footer={[
        <StyledButton
          color={theme.colors.secondary.main}
          background="white"
          key="Close"
          onClick={() => {
            toggleAddRunsToShortcut(false);
            set_selected_runs([]);
          }}
        >
          Close
        </StyledButton>,
        <StyledButton
          key="OK"
          onClick={() => {
            set_runs_in_shortcut(runs_which_are_now_in_shortcut_and_selected_now);
            toggleAddRunsToShortcut(false);
            set_selected_runs([]);
          }}
        >
          OK
        </StyledButton>,
      ]}
    >
      <div>
        {runs_which_are_now_in_shortcut_and_selected_now.length > 0 && (
          <SelectedRunsTable>
            <thead>
              <SelectedRunsTr>
                <SelectedRunsTh>Nr.</SelectedRunsTh>
                <SelectedRunsTh>Run</SelectedRunsTh>
                <SelectedRunsTh>Dataset name</SelectedRunsTh>
              </SelectedRunsTr>
            </thead>
            <tbody>
              {runs_which_are_now_in_shortcut_and_selected_now.map(
                (run: FolderPathQuery, index: number) => {
                  return (
                    <SelectedRunsTr>
                      <SelectedRunsTd>{index + 1}.</SelectedRunsTd>
                      <SelectedRunsTd>{run.run_number}</SelectedRunsTd>
                      <SelectedRunsTd>{run.dataset_name}</SelectedRunsTd>
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
                results={results}
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
