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
import Link from 'next/link';
import { removePlotFromSelectedPlots } from '../../plot/singlePlot/utils';

interface ZoomedJSROOTPlotsProps {
  selected_plot: PlotDataProps;
  params_for_api: ParamsForApiProps;
}

export const ZoomedJSROOTPlot = ({
  selected_plot,
  params_for_api,
}: ZoomedJSROOTPlotsProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const { data } = useRequest(get_jroot_plot(params_for_api), {}, [
    selected_plot.name,
  ]);

  useEffect(() => {
    //@ts-ignore
    JSROOT.draw(selected_plot.name, JSROOT.parse(JSON.stringify(data)), 'hist');
  }, [data]);

  return (
    <StyledCol space={2}>
      <StyledPlotRow
        minheight={params_for_api.height}
        width={params_for_api.width}
        is_plot_selected={true.toString()}
        nopointer={true.toString()}
      >
        <PlotNameCol>{selected_plot.name}</PlotNameCol>
        <Column>
          <Link
            href={{
              pathname: '/',
              query: {
                run_number: query.run_number,
                dataset_name: query.dataset_name,
                folder_path: query.folder_path,
                overlay: query.overlay,
                overlay_data: query.overlay_data,
                selected_plots: `${removePlotFromSelectedPlots(
                  query.selected_plots,
                  selected_plot
                )}`,
              },
            }}
          >
            <MinusIcon />
          </Link>
        </Column>
        <ImageDiv id={selected_plot.name} width={params_for_api.width} height={params_for_api.height} />
      </StyledPlotRow>
    </StyledCol>
  );
};
