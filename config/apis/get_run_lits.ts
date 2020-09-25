import { ParamsForApiProps } from "../../containers/display/interfaces";

export const get_run_list_by_search_old_api = (params: ParamsForApiProps) => {
  return `/data/json/samples?match=${params.dataset_name}&run=${params.run_number}`;
};
export const get_run_list_by_search_new_api = (params: ParamsForApiProps) => {
  return `/api/v1/samples?run=${params.run_number}&lumi=${params.lumi}&dataset=${params.dataset_name}`;
};

export const get_run_list_by_search_new_api_with_live_mode = (
  params: ParamsForApiProps
) => {
  return `/api/v1/samples?run=${params.run_number}&lumi=${params.lumi}&dataset=${params.dataset_name}&notOlderThan=${params.notOlderThan}`;
};
