import React, { createContext, useState, ReactElement } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { sizes, searchOptions, viewPositions, plotsProportionsOptions } from '../components/constants';
import {
  SizeProps,
  PlotProps,
  TripleProps,
} from '../containers/display/interfaces';
import { overlayOptions } from '../components/constants';

export interface LeftSideStateProviderProps {
  children: ReactElement;
}
const id = uuidv4();

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
  searchOption: boolean;
  viewPlotsPosition: boolean;
}

export const initialState: any = {
  size: sizes.medium.size,
  normalize: 'True',
  stats: true,
  overlayPosition: overlayOptions[0].value,
  overlay: undefined,
  overlayPlots: undefined,
  triples: [
    { id: id, checked: true, run_number: NaN, dataset_name: '', label: '' },
  ],
  openOverlayDataMenu: false,
  searchOption: searchOptions[1].value,
  viewPlotsPosition: viewPositions[1].value,
  proportion: plotsProportionsOptions[0].value,
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
  const [workspaceFolders, setWorkspaceFolders] = React.useState([]);
  const [triples, setTriples] = React.useState(initialState.triples);
  const [openOverlayDataMenu, toggleOverlayDataMenu] = React.useState(
    initialState.openOverlayDataMenu
  );
  const [viewPlotsPosition, setViewPlotsPosition] = React.useState(initialState.viewPlotsPosition);
  const [searchOption, setSearchOption] = React.useState(initialState.searchOption);
  const [proportion, setProportion] = React.useState(initialState.proportion);

  const change_value_in_reference_table = (
    value: string | number,
    key: string,
    id: string | number | boolean
  ) => {
    const copy = [...triples];
    const current_line: TripleProps = copy.filter(
      (line: TripleProps) => line.id === id
    )[0];
    const index_of_line: number = copy.indexOf(current_line);
    current_line[key] = value;
    copy[index_of_line] = current_line;
    setTriples(copy);
  };

  const addRun = () => {
    const copy: TripleProps[] = [...triples];
    const id = uuidv4();
    const newRun = {
      id: id,
      checked: true,
      run_number: NaN,
      dataset_name: '',
      label: '',
    };
    copy.push(newRun);
    setTriples(copy);
  };

  const removeRun = (id: string | number | boolean) => {
    const copy: TripleProps[] = [...triples];
    const removed = copy.filter((run: TripleProps) => run.id !== id);
    setTriples(removed);
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
        plotsWhichAreOverlaid,
        setPlotsWhichAreOverlaid,
        overlayPosition,
        setOverlaiPosition,
        overlayPlots,
        setOverlay,
        imageRefScrollDown,
        setImageRefScrollDown,
        workspaceFolders,
        setWorkspaceFolders,
        plotSearchFolders,
        setPlotSearchFolders,
        change_value_in_reference_table,
        addRun,
        removeRun,
        triples,
        openOverlayDataMenu,
        toggleOverlayDataMenu,
        viewPlotsPosition, setViewPlotsPosition,
        searchOption, setSearchOption,
        proportion, setProportion
      }}
    >
      {children}
    </Provider>
  );
};

export { store, LeftSideStateProvider };
