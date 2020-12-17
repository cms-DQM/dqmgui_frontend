import React, { useEffect, useState } from 'react';

import { StyledInput } from '../../styledComponents';
import { TripleProps } from '../../../containers/display/interfaces';

interface FieldProps {
  value: any;
  placeholder?: string;
  disabled?: boolean;
  changeTriple: any;
  overlaid_run: TripleProps;
}

export const Field = ({
  value,
  placeholder,
  disabled,
  overlaid_run,
  changeTriple,
}: FieldProps) => {
  const [input_value, set_input_value] = useState('')

  useEffect(() => {
    set_input_value(value)
  }, [value])

console.log(input_value)
  return (
      <StyledInput
        disabled={disabled}
        onChange={(e: any) => {
          changeTriple(overlaid_run, e.target.value, 'label')
        }}
        defaultValue={input_value}
        value={input_value}
        placeholder={placeholder}
      />
  );
};
