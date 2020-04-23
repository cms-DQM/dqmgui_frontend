import Router from 'next/router';

interface queryI {
  run_number?: number;
  dataset_name?: string;
  search_run_number?: number;
  search_dataset_name?: string;
  folder_path?: string;
}

// This is a validator method for the query that is parsed from the URL
// We want to display erros such as someone passing a non-numeric run_number like: 333f33 and display errors accordingly.
// This return an array of error messages for the user to see what the query parameters are wrong
export function useValidateQuery(
  query: any
): { query: queryI; validation_errors: string[] } {
  const {
    run_number,
    dataset_name,
    search_run_number,
    search_dataset_name,
    folder_path,
  } = query;
  const validation_errors = [];

  const user_is_searching = search_run_number || search_dataset_name;
  const user_is_linking_to_a_specific_path =
    run_number || dataset_name || folder_path;

  if (user_is_searching && user_is_linking_to_a_specific_path) {
    // A user cannot be linking to a search and to a plot reference at the same time
    validation_errors.push(
      'You are passing a (search_run_number or a search_dataset_name) and a (run_number or a dataset_name or a folder_path) in the URL, you can either search or link to existing path'
    );
  }
  if (run_number && isNaN(run_number)) {
    validation_errors.push('Run number is not a number');
  }

  if (search_run_number && isNaN(search_run_number)) {
    validation_errors.push(
      'Search run number (search_run_number) is not a number'
    );
  }

  // If user provided a run_number but no dataset_name (or the other way around, we assume he is searching for it):
  if (run_number && typeof dataset_name === 'undefined') {
    Router.replace({
      pathname: '/',
      query: {
        search_run_number: run_number,
        search_dataset_name: '',
      },
    });
  }
  if (dataset_name && typeof run_number === 'undefined') {
    Router.replace({
      pathname: '/',
      query: {
        search_dataset_name: dataset_name,
        search_run_number: '',
      },
    });
  }

  return { query, validation_errors };
}
