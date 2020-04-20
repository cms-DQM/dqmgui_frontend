import React, { useState } from 'react';
import { DropdownMenu } from '../../menu';
import { StyledFormItem, StyledInput } from '../../styledComponents';
import { xyzTypes } from '../../constants';
import { OptionProps } from '../../../containers/display/interfaces';

interface TypesProps {
  type: string;
}

export const Type = ({ type }: TypesProps) => {
  const [selectedOption, setSelectedOption] = useState<OptionProps>(xyzTypes[0])

  const copy: OptionProps[] = [...xyzTypes]
  const withAction: OptionProps[] = copy.map((option: OptionProps) => {
    const copy = { ...option }
    copy.action = setSelectedOption
    return copy
  })

  return (
    <tr>
      <td >
        <DropdownMenu title={`${type} type`} options={withAction} />
      </td>
      <td style={{ paddingRight: '16px' }}>
        {selectedOption?.label}
      </td>
      <td>
        <StyledFormItem
          label="min"
          name={`min${type}`}
        >
          <StyledInput />
        </StyledFormItem>
      </td>
      <td>
        <StyledFormItem
          label="max"
          name={`max${type}`}
        >
          <StyledInput />
        </StyledFormItem>
      </td>
    </tr>
  )
}