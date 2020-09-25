export const get_runs_by_search = (data: any, new_back_end: boolean) => {
  if (new_back_end) {
    return data && data.data;
  } else if (data) {
    const { samples: results }: { samples: any[] } = data;
    const parsed_results = results
      ? results.reduce((prev, { items }) => [...prev, ...items], [])
      : [];
    return parsed_results;
  }
};
