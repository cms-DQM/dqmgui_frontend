import React, { ChangeEvent, useEffect } from 'react';

import {
  change_value_in_reference_table,
  removeRun,
} from '../../../reducers/reference';
import { StyledDiv } from '../styledComponents';
import { StyledInput, StyledFormItem } from '../../styledComponents';

interface FieldProps {
  dispatch: any;
  state: any;
  id: any;
  field_name: string;
  value: any;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string | number;
}

export const Field = ({
  state,
  dispatch,
  id,
  field_name,
  value,
  placeholder,
  disabled,
  defaultValue,
}: FieldProps) => {
  useEffect(() => {
    const cleanField = () => {
      removeRun(id)(state, dispatch);
    };
    return cleanField;
  }, []);

  return (
    // <StyledDiv>
    <StyledFormItem name={`${id}_${field_name}`}>
      <StyledInput
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          change_value_in_reference_table(
            e.target.value,
            field_name,
            id
          )(state, dispatch)
        }
        value={value}
        placeholder={placeholder}
      />
    </StyledFormItem>
    // </StyledDiv>
  );
};
