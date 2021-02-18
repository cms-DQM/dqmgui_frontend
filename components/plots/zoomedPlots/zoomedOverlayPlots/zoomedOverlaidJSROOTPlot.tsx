import React from 'react';
import cleanDeep from 'clean-deep';
import { useRouter } from 'next/router';

import { functions_config } from '../../../../config/config';
import { get_jroot_plot } from '../../../../api/oldApi';
import {
  ParamsForApiProps,
  TripleProps,
  PlotDataProps,
  QueryProps,
} from '../../../../containers/display/interfaces';
import { useRequest } from '../../../../hooks/useRequest';
import { useEffect } from 'react';
import {
  StyledCol,
  Column,
  StyledPlotRow,
  PlotNameCol,
  MinusIcon,
  ImageDiv,
} from '../../../../containers/display/styledComponents';
import {
  removePlotFromRightSide,
  get_plot_error,
} from '../../plot/singlePlot/utils';
import { Button } from 'antd';
import { useBlink } from '../../../../hooks/useBlink';
import { store } from '../../../../contexts/leftSideContext';

interface ZoomedJSROOTPlotsProps {
  selected_plot: PlotDataProps;
  params_for_api: ParamsForApiProps;
  id: string;
}
const drawJSROOT = async (
  histogramParam: string,
  id: string,
  overlaidJSROOTPlot: any
) => {
  //@ts-ignore
  await JSROOT.cleanup(`${histogramParam}${id}`);
  //@ts-ignore
  JSROOT.draw(
    `${histogramParam}${id}`,
    //@ts-ignore
    JSROOT.parse(JSON.stringify(overlaidJSROOTPlot)),
    `${histogramParam}`
  );
};

export const ZoomedOverlaidJSROOTPlot = ({
  selected_plot,
  params_for_api,
  id,
}: ZoomedJSROOTPlotsProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const { data } = useRequest(get_jroot_plot(params_for_api), {}, [
    selected_plot.name,
  ]);

  const overlaid_plots_runs_and_datasets: any[] = params_for_api?.overlay_plot
    ? params_for_api.overlay_plot.map((plot: TripleProps) => {
        const copy: any = { ...params_for_api };

        if (plot.dataset_name) {
          copy.dataset_name = plot.dataset_name;
        }
        copy.run_number = plot.run_number;
        const { data } = useRequest(get_jroot_plot(copy), {}, [
          selected_plot.name,
          query.lumi,
        ]);
        return data;
      })
    : [];

  overlaid_plots_runs_and_datasets.push(data);

  let overlaidJSROOTPlot: any = {};

  //checking how many histograms are overlaid, because just separated objects
  // (i.e separate variables ) to JSROOT.CreateTHStack() func
  if (overlaid_plots_runs_and_datasets.length === 0) {
    return null;
  } else if (overlaid_plots_runs_and_datasets.length === 1) {
    const histogram1 = overlaid_plots_runs_and_datasets[0];
    //@ts-ignore
    overlaidJSROOTPlot = JSROOT.CreateTHStack(histogram1);
  } else if (overlaid_plots_runs_and_datasets.length === 2) {
    const histogram1 = overlaid_plots_runs_and_datasets[0];
    const histogram2 = overlaid_plots_runs_and_datasets[1];
    //@ts-ignore
    overlaidJSROOTPlot = JSROOT.CreateTHStack(histogram1, histogram2);
  } else if (overlaid_plots_runs_and_datasets.length === 3) {
    const histogram1 = overlaid_plots_runs_and_datasets[0];
    const histogram2 = overlaid_plots_runs_and_datasets[1];
    const histogram3 = overlaid_plots_runs_and_datasets[2];
    //@ts-ignore
    overlaidJSROOTPlot = JSROOT.CreateTHStack(
      histogram1,
      histogram2,
      histogram3
    );
  } else if (overlaid_plots_runs_and_datasets.length === 4) {
    const histogram1 = overlaid_plots_runs_and_datasets[0];
    const histogram2 = overlaid_plots_runs_and_datasets[1];
    const histogram3 = overlaid_plots_runs_and_datasets[2];
    const histogram4 = overlaid_plots_runs_and_datasets[3];
    //@ts-ignore
    overlaidJSROOTPlot = JSROOT.CreateTHStack(
      histogram1,
      histogram2,
      histogram3,
      histogram4
    );
  }
  const { notOlderThan } = React.useContext(store)
  const { blink } = useBlink(notOlderThan);
  
  const histogramParam = params_for_api.normalize ? 'hist' : 'nostack';
  //make sure that no null histograms are passed to draw func.
  //on first, second reneder overlaidJSROOTPlot.fHists.arr is [null, null]
  //@ts-ignore
  useEffect(() => {
    if (
      cleanDeep(overlaidJSROOTPlot.fHists.arr).length ===
      overlaidJSROOTPlot.fHists.arr.length
    ) {
      drawJSROOT(histogramParam, id, overlaidJSROOTPlot);
    }
  }, [
    notOlderThan,
    data,
    params_for_api.lumi,
    params_for_api.overlay_plot,
    params_for_api.dataset_name,
    params_for_api.run_number,
    params_for_api.normalize,
    overlaidJSROOTPlot.fHists.arr
  ]);
  return (
    <StyledCol space={2}>
      <StyledPlotRow
        isLoading={blink.toString()}
        animation={(functions_config.mode === 'ONLINE').toString()}
        minheight={params_for_api.height}
        width={params_for_api.width?.toString()}
        is_plot_selected={true.toString()}
        nopointer={true.toString()}
        justifycontent="center"
      >
        <PlotNameCol error={get_plot_error(selected_plot).toString()}>
          {selected_plot.name}
        </PlotNameCol>
        <Column>
          <Button
            type="link"
            onClick={() => removePlotFromRightSide(query, selected_plot)}
            icon={<MinusIcon />}
          />
        </Column>
        <ImageDiv
          style={{ display: params_for_api.normalize ? '' : 'none' }}
          id={`hist${id}`}
          width={params_for_api.width}
          height={params_for_api.height}
        />
        <ImageDiv
          style={{ display: params_for_api.normalize ? 'none' : '' }}
          id={`nostack${id}`}
          width={params_for_api.width}
          height={params_for_api.height}
        />
      </StyledPlotRow>
    </StyledCol>
  );
};
