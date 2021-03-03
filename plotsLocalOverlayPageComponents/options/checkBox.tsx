import * as React from 'react'

import { CustomCheckbox } from '../../components/styledComponents';

interface DataType {
  [x: string]: string | boolean | string[];
  size?: string;
  jsroot?: boolean;
  ref?: string | string[];
}

interface CheckBoxProps {
  setReference: React.Dispatch<React.SetStateAction<
    DataType
  >>
  reference: DataType;
  option: {
    label: string;
    value: boolean
  }
}

const changeCheckboxValue = (value: boolean, checkbox: string, reference:
  DataType) => {
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