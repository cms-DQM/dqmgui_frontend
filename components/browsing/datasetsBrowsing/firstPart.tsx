import React from 'react';
import { Col, Select } from 'antd';
import _ from 'lodash';

import { StyledSelect } from '../../viewDetailsMenu/styledComponents';
const { Option } = Select;

interface PartsBrowserProps {
  setGroupBy(groupBy: string): void;
  setName(name: string): void;
  resultsNames: any;
  allParts: string[];
  part: string;
  name: string | undefined;
  setDatasetError(error: boolean): void;
}

export const PartsBrowser = ({
  setName,
  setGroupBy,
  resultsNames,
  allParts,
  part,
  name,
  setDatasetError,
}: PartsBrowserProps) => {

  return (
    <StyledSelect dropdownMatchSelectWidth={false} defaultValue={name}
      onChange={(e: any) => {
        setGroupBy(part);
        setName(e);
      }}>
      {
        resultsNames.map((result: string) => (
          <Option
            value={result}
            key={result}
          >
            {result}
          </Option>
        ))
      }
      {
        allParts.map((result: string) => (
          <Option
            key={result}
            style={{ background: '#e61b25a3' }}
            value={result}>
            {result}
          </Option>
        ))
      }
    </StyledSelect>
  );
};
