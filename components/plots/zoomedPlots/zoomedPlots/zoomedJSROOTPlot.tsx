import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  ParamsForApiProps,
  PlotDataProps,
  QueryProps,
} from '../../../../containers/display/interfaces';
import { useRequest } from '../../../../hooks/useRequest';
import {
  StyledCol,
  StyledPlotRow,
  PlotNameCol,
  MinusIcon,
  Column,
  ImageDiv,
} from '../../../../containers/display/styledComponents';
import {
  removePlotFromRightSide,
  get_plot_error,
} from '../../plot/singlePlot/utils';
import { Button } from 'antd';
import { store } from '../../../../contexts/leftSideContext';
import { useBlinkOnUpdate } from '../../../../hooks/useBlinkOnUpdate';
import { get_jroot_plot } from '../../../../config/apis/get_plots_urls';

interface ZoomedJSROOTPlotsProps {
  selected_plot: PlotDataProps;
  params_for_api: ParamsForApiProps;
}

const drawJSROOT = async (plot_name: string, data: any) => {
  //in order to get new JSROOT plot, first of all we need to clean div with old plot
  //@ts-ignore
  await JSROOT.cleanup(`${plot_name}`);
  //after cleanup we can draw a new plot
  //@ts-ignore
  JSROOT.draw(`${plot_name}`, JSROOT.parse(JSON.stringify(data)), 'hist');
};

export const ZoomedJSROOTPlot = ({
  selected_plot,
  params_for_api,
}: ZoomedJSROOTPlotsProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const { configuration } = React.useContext(store);
  const { mode, functions_config } = configuration
  const { new_back_end } = functions_config
  params_for_api.functions_config=functions_config
  const { data } = useRequest(get_jroot_plot(params_for_api), {}, [
    selected_plot.name,
    params_for_api.lumi,
  ]);

  const { updated_by_not_older_than } = React.useContext(store);

  useEffect(() => {
    if (!!document.getElementById(selected_plot.name)) {
      //@ts-ignore
      drawJSROOT(selected_plot.name, data);
    }
  }, [data, params_for_api.lumi, updated_by_not_older_than]);

  const { blink } = useBlinkOnUpdate();

  return (
    <StyledCol space={2}>
      <StyledPlotRow
        isLoading={blink.toString()}
        animation={(mode === 'ONLINE').toString()}
        minheight={params_for_api.height}
        width={params_for_api.width?.toString()}
        is_plot_selected={true.toString()}
        nopointer={true.toString()}
      >
        <PlotNameCol error={get_plot_error(selected_plot, new_back_end).toString()}>
          {selected_plot.displayedName}
        </PlotNameCol>
        <Column>
          <Button
            type="link"
            onClick={() => removePlotFromRightSide(query, selected_plot)}
            icon={<MinusIcon />}
          />
        </Column>
        <ImageDiv
          id={selected_plot.name}
          width={params_for_api.width}
          height={params_for_api.height}
        />
      </StyledPlotRow>
    </StyledCol>
  );
};
