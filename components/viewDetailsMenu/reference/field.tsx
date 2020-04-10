import React, { ChangeEvent, useEffect } from 'react';

import { change_value } from '../../../reducers/reference';
import { StyledDiv } from '../styledComponents';
import {
  StyledInput,
  StyledFormItem,
} from '../../styles';

interface FieldProps {
  dispatch: any;
  state: any;
  id: any;
  field_name: string;
  value: any
}

export const Field = ({ state, dispatch, id, field_name, value }: FieldProps) => {

  useEffect(() => {
    const cleanField = () => change_value(
      '',
      field_name,
      id
    )(state, dispatch)
    return cleanField
  }, [])

  return (
    <StyledDiv>
      <StyledFormItem
        name={`${id}_${field_name}`} >
        <StyledInput
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            change_value(
              e.target.value,
              field_name,
              id
            )(state, dispatch)
          }
          value={value}
          placeholder={`Enter ${field_name}`}
          type="text"
        />
      </StyledFormItem>
    </StyledDiv>
  );
};
