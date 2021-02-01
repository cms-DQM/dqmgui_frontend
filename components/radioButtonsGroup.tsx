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
  disabled?: boolean;
}

export const RadioButtonsGroup = ({
  options,
  action,
  current_value,
  getOptionValue,
  getOptionLabel,
  radioColor,
  disabled,
}: RadioButtonsGroupProps) => {
  const [value, setValue] = React.useState(current_value);

  return (
    <Radio.Group
      onChange={(e) => {
        action(e.target.value);
        setValue(e.target.value);
      }}
      value={value}
      disabled={disabled}
    >
      {options.map((option: OptionProps) => {
        return (
          <StyledRadio
            color={radioColor}
            key={option.label}
            value={getOptionValue(option)}
          >
            {getOptionLabel(option)}
          </StyledRadio>
        );
      })}
    </Radio.Group>
  );
};
