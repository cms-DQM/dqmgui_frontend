import React, { ChangeEvent, useEffect } from 'react';

import { StyledInput, StyledFormItem } from '../../styledComponents';

interface FieldProps {
  change_value_in_reference_table(value: string | number,
    key: string,
    id: string | number | boolean): void;
  removeRun(id: string | number | boolean): void,
  id: any;
  field_name: string;
  value: any;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;
}

export const Field = ({
  change_value_in_reference_table,
  removeRun,
  id,
  field_name,
  value,
  placeholder,
  disabled,
  defaultValue,
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
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          change_value_in_reference_table(
            e.target.value,
            field_name,
            id
          )
        }
        value={inputValue}
        defaultValue={inputValue}
        placeholder={placeholder}
      />
    </StyledFormItem>
  );
};
