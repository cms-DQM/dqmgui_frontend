import cleanDeep from 'clean-deep';
import Router from 'next/router';
import qs from 'qs';

import { root_url_ } from '../config/config';

export const navigationHandler = (
  search_by_run_number: string,
  search_by_dataset_name: string,
) => {
  const params = cleanDeep({
    search_run_number: search_by_run_number,
    search_dataset_name: search_by_dataset_name,
  })
  const queryString = qs.stringify(params, {});

  Router.push({
    pathname: '',
    query: params,
  },
    // `${root_url_}/?${queryString}`
    );
};


export const backToMainPage = (e: any) => {
  Router.push({
    pathname: '',
  },
    // `${root_url_}/`
  )
};
