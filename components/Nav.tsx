import { FC, ChangeEvent, Dispatch, FormEvent, useReducer } from 'react';

import { navReducer, initialState, setSearchFieldByDatasetName, setSearchFieldByRunNumber } from '../reducers/navReducer'

interface NavProps {
  setRunNumber: Dispatch<any>;
  setDatasetName: Dispatch<any>;
}

const Nav: FC<NavProps> = ({ setRunNumber, setDatasetName }) => {
  const [state, dispatch] = useReducer(navReducer, initialState);

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setRunNumber(state.search_by_run_number)
        setDatasetName(state.search_by_dataset_name)
      }}>
      <label htmlFor="run_number">Run number:</label>
      <input
        id="run_number"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchFieldByRunNumber(e.target.value)(dispatch)
        }
        type="text"
        name="run_number"
      />
      <label htmlFor="dataset_name">Dataset name:</label>
      <input
        id="dataset_name"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchFieldByDatasetName(e.target.value)(dispatch)
        }
        type="text"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Nav;
