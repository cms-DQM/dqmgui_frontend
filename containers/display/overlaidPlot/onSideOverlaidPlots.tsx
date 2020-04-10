import React from 'react';

import { root_url, get_plot_url } from '../../../config/config';
import { ParamsForApiProps, OptionProps, TripleProps } from '../interfaces';
import { setSelectedPlotsName } from '../../../reducers/displayFolderOrPlot';
import {
  StyledCol,
  PlotNameCol,
  StyledPlotRow,
  MenuCol,
} from '../styledComponents';
import { DropdownMenu } from '../../../components/menu';

interface OnSideOverlaidPlotsProps {
  params_for_api: ParamsForApiProps;
  plot_name: string;
  dropdownParams: OptionProps[];
  dispatch: any;
}

export const OnSideOverlaidPlots = ({
  plot_name,
  params_for_api,
  dropdownParams,
  dispatch,
}: OnSideOverlaidPlotsProps) => {

  params_for_api.plot_name = plot_name;
  const onsidePlotsURLs = []
  let copy = { ...params_for_api }
  onsidePlotsURLs.push(get_plot_url(copy))
  copy.overlay_plot && copy.overlay_plot.map((plot: TripleProps) => {
    copy.dataset_name = plot.dataset_name ? plot.dataset_name as string : params_for_api.dataset_name
    copy.run_number = plot.run_number as number
    onsidePlotsURLs.push(get_plot_url(copy))
  })
console.log(copy.dataset_name)
  return (
    <>
      {
        onsidePlotsURLs.map((url: string) => {
          const sourceForOnePlot = `${root_url}/${url}`;
          return (
            <StyledCol key={url}>
              <StyledPlotRow
                minHeight={params_for_api.height}
                width={params_for_api.width}
              >
                <PlotNameCol>{plot_name}</PlotNameCol>
                <MenuCol>
                  <DropdownMenu options={dropdownParams} />
                </MenuCol>
                <div onClick={() => setSelectedPlotsName([plot_name])(dispatch)}>
                  <img alt={plot_name} src={sourceForOnePlot} />
                </div>
              </StyledPlotRow>
            </StyledCol>
          )
        })
      }
    </>
  );
};
