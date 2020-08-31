import * as React from 'react';

import { LiveButton } from './styledComponents';
import Router from 'next/router';

const liveModeHandler = (liveModeRun: string, liveModeDataset: string) => {
  Router.push({
    pathname: '/',
    query: {
      run_number: liveModeRun,
      dataset_name: liveModeDataset,
    },
  });
};

export const LiveModeButton = () => {
  const liveModeDataset = '/Global/Online/ALL';
  const liveModeRun = '0';

  return (
    <LiveButton
      onClick={() => {
        liveModeHandler(liveModeRun, liveModeDataset);
      }}
    >
      Live Mode
    </LiveButton>
  );
};
