import React, { useEffect } from 'react';
import { Select } from 'antd';

import { overlayOptions } from '../../constants';
import {
  OptionProps,
} from '../../../containers/display/interfaces';
import { StyledSelect } from '../styledComponents';

const { Option } = Select;

interface OverlayPositionProps {
  setPosition(value: string): void;
  position: string;
}

export const OverlayPosition = ({ setPosition, position }: OverlayPositionProps) => {
  const [value, setValue] = React.useState<string>(position);

  useEffect(() => {
    setValue(position);
  }, []);

  useEffect(() => {
    setPosition(value);
  }, [value]);

  return (
    <StyledSelect
      onChange={(e: any) => {
        setValue(e);
      }}
      value={value}
    >
      {overlayOptions.map((option: OptionProps) => {
        return (
          <Option value={option.value} key={option.toString()}>
            <div>{option.label}</div>
          </Option>
        );
      })}
    </StyledSelect>
  );
};
