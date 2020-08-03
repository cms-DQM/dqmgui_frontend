import { functions_config } from '../config/config';

export const get_runs_by_search = (data: any) => {
  if (functions_config.new_back_end.new_back_end) {
    return data && data.data;
  } else if (data) {
    const { samples: results }: { samples: any[] } = data;
    const parsed_results = results
      ? results.reduce((prev, { items }) => [...prev, ...items], [])
      : [];
    return parsed_results;
  }
};
