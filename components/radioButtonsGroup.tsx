import React from 'react';
import { Radio } from 'antd';

import { OptionProps } from '../containers/display/interfaces';
import { StyledRadio } from './styledComponents';

interface RadioButtonsGroupProps {
  options: any[];
  action(value: any): void;
  current_value?: any;
  getOptionValue(value: any): any;
  getOptionLabel(value: any): string;
  radioColor?: string;
}

export const RadioButtonsGroup = ({
  options,
  action,
  current_value,
  getOptionValue,
  getOptionLabel,
  radioColor,
}: RadioButtonsGroupProps) => {
  const [value, setValue] = React.useState(current_value);

  return (
    <Radio.Group
      onChange={(e) => {
        action(e.target.value);
        setValue(e.target.value);
      }}
      value={value}
    >
      {options.map((option: OptionProps) => {
        return (
          <StyledRadio
            color={radioColor}
            key={option.value}
            value={getOptionValue(option)}
          >
            {getOptionLabel(option)}
          </StyledRadio>
        );
      })}
    </Radio.Group>
  );
};
