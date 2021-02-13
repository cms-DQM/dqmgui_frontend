import * as React from 'react'
import Router, { NextRouter } from 'next/router';
import { Select } from 'antd'

import { StyledSelect } from '../../components/viewDetailsMenu/styledComponents'
import { overlayOptions } from '../../components/constants';

const { Option } = Select;

interface OverlayPositionSelectionProps {
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

const changeOverlayPosition = (value: string, reference: {
  [x: string]: string | boolean | string[];
  size: string;
  jsroot: boolean;
  ref: string | string[];
}) => {
  const copy = { ...reference }
  copy.ref = value
  return copy
}

export const OverlayPositionSelection = ( { setReference, reference }: OverlayPositionSelectionProps) => {
  return <StyledSelect
    onChange={(overlay: any) => setReference(changeOverlayPosition(overlay, reference))}
    defaultValue={reference.ref}>
    {
      overlayOptions.map((option) =>
        <Option
          value={option.value}
          key={option.value}
        >
          {option.label}
        </Option>)
    }
  </StyledSelect>
}