import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { functions_config } from '../../../../config/config';
import { get_jroot_plot } from '../../../../api/oldApi';
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
import { useBlink } from '../../../../hooks/useBlink';
import { store } from '../../../../contexts/updateContext';

interface ZoomedJSROOTPlotsProps {
  selected_plot: PlotDataProps;
  params_for_api: ParamsForApiProps;
  id: string;
}

const drawJSROOT = async (id: string, data: any) => {
  //in order to get new JSROOT plot, first of all we need to clean div with old plot
  if (!!document.getElementById(id)) {
    const cleanUpPreviousJSROOTPlot = () => {
      //@ts-ignore
      if (JSROOT.cleanup) {
        //@ts-ignore
        JSROOT.cleanup(id);
      }
    }
    //after cleanup we can draw a new plot
    await cleanUpPreviousJSROOTPlot
    //@ts-ignore
    JSROOT.draw(id, JSROOT.parse(JSON.stringify(data)), 'hist');
  }
};

export const ZoomedJSROOTPlot = ({
  selected_plot,
  params_for_api,
  id,
}: ZoomedJSROOTPlotsProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  // const id = makeid()
  const { data } = useRequest(get_jroot_plot(params_for_api), {}, [
    selected_plot.name,
    params_for_api.lumi,
  ]);

  const { not_older_than } = React.useContext(store)
  const { blink } = useBlink(not_older_than);

  useEffect(() => {
    if (!!document.getElementById(`${id}`)) {
      //@ts-ignore
      drawJSROOT(`${id}`, data);
    }
  }, [data, params_for_api.lumi, not_older_than]);

  return (
    <StyledCol space={2}>
      <StyledPlotRow
        isLoading={blink.toString()}
        animation={(functions_config.mode === 'ONLINE').toString()}
        minheight={params_for_api.height}
        width={params_for_api.width?.toString()}
        is_plot_selected={true.toString()}
        nopointer={true.toString()}
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
          id={`${id}`}
          width={params_for_api.width}
          height={params_for_api.height}
        />
      </StyledPlotRow>
    </StyledCol>
  );
};
