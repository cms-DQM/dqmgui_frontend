import * as React from 'react';
import qs from 'qs';

import { LiveButton } from './styledComponents';
import Router from 'next/router';
import { workspaces as onlineWorkspace } from '../workspaces/online';
import { root_url_ } from '../config/config';

const liveModeHandler = (liveModeRun: string, liveModeDataset: string) => {
  const parameters = {
    run_number: liveModeRun,
    dataset_name: liveModeDataset,
    folder_path: 'Summary',
    workspaces: onlineWorkspace[0].workspaces[0].label,
  }
  const stringified = qs.stringify(parameters, {});
  const url_which_is_visible = root_url_ !== '/' ? `${root_url_}/?${stringified}` : undefined

  Router.push({
    pathname: '',
    query: parameters,
  },
    url_which_is_visible
  );
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
      <a>
        Live Mode
      </a>
    </LiveButton>
  );
};
