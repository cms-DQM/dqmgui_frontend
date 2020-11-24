import * as React from 'react';
import { Row } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import {
  PlotsGroupedByLayoutsInterface,
  PlotDataProps,
  QueryProps,
} from '../../../containers/display/interfaces';
import { FormatParamsForAPI, shrink_or_expand } from './singlePlot/utils';
import { OverlaidPlot } from './overlaidPlot';
import { Plot } from './singlePlot/plot';
import { isPlotSelected } from '../../../containers/display/utils';
import { CustomRow, CustomCol, CustomDiv } from '../../styledComponents';
import { theme } from '../../../styles/theme';

interface PlotsWithLayoutPorps {
  plots_grouped_by_layouts: PlotsGroupedByLayoutsInterface;
  selected_plots: any;
  query: QueryProps;
  imageRefScrollDown: any;
  globalState: any;
}

export const PlotsWithLayout = ({
  plots_grouped_by_layouts,
  selected_plots,
  globalState,
  imageRefScrollDown,
  query,
}: PlotsWithLayoutPorps) => {
  const [shrinkLayouts, setShrinkedLayouts] = React.useState<string[]>([]);
  const layouts_names = Object.keys(plots_grouped_by_layouts);

  return (
    <>
      {layouts_names.map((name: string) => {
        const plots = plots_grouped_by_layouts[name];
        return (
          <CustomRow
            width="100%"
            borderBottom={`1px solid ${theme.colors.common.black}`}
            borderTop={`1px solid ${theme.colors.common.black}`}
          >
            <CustomRow
              width="100%"
              display="flex"
              space="2"
              justifycontent="space-between"
              background={`${theme.colors.secondary.main}`}
              cursor="pointer"
              onClick={() => {
                setShrinkedLayouts(shrink_or_expand(name, shrinkLayouts));
              }}
            >
              {name !== 'default' ? (
                <CustomCol
                  width="100%"
                  display="flex"
                  alignitems="center"
                  texttransform="uppercase"
                  justifycontent="space-between"
                  color={`${theme.colors.common.white}`}
                >
                  <p>{name}</p>
                  <CustomDiv color={`${theme.colors.common.white}`}>
                    {shrinkLayouts.includes(name) ? (
                      <UpOutlined />
                    ) : (
                      <DownOutlined />
                    )}
                  </CustomDiv>
                </CustomCol>
              ) : (
                <CustomCol
                  width="100%"
                  texttransform="uppercase"
                  display="flex"
                  justifycontent="space-between"
                  alignitems="center"
                  color={`${theme.colors.common.white}`}
                >
                  <p>{name} (Plots without layout name)</p>
                  <CustomDiv color={`${theme.colors.common.white}`}>
                    {shrinkLayouts.includes(name) ? (
                      <UpOutlined />
                    ) : (
                      <DownOutlined />
                    )}
                  </CustomDiv>
                </CustomCol>
              )}
            </CustomRow>
            <Row>
              {!shrinkLayouts.includes(name) && (
                <CustomCol display="contents">
                  {plots.map((plot: PlotDataProps) => {
                    const params_for_api = FormatParamsForAPI(
                      globalState,
                      query,
                      encodeURI(plot.name),
                      plot.path
                    );
                    if (plot) {
                      return (
                        <div key={plot.name}>
                          {query.overlay_data ? (
                            <OverlaidPlot
                              key={plot.name}
                              plot={plot}
                              params_for_api={params_for_api}
                              imageRefScrollDown={imageRefScrollDown}
                              isPlotSelected={isPlotSelected(
                                selected_plots,
                                plot.name
                              )}
                            />
                          ) : (
                            <Plot
                              plot={plot}
                              imageRefScrollDown={imageRefScrollDown}
                              params_for_api={params_for_api}
                              key={plot.name}
                              isPlotSelected={isPlotSelected(
                                selected_plots,
                                plot.name
                              )}
                            />
                          )}
                        </div>
                      );
                    }
                    return <></>;
                  })}
                </CustomCol>
              )}
            </Row>
          </CustomRow>
        );
      })}
    </>
  );
};
