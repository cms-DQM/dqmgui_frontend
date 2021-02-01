import cleanDeep from 'clean-deep';
import Router from 'next/router';

export const navigationHandler = (
  search_by_run_number: string,
  search_by_dataset_name: string,
) => {
  const params = cleanDeep({
    search_run_number: search_by_run_number,
    search_dataset_name: search_by_dataset_name,
  })
  Router.push({
    pathname: '/',
    query: params,
  });
};


export const backToMainPage = (e: any) => {
  Router.push({
    pathname: '/',
  },
  )
};
