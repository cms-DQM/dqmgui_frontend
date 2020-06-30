import React, { useEffect } from 'react';
import { sizes } from './constants';
import { RadioButtonsGroup } from './radioButtonsGroup';
import { SizeProps, OptionProps } from '../containers/display/interfaces';

interface SizeChangerProps {
  setSize(value: SizeProps): any;
  currentValue: SizeProps;
  disabled?: boolean;
}

const formatOptions = () => {
  const sizesKeys = Object.keys(sizes);
  const options = sizesKeys.map((sizeKey: string) => {
    //@ts-ignore
    return { label: sizes[sizeKey].label, value: sizes[sizeKey].size };
  });
  return options;
};

export const SizeChanger = ({ setSize, currentValue, disabled }: SizeChangerProps) => {
  useEffect(() => {
    return () => setSize(currentValue);
  }, []);

  return (
    <RadioButtonsGroup
      disabled={disabled}
      current_value={currentValue}
      getOptionLabel={(option: OptionProps) => option.label}
      getOptionValue={(option: OptionProps) => option.value}
      action={(value: SizeProps) => {
        setSize(value);
      }}
      options={formatOptions()}
    />
  );
};
