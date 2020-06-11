import * as React from 'react'
import { RadioButtonsGroup } from '../radioButtonsGroup'
import { searchOptions } from '../constants'
import { OptionProps } from '../../containers/display/interfaces'

interface SearchOptionsProps {
  searchOption: string;
  setSearchOption(position: string): void;
}

export const SearchOptions = ({ searchOption, setSearchOption }: SearchOptionsProps) => {
  return (
    <RadioButtonsGroup
      options={searchOptions}
      getOptionLabel={(option: OptionProps) => option.label}
      getOptionValue={(option: OptionProps) => option.value}
      current_value={searchOption}
      action={setSearchOption}
    />
  )
}