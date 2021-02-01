import { QueryProps, TripleProps } from "../../../../containers/display/interfaces";
import { changeRouter, getChangedQueryParams } from "../../../../containers/display/utils";
import { addOverlayData } from "../../../plots/plot/singlePlot/utils";

export const change_run_details =  (runs: TripleProps[]) => async(setTriples: ((run: TripleProps[])=> void), query: QueryProps) => {
    await changeRouter(
      getChangedQueryParams(
        {
          overlay_data: `${addOverlayData(runs)}`,
        },
        query
      )
    );
    setTriples(runs);
  };

