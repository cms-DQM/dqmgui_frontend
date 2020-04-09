import React from 'react';

import { root_url } from '../../config/config';
import {
  get_plot_with_overlay,
  get_overlaied_plots_urls,
  get_plot_url
} from '../../config/config';
import { ParamsForApiProps, TripleProps } from './interfaces';
import { setSelectedPlotsName } from '../../reducers/displayFolderOrPlot';
import {
  StyledCol,
  PlotNameCol,
  StyledPlotRow,
  MenuCol,
} from './styledComponents';
import { DropdownMenu } from '../../components/menu';

interface OverlaidPlotProps {
  params_for_api: ParamsForApiProps;
  plot_name: string;
  addPlotToList(plot_name: string): void;
  dispatch: any;
}

export const OverlaidPlot = ({
  plot_name,
  params_for_api,
  addPlotToList,
  dispatch,
}: OverlaidPlotProps) => {

  params_for_api.plot_name = plot_name;
  const overlaid_plots_urls = get_overlaied_plots_urls(params_for_api);
  const joined_overlaid_plots_urls = overlaid_plots_urls.join('');
  params_for_api.joined_overlaied_plots_urls = joined_overlaid_plots_urls;

  let onsidePlotsURLs: string[] = []

  if (params_for_api.overlay === 'onSide') {
    let copy = { ...params_for_api }
    onsidePlotsURLs.push(get_plot_url(copy))
    copy.overlay_plot && copy.overlay_plot.map((plot: TripleProps) => {
      copy.dataset_name = plot.dataset_name as string
      copy.run_number = plot.run_number as number
      onsidePlotsURLs.push(get_plot_url(copy))
    })
  }
  const plot_with_overlay = get_plot_with_overlay(params_for_api);
  const source = `${root_url}/${plot_with_overlay}`;


  const dropdownParams: any[] = [
    {
      value: plot_name,
      label: 'Add to list',
      action: () => addPlotToList(plot_name),
    },
  ];

  return (
    <>
      {onsidePlotsURLs.length > 0 ?
        <>
          {
            onsidePlotsURLs.map((url: string) => {
              const sourceForOnePlot = `${root_url}/${url}`;
              return (
                <StyledCol>
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
        :
        <StyledCol>
          <StyledPlotRow
            minHeight={params_for_api.height}
            width={params_for_api.width}
          >
            <PlotNameCol>{plot_name}</PlotNameCol>
            <MenuCol>
              <DropdownMenu options={dropdownParams} />
            </MenuCol>
            <div onClick={() => setSelectedPlotsName([plot_name])(dispatch)}>
              <img alt={plot_name} src={source} />
            </div>
          </StyledPlotRow>
        </StyledCol>
      }

    </>
  );
};
