import React, { createContext, useState, ReactElement } from 'react';

import {
  sizes,
  viewPositions,
  plotsProportionsOptions,
} from '../components/constants';
import {
  TripleProps,
  CustomizeProps,
} from '../containers/display/interfaces';
import { overlayOptions } from '../components/constants';

export interface LeftSideStateProviderProps {
  children: ReactElement;
}


export const initialState: any = {
  size: sizes.medium.size,
  normalize: true,
  stats: true,
  overlayPosition: overlayOptions[0].value,
  imageRefScrollDown: null,
  workspace: 'Everything',
  triples: [],
  openOverlayDataMenu: false,
  viewPlotsPosition: viewPositions[1].value,
  proportion: plotsProportionsOptions[0].value,
  lumisection: -1,
  rightSideSize: sizes.fill.size,
  JSROOTmode: false,
  customize: {
    xtype: '',
    xmin: NaN,
    xmax: NaN,
    ytype: '',
    ymin: NaN,
    ymax: NaN,
    ztype: '',
    zmin: NaN,
    zmax: NaN,
    drawopts: '',
    withref: '',
  },
  runs_set_for_overlay: []
};

export interface ActionProps {
  type: string;
  payload: any;
}

const store = createContext(initialState);
const { Provider } = store;

const LeftSideStateProvider = ({ children }: LeftSideStateProviderProps) => {
  const [size, setSize] = useState<number>(initialState.size);
  const [normalize, setNormalize] = useState<boolean>(initialState.normalize);
  const [stats, setStats] = useState<boolean>(initialState.stats);
  const [overlayPosition, setOverlaiPosition] = useState(initialState.overlayPosition);
  const [imageRefScrollDown, setImageRefScrollDown] = useState(initialState.imageRefScrollDown);
  const [workspace, setWorkspace] = React.useState(initialState.workspace);
  const [triples, setTriples] = React.useState(initialState.triples);
  const [openOverlayDataMenu, toggleOverlayDataMenu] = React.useState(initialState.openOverlayDataMenu);
  const [viewPlotsPosition, setViewPlotsPosition] = React.useState(initialState.viewPlotsPosition);
  const [proportion, setProportion] = React.useState(initialState.proportion);
  const [lumisection, setLumisection] = React.useState(initialState.lumisection);
  const [rightSideSize, setRightSideSize] = useState<number>(initialState.rightSideSize);
  const [JSROOTmode, setJSROOTmode] = useState<boolean>(initialState.JSROOTmode);
  const [customize, setCustomize] = useState<CustomizeProps>(initialState.customize);
  const [runs_set_for_overlay, set_runs_set_for_overlay] = React.useState(initialState.runs_set_for_overlay)

  const change_value_in_reference_table = (
    value: string | number,
    key: string,
    id: string | number | boolean
  ) => {
    const copy = [...triples];
    //triples are those runs which are already overlaid.
    //runs_set_for_overlay are runs which are sekected for overlay,
    //but not overlaid yet.
    let current_line: TripleProps = triples.filter(
      (line: TripleProps) => line.id === id
    )[0];
    if (!current_line) {
      current_line = runs_set_for_overlay.filter(
        (line: TripleProps) => line.id === id
      )[0];
    }

    const index_of_line: number = copy.indexOf(current_line);
    current_line[key] = value;
    copy[index_of_line] = current_line;
    setTriples(copy);
  };

  return (
    <Provider
      value={{
        size,
        setSize,
        normalize,
        setNormalize,
        stats,
        setStats,
        overlayPosition,
        setOverlaiPosition,
        imageRefScrollDown,
        setImageRefScrollDown,
        workspace, setWorkspace,
        change_value_in_reference_table,
        triples,
        setTriples,
        openOverlayDataMenu,
        toggleOverlayDataMenu,
        viewPlotsPosition,
        setViewPlotsPosition,
        proportion,
        setProportion,
        lumisection,
        setLumisection,
        rightSideSize,
        setRightSideSize,
        JSROOTmode,
        setJSROOTmode,
        customize,
        setCustomize,
        runs_set_for_overlay,
        set_runs_set_for_overlay
      }}
    >
      {children}
    </Provider>
  );
};

export { store, LeftSideStateProvider };
