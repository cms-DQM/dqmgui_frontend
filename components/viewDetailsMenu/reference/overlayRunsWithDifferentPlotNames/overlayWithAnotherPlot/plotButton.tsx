import * as React from 'react';
import { Button, Tooltip } from 'antd';

import { PlotoverlaidSeparatelyProps } from '../../../../../containers/display/interfaces';
import { PlotNameDiv } from './styledComponents';

interface PlotButtonProps {
  disabled: boolean;
  setPlot(overlaidPlots: PlotoverlaidSeparatelyProps, plot_name: string): PlotoverlaidSeparatelyProps;
  overlaidPlots: PlotoverlaidSeparatelyProps,
  plot_name: string,
  setOverlaidPlots: React.Dispatch<React.SetStateAction<PlotoverlaidSeparatelyProps>>
}

export const PlotButton = ({ disabled, setOverlaidPlots, setPlot, overlaidPlots, plot_name }: PlotButtonProps) => {
  return (
    <Tooltip title={disabled ? 'This plot is already selected' : ''}>
      <Button
        type='text'
        block
        disabled={disabled}
        onClick={() => setOverlaidPlots(setPlot(overlaidPlots, plot_name))}>
        <PlotNameDiv>{plot_name}</PlotNameDiv>
      </Button>
    </Tooltip>
  )
}