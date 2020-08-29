import * as React from 'react';

import { navigationHandler } from '../utils/pages/index'
import { LiveButton } from './styledComponents';

export const LiveModeButton = () => {
  const liveModeDataset = "Global/Online/ALL"
  const liveModeRun = "0"

  return (
    <LiveButton
      onClick={() => { navigationHandler(liveModeRun, liveModeDataset) }}
    >
      Live Mode
    </LiveButton>
  )
}