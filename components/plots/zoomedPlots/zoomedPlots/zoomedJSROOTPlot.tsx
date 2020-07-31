import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { get_jroot_plot } from '../../../../config/config';
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
import { removePlotFromRightSide } from '../../plot/singlePlot/utils';
import { Button } from 'antd';
import { store } from '../../../../contexts/leftSideContext';

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

  const { data } = useRequest(get_jroot_plot(params_for_api), {}, [
    selected_plot.name,
    params_for_api.lumi,
  ]);

  useEffect(() => {
    if (!!document.getElementById(selected_plot.name)) {
      //@ts-ignore
      drawJSROOT(selected_plot.name, data);
    }
  }, [data, params_for_api.lumi]);

  const { isDataLoading } = React.useContext(store);

  const [blink, set_blink] = React.useState(isDataLoading)
  React.useEffect(() => {
    //timeouts in order to get longer and more visible animation
    setTimeout(() => { set_blink(true) }, 0)
    setTimeout(() => { set_blink(false) }, 2000)
  }, [isDataLoading])

  return (
    <StyledCol space={2}>
      <StyledPlotRow
        isLoading={blink.toString()}
        minheight={params_for_api.height}
        width={params_for_api.width?.toString()}
        is_plot_selected={true.toString()}
        nopointer={true.toString()}
      >
        <PlotNameCol>{selected_plot.name}</PlotNameCol>
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
