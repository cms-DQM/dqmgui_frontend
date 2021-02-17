import * as React from 'react'
import { Select } from 'antd'

import { StyledSelect } from '../../components/viewDetailsMenu/styledComponents'
import { sizes } from '../../components/constants';

const { Option } = Select;

interface SizeSelectionProps {
   setReference: React.Dispatch<React.SetStateAction<{
    [x: string]: string | boolean | string[];
    size: string;
    jsroot: boolean;
    ref: string | string[];
}>>
  reference: {
     [x: string]: string | boolean | string[];
    size: string;
    jsroot: boolean;
    ref: string | string[];
  };
}

const changeSize = (value: string, reference: {
  [x: string]: string | boolean | string[];
  size: string;
  jsroot: boolean;
  ref: string | string[];
}) => {
  const copy = { ...reference }
  copy.size = value
  return copy
}

export const SizeSelection = ( { setReference, reference }: SizeSelectionProps) => {
  const options = Object.keys(sizes)

  return <StyledSelect
    onChange={(value: any) => setReference(changeSize(value, reference))}
    defaultValue={reference.size}>
    {
      options.map((option) =>
        <Option
          value={option}
          key={option}
        >
          {//@ts-ignore
          sizes[option].label}
        </Option>)
    }
  </StyledSelect>
}