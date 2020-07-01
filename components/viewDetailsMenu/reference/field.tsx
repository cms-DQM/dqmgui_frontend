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
  set_interim_runs: React.Dispatch<React.SetStateAction<TripleProps[]>>;
  runs_set_for_overlay: TripleProps[];
}

export const Field = ({
  removeRun,
  id,
  field_name,
  value,
  placeholder,
  disabled,
  defaultValue,
  runs_set_for_overlay,
  set_interim_runs
}: FieldProps) => {
  useEffect(() => {
    const cleanField = () => {
      removeRun(id);
    };
    return cleanField;
  }, []);

  const inputValue = value ? value : defaultValue;
  return (
    <StyledFormItem name={`${id}_${field_name}`}>
      <StyledInput
        disabled={disabled}
        onChange={(e: any) => {
          changeRunsForOverlayPropsValues(e.target.value, 'label', id, runs_set_for_overlay,
            set_interim_runs)
        }
        }
        value={inputValue}
        defaultValue={inputValue}
        placeholder={placeholder}
      />
    </StyledFormItem>
  );
};
