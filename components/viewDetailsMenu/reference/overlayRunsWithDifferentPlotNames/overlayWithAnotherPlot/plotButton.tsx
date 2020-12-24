import * as React from 'react';
import { Button, Tooltip } from 'antd';

import { PlotoverlaidSeparatelyProps } from '../../../../../containers/display/interfaces';
import { PlotNameDiv } from './styledComponents';
import { setPlot } from './utils'

interface PlotButtonProps {
  disabled: boolean;
  theLastSelectedPlot: PlotoverlaidSeparatelyProps,
  plot_name: string,
  setTheLastSelectedPlot: React.Dispatch<React.SetStateAction<PlotoverlaidSeparatelyProps>>
}

export const PlotButton = ({ disabled, setTheLastSelectedPlot, theLastSelectedPlot, plot_name }: PlotButtonProps) => {
  return (
    <Tooltip title={disabled ? 'This plot is already selected' : ''}>
      <Button
        type='text'
        block
        disabled={disabled}
        onClick={() => setTheLastSelectedPlot(setPlot(theLastSelectedPlot, plot_name))}>
        <PlotNameDiv>{plot_name}</PlotNameDiv>
      </Button>
    </Tooltip>
  )
}