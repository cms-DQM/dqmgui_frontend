import React, { createContext, useState, ReactElement } from 'react';

import {
  sizes,
  viewPositions,
  plotsProportionsOptions,
} from '../components/constants';
import {
  SizeProps,
  PlotProps,
  TripleProps,
  CustomizeProps,
} from '../containers/display/interfaces';
import { overlayOptions } from '../components/constants';

export interface LeftSideStateProviderProps {
  children: ReactElement;
}

export interface LeftSideState {
  size: SizeProps;
  normalize: boolean;
  stats: boolean;
  overlayPosition: string;
  overlay: PlotProps[];
  triples: TripleProps[];
  overlayPlots: TripleProps[];
  workspaceFolders: string[];
  openOverlayDataMenu: boolean;
  viewPlotsPosition: boolean;
  lumisection: string | number;
  rightSideSize: SizeProps;
  JSROOTmode: boolean;
  customizeProps: CustomizeProps;
  updated_by_not_older_than: number;
}

export const initialState: any = {
  size: sizes.medium.size,
  normalize: 'True',
  stats: true,
  overlayPosition: overlayOptions[0].value,
  overlay: undefined,
  overlayPlots: [],
  triples: [],
  openOverlayDataMenu: false,
  viewPlotsPosition: viewPositions[1].value,
  proportion: plotsProportionsOptions[0].value,
  lumisection: -1,
  rightSideSize: sizes.fill.size,
  JSROOTmode: false,
  shortcuts: [],
  customizeProps: {
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
  workspace: 'Everything',
  updated_by_not_older_than: Math.round(new Date().getTime() / 10000) * 10,
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
  const [plotsWhichAreOverlaid, setPlotsWhichAreOverlaid] = useState({});
  const [overlayPosition, setOverlaiPosition] = useState(
    initialState.overlayPosition
  );
  const [overlayPlots, setOverlay] = useState(initialState.overlayPlots);
  const [imageRefScrollDown, setImageRefScrollDown] = useState(null);
  const [plotSearchFolders, setPlotSearchFolders] = React.useState([]);
  const [workspace, setWorkspace] = React.useState(initialState.workspace);
  const [triples, setTriples] = React.useState(initialState.triples);
  const [openOverlayDataMenu, toggleOverlayDataMenu] = React.useState(
    initialState.openOverlayDataMenu
  );
  const [viewPlotsPosition, setViewPlotsPosition] = React.useState(
    initialState.viewPlotsPosition
  );
  const [proportion, setProportion] = React.useState(initialState.proportion);
  const [lumisection, setLumisection] = React.useState(
    initialState.lumisection
  );

  const [rightSideSize, setRightSideSize] = useState<number>(
    initialState.rightSideSize
  );
  const [JSROOTmode, setJSROOTmode] = useState<boolean>(false);
  const [customize, setCustomize] = useState<CustomizeProps>({
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
  });

  const [runs_set_for_overlay, set_runs_set_for_overlay] = React.useState<
    TripleProps[]
  >(triples ? triples : []);
  const [update, set_update] = useState<boolean>(false);

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

  const [updated_by_not_older_than, set_updated_by_not_older_than] = useState(
    initialState.updated_by_not_older_than
  );

  return (
    <Provider
      value={{
        size,
        setSize,
        normalize,
        setNormalize,
        stats,
        setStats,
        plotsWhichAreOverlaid,
        setPlotsWhichAreOverlaid,
        overlayPosition,
        setOverlaiPosition,
        overlayPlots,
        setOverlay,
        imageRefScrollDown,
        setImageRefScrollDown,
        workspace, setWorkspace,
        plotSearchFolders,
        setPlotSearchFolders,
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
        set_runs_set_for_overlay,
        updated_by_not_older_than,
        set_updated_by_not_older_than,
        update,
        set_update,
      }}
    >
      {children}
    </Provider>
  );
};

export { store, LeftSideStateProvider };
