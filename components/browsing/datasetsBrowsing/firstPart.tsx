import React, { useState } from 'react';
import { Col, Select } from 'antd';
import _ from 'lodash';

import { StyledSelect } from '../../viewDetailsMenu/styledComponents';
const { Option } = Select;

interface PartsBrowserProps {
  setGroupBy(groupBy: string): void;
  setName(name: string): void;
  resultsNames: any;
  restParts: string[];
  part: string;
  name: string | undefined;
  setSelectedParts(selectedPart: any): void;
  selectedParts: any;
}

export const PartsBrowser = ({
  setName,
  setGroupBy,
  resultsNames,
  restParts,
  part,
  name,
  setSelectedParts,
  selectedParts,
}: PartsBrowserProps) => {

  const [error, setError] = useState(false)

  return (
    <StyledSelect
      dropdownMatchSelectWidth={false}
      defaultValue={name}
      // style={{ color: error ? 'red' : 'green' }}
      onChange={(value: any) => {
        selectedParts[part] = value
        setSelectedParts(selectedParts)
        setGroupBy(part);
        setName(value);
      }}>
      {
        resultsNames.map((result: string) => (
          <Option
            value={result}
            key={result}
            // style={{ color: 'green' }}
          >
            <p onClick={() => setError(false)}>{result}</p>
          </Option>
        ))
      }
      {
        restParts.map((result: string) => (
          <Option
            key={result}
            style={{ color: '#e61b25a3' }}
            value={result}>
            <p onClick={() => setError(true)}>{result}</p>
          </Option>
        ))
      }
    </StyledSelect >
  );
};
