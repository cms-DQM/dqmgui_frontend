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
}

export const PlotsWithLayout = ({
  plots_grouped_by_layouts,
  selected_plots,
  query,
}: PlotsWithLayoutPorps) => {
  const layouts_names = Object.keys(plots_grouped_by_layouts).sort();
  return (
    <>
      {layouts_names.map((name: string) => {
        const plots = plots_grouped_by_layouts[name]
        const sorted_plots = plots.sort((a, b) => {
          return a.path.localeCompare(b.path);
        })
        return (
          <OnePlotInLayout
            layoutName={name}
            plots={sorted_plots}
            selected_plots={selected_plots}
            query={query}
          />
        );
      })}
    </>
  );
};
