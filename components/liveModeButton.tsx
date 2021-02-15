import * as React from 'react';
import qs from 'qs';

import { LiveButton } from './styledComponents';
import Router from 'next/router';
import { useUpdateLiveMode } from '../hooks/useUpdateInLiveMode';
import { workspaces as onlineWorkspace } from '../workspaces/online';
import { root_url_ } from '../config/config';

const liveModeHandler = (liveModeRun: string, liveModeDataset: string) => {
  const parameters = {
    run_number: liveModeRun,
    dataset_name: liveModeDataset,
    folder_path: 'Summary',
    workspaces:  onlineWorkspace[0].workspaces[0].label,
  }
  const stringified = qs.stringify(parameters, {});

  Router.push({
    pathname: '',
    query: parameters,
  }, 
  // `${root_url_}/?${stringified}`
  );
};

export const LiveModeButton = () => {
  const liveModeDataset = '/Global/Online/ALL';
  const liveModeRun = '0';
  const { set_update } = useUpdateLiveMode();

  return (
    <LiveButton
      onClick={() => {
        liveModeHandler(liveModeRun, liveModeDataset);
        set_update(true);
      }}
    >
      <a>
        Live Mode
      </a>
    </LiveButton>
  );
};
