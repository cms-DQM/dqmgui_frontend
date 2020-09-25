import { ParamsForApiProps } from "../../containers/display/interfaces";
import { getRunsWithLumisections } from "../utils";

export const get_folders_and_plots_old_api = (params: ParamsForApiProps) => {
  if (params.plot_search) {
    return `/data/json/archive/${params.run_number}${params.dataset_name}/${params.folders_path}?search=${params.plot_search}`;
  }
  return `/data/json/archive/${params.run_number}${params.dataset_name}/${params.folders_path}`;
};

export const get_folders_and_plots_new_api = (params: ParamsForApiProps) => {
  if (params.plot_search) {
    return `/api/v1/archive/${getRunsWithLumisections(params)}${params.dataset_name
      }/${params.folders_path}?search=${params.plot_search}`;
  }
  return `/api/v1/archive/${getRunsWithLumisections(params)}${params.dataset_name
    }/${params.folders_path}`;
};

export const get_folders_and_plots_new_api_with_live_mode = (
  params: ParamsForApiProps
) => {
  if (params.plot_search) {
    return `/api/v1/archive/${getRunsWithLumisections(params)}${params.dataset_name
      }/${params.folders_path}?search=${params.plot_search}&notOlderThan=${params.notOlderThan
      }`;
  }
  return `/api/v1/archive/${getRunsWithLumisections(params)}${params.dataset_name
    }/${params.folders_path}?notOlderThan=${params.notOlderThan}`;
};
