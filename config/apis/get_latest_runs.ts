export const get_the_latest_runs = (notOlderThan: number) => {
  return `/api/v1/latest_runs?notOlderThan=${notOlderThan}`;
}
