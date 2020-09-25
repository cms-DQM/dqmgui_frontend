import { LumisectionRequestProps } from "../../containers/display/interfaces";

export const getLumisections = (params: LumisectionRequestProps) =>
  `/api/v1/samples?run=${params.run_number}&dataset=${params.dataset_name
  }&lumi=${params.lumi}${params.functions_config.mode === 'ONLINE' && params.notOlderThan
    ? `&notOlderThan=${params.notOlderThan}`
    : ''
  }`;

