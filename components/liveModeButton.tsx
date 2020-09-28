import * as React from 'react';

import { LiveButton } from './styledComponents';
import Router from 'next/router';
import { useUpdateLiveMode } from '../hooks/useUpdateInLiveMode';
import { getPathName } from './utils';

const liveModeHandler = (liveModeRun: string, liveModeDataset: string) => {
  Router.push({
    pathname: getPathName(),
    query: {
      run_number: liveModeRun,
      dataset_name: liveModeDataset,
      folder_path: 'Summary',
    },
  });
};

export const LiveModeButton = () => {
  const liveModeDataset = '/Global/Online/ALL';
  const liveModeRun = '0';
  const { set_update, update } = useUpdateLiveMode();

  return (
    <LiveButton
      onClick={() => {
        liveModeHandler(liveModeRun, liveModeDataset);
        () => set_update(true);
      }}
    >
      Live Mode
    </LiveButton>
  );
};
