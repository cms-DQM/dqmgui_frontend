import * as React from 'react';

import {
  PlotsGroupedByLayoutsInterface,
  QueryProps,
} from '../../../../containers/display/interfaces';
import { OnePlotInLayout } from './oneLayout';

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
  const layouts_names = Object.keys(plots_grouped_by_layouts);
  return (
    <>
      {layouts_names.map((name: string) => {
        const plots = plots_grouped_by_layouts[name];
        return (
          <OnePlotInLayout
            layoutName={name}
            plots={plots}
            selected_plots={selected_plots}
            imageRefScrollDown={imageRefScrollDown}
            query={query}
            globalState={globalState}
          />
        );
      })}
    </>
  );
};
