import React from 'react';
import { Radio } from 'antd';
import { OptionProps } from '../containers/display/interfaces';

import { StyledDiv } from './styledComponents';

interface RadioButtonsGroupProps {
  options: OptionProps[];
  action(value: any): void;
  current_value?: any;
}

export const RadioButtonsGroup = ({
  options,
  action,
  current_value,
}: RadioButtonsGroupProps) => {
  const [value, setValue] = React.useState(current_value);

  return (
    <StyledDiv>
      <Radio.Group
        onChange={(e) => {
          action(e.target.value);
          setValue(e.target.value);
        }}
        value={value}
      >
        {options.map((option: OptionProps) => {
          return (
            <Radio key={option.label} value={option.value}>
              {option.label}
            </Radio>
          );
        })}
      </Radio.Group>
    </StyledDiv>
  );
};
