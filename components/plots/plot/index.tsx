import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import { store } from '../../../contexts/leftSideContext';
import {
  QueryProps,
  PlotDataProps,
  PlotsGroupedByLayoutsInterface,
} from '../../../containers/display/interfaces';
import { PlotsWithLayout } from './plotsWithLayout';
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
  const plots_grouped_by_layouts_checked = plots_grouped_by_layouts
    ? plots_grouped_by_layouts
    : {};
  const globalState = useContext(store);
  const router = useRouter();
  const query: QueryProps = router.query;
  const { imageRefScrollDown } = globalState;
  const folders = query.folder_path ? query.folder_path?.split('/') : [];
  const current_folder = folders[folders.length - 1];

  const { configuration } = React.useContext(store)
  const { functions_config } = configuration

  if (plots.length > 0) {
    return (
      <>
        {functions_config.layouts &&
        current_folder === 'Layouts' ? (
          <PlotsWithLayout
            plots_grouped_by_layouts={plots_grouped_by_layouts_checked}
            selected_plots={selected_plots}
            query={query}
            imageRefScrollDown={imageRefScrollDown}
            globalState={globalState}
          />
        ) : (
          <PlotsWithoutLayouts
            plots={plots}
            selected_plots={selected_plots}
            query={query}
            imageRefScrollDown={imageRefScrollDown}
            globalState={globalState}
          />
        )}
      </>
    );
  }
  return <></>;
};
