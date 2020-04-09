import React from 'react';
import { Radio } from 'antd';
import { OptionProps } from '../containers/display/interfaces';

import { StyledDiv } from './styledComponents';

interface RadioButtonsGroupProps {
  options: OptionProps[];
}
export const RadioButtonsGroup = ({ options }: RadioButtonsGroupProps) => {
  const [value, setValue] = React.useState(options[0].value);
  return (
    <StyledDiv>
      <Radio.Group onChange={setValue} value={value}>
        {options.map((option: OptionProps) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </StyledDiv>
  );
};
