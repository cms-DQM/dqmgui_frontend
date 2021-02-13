import qs from 'qs';

import { QueryProps } from '../../containers/display/interfaces';
import Router from 'next/router';
import { root_url_ } from '../../config/config';

export const setWorkspaceToQuery = (query: QueryProps, workspace: string) => {
  return Router.push({
    pathname: root_url_,
    query: {
      run_number: query.run_number,
      dataset_name: query.dataset_name,
      workspaces: workspace,
    },
  });
};

export const removeFirstSlash = (path: string) => {
  const firstChar = path.substring(0, 1);
  if (firstChar === '/') {
    return path.substring(1, path.length);
  } else {
    return path;
  }
};
