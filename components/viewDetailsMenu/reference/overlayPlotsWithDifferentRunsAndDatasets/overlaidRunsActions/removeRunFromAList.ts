import { QueryProps, TripleProps } from "../../../../../containers/display/interfaces";
import { changeRouter, getChangedQueryParams } from "../../../../../containers/display/utils";
import { addOverlayData } from "../../../../plots/plot/singlePlot/utils";

export const remove_runs_from_a_lst = (id: string) => async (triples: TripleProps[], setTriples: ((runs: TripleProps[]) => void), query: QueryProps) => {
  const copy = [...triples];
  const index = copy.findIndex((run) => {
    return run.id === id;
  });

  if (index !== -1) {
    copy.splice(index, 1);
    changeRouter(
      getChangedQueryParams(
        {
          overlay_data: `${addOverlayData(copy)}`,
        },
        query
      )
    );
    setTriples(copy);
  }
};