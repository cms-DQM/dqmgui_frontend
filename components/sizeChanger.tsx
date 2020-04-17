import React, { useEffect } from 'react';
import { sizes } from './constants';
import { RadioButtonsGroup } from './radioButtonsGroup';
import { SizeProps } from '../containers/display/interfaces';

interface SizeChangerProps {
  dispatch(params: any): void;
  setSize(value: SizeProps): any;
  currentValue: SizeProps;
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
  dispatch,
  setSize,
  currentValue,
}: SizeChangerProps) => {
  useEffect(() => {
    return () => setSize(currentValue)(dispatch);
  }, []);

  return (
    <RadioButtonsGroup
      current_value={currentValue}
      action={(value: SizeProps) => {
        setSize(value)(dispatch);
      }}
      options={formatOptions()}
    />
  );
};
