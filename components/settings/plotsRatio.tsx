import * as React from 'react';
import { RadioButtonsGroup } from '../radioButtonsGroup';
import { plotsProportionsOptions } from '../constants';
import { OptionProps } from '../../containers/display/interfaces';

interface PlotsProportionProps {
  proportion: string;
  setProportion(position: string): void;
  disabled: boolean;
}

export const PlotsProportion = ({
  proportion,
  setProportion,
  disabled,
}: PlotsProportionProps) => {
  return (
    <RadioButtonsGroup
      options={plotsProportionsOptions}
      getOptionLabel={(option: OptionProps) => option.label}
      getOptionValue={(option: OptionProps) => option.value}
      current_value={proportion}
      disabled={disabled}
      action={setProportion}
    />
  );
};
