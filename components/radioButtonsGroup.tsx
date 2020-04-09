import React from 'react';
import { Radio } from 'antd';
import { OptionProps } from '../containers/display/interfaces';

import { StyledDiv } from './styledComponents';

interface RadioButtonsGroupProps {
  options: OptionProps[];
  action?(value: any): void;
  current_value?: any;
}

export const RadioButtonsGroup = ({ options, action, current_value }: RadioButtonsGroupProps) => {
  const [value, setValue] = React.useState(options[0].value);

  const actionForOnChange = action ? action : setValue
  const currentValue = current_value ? current_value : value

  return (
    <StyledDiv>
      <Radio.Group onChange={(e) => actionForOnChange(e.target.value)} value={currentValue}>
        {options.map((option: OptionProps) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </StyledDiv>
  );
};
