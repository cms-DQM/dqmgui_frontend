import { ParamsForApiProps } from "../../../containers/display/interfaces";
import { get_folders_and_plots_new_api, get_folders_and_plots_new_api_with_live_mode, get_folders_and_plots_old_api } from "../get_folders_and_plots";
import { get_run_list_by_search_new_api, get_run_list_by_search_new_api_with_live_mode, get_run_list_by_search_old_api } from "../get_run_lits";

export const choose_api = (params: ParamsForApiProps) => {
  const current_api = !params.functions_config.new_back_end
    ? get_folders_and_plots_old_api(params)
    : params.mode === 'ONLINE'
      ? get_folders_and_plots_new_api_with_live_mode(params)
      : get_folders_and_plots_new_api(params);
  return current_api;
};

export const choose_api_for_run_search = (params: ParamsForApiProps) => {
  const current_api = params.functions_config && !params.functions_config.new_back_end
    ? get_run_list_by_search_old_api(params)
    : params.functions_config && params.functions_config.mode === 'ONLINE'
      ? get_run_list_by_search_new_api_with_live_mode(params)
      : get_run_list_by_search_new_api(params);

  return current_api;
};
