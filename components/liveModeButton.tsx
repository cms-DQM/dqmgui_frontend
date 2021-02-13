import * as React from 'react';

import { LiveButton } from './styledComponents';
import Router from 'next/router';
import { useUpdateLiveMode } from '../hooks/useUpdateInLiveMode';
import { root_url_ } from '../config/config';
import Link from 'next/link';

const liveModeHandler = (liveModeRun: string, liveModeDataset: string) => {
  Router.push({
    pathname: root_url_,
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
  const { set_update } = useUpdateLiveMode();

  return (
    <Link href="/" as="dqm/new">
    <LiveButton
      onClick={() => {
        // liveModeHandler(liveModeRun, liveModeDataset);
        set_update(true);
      }}
    >
      <a>
      Live Mode
      </a>
    </LiveButton>
    </Link>
  );
};
