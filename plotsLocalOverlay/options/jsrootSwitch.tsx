import * as React from 'react'
import Router, { NextRouter } from 'next/router';
import { Switch } from 'antd';

interface JSROOTSwitchProps {
  disabled: boolean;
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

const changeJSROOTValue = (value: boolean, reference: {
  [x: string]: string | boolean | string[];
  size: string;
  jsroot: boolean;
  ref: string | string[];
}) => {
  const copy = { ...reference }
  copy.jsroot = value
  return copy
}

export const JSROOTSwitch = ({ setReference, reference, disabled }: JSROOTSwitchProps) => {
  return (
    <Switch
      disabled={disabled}
      style={{ width: 'fit-content' }}
      checkedChildren="JSROOT enabled"
      unCheckedChildren="JSROOT disabled"
      checked={reference.jsroot}
      onChange={(e) => {
        setReference(changeJSROOTValue(e, reference));
      }}
    />
  )
}