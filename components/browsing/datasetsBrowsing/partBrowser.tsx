import React, { useState } from 'react';
import { Col, Select, Popover } from 'antd';
import _ from 'lodash';

import { StyledSelect } from '../../viewDetailsMenu/styledComponents';
import { StyledOptionContent } from '../../styledComponents';
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
  selectedName: string;
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
  selectedName,
}: PartsBrowserProps) => {

  const [value, setValue] = useState(name)

  const content = (
    <div>
      <p>{`Available combination with ${selectedName}`}</p>
    </div>
  );

  const notAvailableContent = (
    <div>
      <p>{`Not available combination with ${selectedName}`}</p>
    </div>
  );
  return (
    <StyledSelect
      dropdownMatchSelectWidth={false}
      defaultValue={name}
      selected={selectedName === value ? 'selected' : ''}
      onChange={(value: any) => {
        selectedParts[part] = value
        setSelectedParts(selectedParts)
        setGroupBy(part);
        setValue(value)
        setName(value);
      }}>
      {
        resultsNames.map((result: string) => (
          <Option
            value={result}
            key={result}
          >
            <Popover content={content} title="" trigger="hover" placement="right">
              <StyledOptionContent
                availability="available"
              >{result}</StyledOptionContent>
            </Popover >
          </Option>
        ))
      }
      {
        restParts.map((result: string) => (
          <Option
            key={result}
            value={result}>
            <Popover content={notAvailableContent} title="" trigger="hover" placement="right">
              <StyledOptionContent>{result}</StyledOptionContent>
            </Popover>
          </Option>
        ))
      }
    </StyledSelect >
  );
};
