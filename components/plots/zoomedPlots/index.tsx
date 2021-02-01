import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  PlotDataProps,
  QueryProps,
} from '../../../containers/display/interfaces';

import { ZoomedPlots as ZoomedOverlaidPlots } from './zoomedOverlayPlots';
import { ZoomedPlots as ZoomedPlotsWithoutOverlay } from './zoomedPlots';
import { useRouter } from 'next/router';
import { store } from '../../../contexts/leftSideContext';

interface ZoomedPlotsProps {
  selected_plots: PlotDataProps[];
}

export const ZoomedPlots = ({ selected_plots }: ZoomedPlotsProps) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const globalState = useContext(store);
  const { setImageRefScrollDown } = globalState;

  const rightSideRef = useRef(null);
  useEffect(() => {
    setImageRefScrollDown(rightSideRef);
  }, []);

  const overlay_plot = query.overlay_data;
  return (
    <div
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      ref={rightSideRef}
    >
      {overlay_plot ? (
        <ZoomedOverlaidPlots selected_plots={selected_plots} />
      ) : (
        <ZoomedPlotsWithoutOverlay selected_plots={selected_plots} />
      )}
    </div>
  );
};
