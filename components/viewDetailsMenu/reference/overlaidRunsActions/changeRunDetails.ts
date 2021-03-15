import { QueryProps, TripleProps } from "../../../../containers/display/interfaces";
import { changeRouter, getChangedQueryParams } from "../../../../containers/display/utils";
import { addOverlayData } from "../../../plots/plot/singlePlot/utils";

export const change_run_details = (runs: TripleProps[]) => async (setTriples: ((run: TripleProps[]) => void), query: QueryProps) => {
const only_checked_runs = runs.filter((run) => run.checked)
  await changeRouter(
    getChangedQueryParams(
      {
        overlay_data: `${addOverlayData(only_checked_runs)}`,
      },
      query
    )
  );
  setTriples(runs);
};

