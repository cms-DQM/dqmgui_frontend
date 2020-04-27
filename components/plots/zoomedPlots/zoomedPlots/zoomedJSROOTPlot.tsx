import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { get_jroot_plot } from '../../../../config/config';
import {
  ParamsForApiProps,
  SizeProps,
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
  size: SizeProps;
}

export const ZoomedJSROOTPlot = ({
  selected_plot,
  params_for_api,
  size,
}: ZoomedJSROOTPlotsProps) => {
  params_for_api.plot_name = selected_plot.name;
  params_for_api.folders_path = selected_plot.dir;

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
    <StyledCol>
      <StyledPlotRow
        minHeight={size.h}
        width={size.w}
        isPlotSelected={true}
        noPointer={true}
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
        <ImageDiv id={selected_plot.name} width={size.w} height={size.h} />
      </StyledPlotRow>
    </StyledCol>
  );
};
