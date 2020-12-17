import React, { ChangeEvent, useEffect } from 'react';

import { StyledInput, StyledFormItem } from '../../styledComponents';
import { TripleProps } from '../../../containers/display/interfaces';

interface FieldProps {
  id: any;
  field_name: string;
  value: any;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;
  changeTriple: any;
  overlaid_run: TripleProps;
}

export const Field = ({
  id,
  field_name,
  value,
  placeholder,
  disabled,
  defaultValue,
  overlaid_run,
  changeTriple,
}: FieldProps) => {
  const inputValue = value ? value : defaultValue;
  return (
    <StyledFormItem name={`${id}_${field_name}`}>
      <StyledInput
        disabled={disabled}
        onChange={(e: any) => {
          changeTriple(overlaid_run,  e.target.value, 'label')
        }}
        value={inputValue}
        defaultValue={inputValue}
        placeholder={placeholder}
      />
    </StyledFormItem>
  );
};
