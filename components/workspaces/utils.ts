import qs from 'qs';

import { QueryProps } from '../../containers/display/interfaces';
import Router from 'next/router';
import { root_url_ } from '../../config/config';

export const setWorkspaceToQuery = (query: QueryProps, workspace: string, folder_path?: string) => {
  const parameters = {
    run_number: query.run_number,
    dataset_name: query.dataset_name,
    workspaces: workspace,
    folder_path: folder_path
  }
  const stringified = qs.stringify(parameters, {});
  const url_which_is_visible = root_url_ !== '/' ? `${root_url_}?${stringified}` : undefined

  return Router.push({
    pathname: '',
    query: parameters,
  },
    url_which_is_visible
  );
};

export const removeFirstSlash = (path: string) => {
  const firstChar = path.substring(0, 1);
  if (firstChar === '/') {
    return path.substring(1, path.length);
  } else {
    return path;
  }
};
