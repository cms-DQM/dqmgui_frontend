import * as React from 'react'
import Router, { NextRouter } from 'next/router';

import { CustomCheckbox } from '../../components/styledComponents';

interface CheckBoxProps {
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
  option: {
    label: string;
    value: boolean
  }
}

const changeCheckboxValue = (value: boolean, checkbox: string, reference: {
  [x: string]: string | boolean | string[];
  size: string;
  jsroot: boolean;
  ref: string | string[];
}) => {
  const copy = { ...reference }
  copy[checkbox] = value
  return copy
}

export const CheckBox = ({ setReference, reference, option }: CheckBoxProps) => {
  const [checked, setChecked] = React.useState(option.value)

  React.useEffect(() => {
    setReference(changeCheckboxValue(checked, option.label.toLocaleLowerCase(), reference))
  }, [checked])
  
  return (
    <CustomCheckbox
      onClick={async (e: any) => {
        await setChecked(e.target.checked);
      }}
      checked={checked}
    >
      {option.label}
    </CustomCheckbox>
  )
}