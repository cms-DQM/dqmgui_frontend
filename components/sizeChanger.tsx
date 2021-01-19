import React, { useEffect } from 'react';
import { sizes } from './constants';
import { RadioButtonsGroup } from './radioButtonsGroup';
import { SizeProps, OptionProps } from '../containers/display/interfaces';

interface SizeChangerProps {
  setSize(value: SizeProps): any;
  currentValue: SizeProps;
  disabled?: boolean;
  plotsAreaWidth: number;
}

const formatOptions = () => {
  const sizesKeys = Object.keys(sizes);
  const options = sizesKeys.map((sizeKey: string) => {
    //@ts-ignore
    return { label: sizes[sizeKey].label, value: sizes[sizeKey].size };
  });
  return options;
};

export const SizeChanger = ({
  setSize,
  currentValue,
  disabled,
  plotsAreaWidth,
}: SizeChangerProps) => {
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
        if (value.w === sizes.fill.size.w && value.h === sizes.fill.size.h) {
          const ratio = value.w / value.h
          const newHeight = Math.floor(plotsAreaWidth / ratio) - 48 //because of margin and padding of plot frame
          const newWidth = plotsAreaWidth - 48 //because of margin and padding of plot frame
          setSize({ h: newHeight, w: newWidth })

        } else {
          setSize(value);
        }
      }}
      options={formatOptions()}
    />
  );
};
