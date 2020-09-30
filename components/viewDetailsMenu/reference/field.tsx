import React, { ChangeEvent, useEffect } from 'react';

import { StyledInput, StyledFormItem } from '../../styledComponents';
import { changeRunsForOverlayPropsValues } from '../utils';
import { TripleProps } from '../../../containers/display/interfaces';

interface FieldProps {
  removeRun(id: string | number | boolean): void;
  id: any;
  field_name: string;
  value: any;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;
  change_run_details: any;
  triples: TripleProps[];
}

export const Field = ({
  removeRun,
  id,
  field_name,
  value,
  placeholder,
  disabled,
  defaultValue,
  triples,
  change_run_details,
}: FieldProps) => {

  const inputValue = value ? value : defaultValue;
  return (
    <StyledFormItem name={`${id}_${field_name}`}>
      <StyledInput
        disabled={disabled}
        onChange={(e: any) => {
          changeRunsForOverlayPropsValues(
            e.target.value,
            'label',
            id,
            triples,
            change_run_details
          );
        }}
        value={inputValue}
        defaultValue={inputValue}
        placeholder={placeholder}
      />
    </StyledFormItem>
  );
};
