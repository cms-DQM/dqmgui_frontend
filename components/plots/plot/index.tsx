import React from 'react';
import { useRouter } from 'next/router';

import {
  QueryProps,
  PlotDataProps,
  PlotsGroupedByLayoutsInterface,
} from '../../../containers/display/interfaces';
import { PlotsWithLayout } from './plotsWithLayouts/plotsWithLayout';
import { PlotsWithoutLayouts } from './plotsWithoutLayouts';

interface LeftSidePlotsProps {
  plots: PlotDataProps[];
  selected_plots: any;
  plots_grouped_by_layouts?: PlotsGroupedByLayoutsInterface;
}

export const LeftSidePlots = ({
  plots,
  selected_plots,
  plots_grouped_by_layouts,
}: LeftSidePlotsProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;
    return (
      <>
          <PlotsWithLayout
            plots_grouped_by_layouts={plots_grouped_by_layouts}
            selected_plots={selected_plots}
            query={query}
          />
          <PlotsWithoutLayouts
            plots={plots}
            selected_plots={selected_plots}
            query={query}
          />
      </>
    );
};
