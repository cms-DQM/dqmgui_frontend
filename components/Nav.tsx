import React, { FC, ChangeEvent, Dispatch } from 'react';

interface NavProps {
  setRunNumber: Dispatch<any>;
  setDatasetName: Dispatch<any>;
}

const Nav: FC<NavProps> = ({ setRunNumber, setDatasetName }) => {
  return (
    <div>
      <label htmlFor="run_number">Run number:</label>
      <input
        id="run_number"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRunNumber(e.target.value)
        }
        type="text"
        name="run_number"
      />
      <label htmlFor="dataset_name">Dataset name:</label>
      <input
        id="dataset_name"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDatasetName(e.target.value)
        }
        type="text"
      />
    </div>
  );
};

export default Nav;
