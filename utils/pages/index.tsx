import Router from 'next/router';

export const navigationHandler = (
  search_by_run_number: string,
  search_by_dataset_name: string
) => {
  Router.replace({
    query: {
      search_run_number: search_by_run_number,
      search_dataset_name: search_by_dataset_name,
    },
  });
};

export const backToMainPage = () => {
  Router.replace({
    query: {
      search_run_number: '',
      search_dataset_name: '',
    },
  });
};
