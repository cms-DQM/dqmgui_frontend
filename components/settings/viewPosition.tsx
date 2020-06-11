import * as React from 'react'
import { RadioButtonsGroup } from '../radioButtonsGroup'
import { viewPositions } from '../constants'
import { OptionProps } from '../../containers/display/interfaces'

interface ViewPositionProps {
  viewPlotsPosition: string;
  setViewPlotsPosition(position: string): void;
}

export const ViewPosition = ({ viewPlotsPosition, setViewPlotsPosition }: ViewPositionProps) => {
  return (
    <RadioButtonsGroup
      options={viewPositions}
      getOptionLabel={(option: OptionProps) => option.label}
      getOptionValue={(option: OptionProps) => option.value}
      current_value={viewPlotsPosition}
      action={setViewPlotsPosition}
    />

  )
}