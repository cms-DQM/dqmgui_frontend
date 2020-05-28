import React, { createContext, useState, ReactElement } from 'react';

import { sizes } from '../components/constants';
import { SizeProps, PlotProps, TripleProps } from '../containers/display/interfaces';
import { overlayOptions } from '../components/constants'

export interface LeftSideStateProviderProps {
  children: ReactElement;
}

export interface LeftSideState {
  size: SizeProps;
  normalize: boolean,
  stats: boolean,
  overlayPosition: string;
  overlay: PlotProps[]
  overlayPlots: TripleProps[];
  workspaceFolders: string[];
}

export const initialState: any = {
  size: sizes.medium.size,
  normalize: true,
  stats: true,
  overlayPosition: overlayOptions[0].value,
  overlay: undefined,
  overlayPlots: undefined,
};

export interface ActionProps {
  type: string;
  payload: any;
}

const store = createContext(initialState);
const { Provider } = store;

const LeftSideStateProvider = ({ children }: LeftSideStateProviderProps) => {
  const [size, setSize] = useState<number>(initialState.size)
  const [normalize, setNormalize] = useState<boolean>(initialState.normalize)
  const [stats, setStats] = useState<boolean>(initialState.stats)
  const [plotsWhichAreOverlaid, setPlotsWhichAreOverlaid] = useState({})
  const [overlayPosition, setOverlaiPosition] = useState(initialState.overlayPosition)
  const [overlayPlots, setOverlay] = useState(initialState.overlayPlots)
  const [imageRefScrollDown, setImageRefScrollDown] = useState(null)
  const [workspaceFolders, setWorkspaceFolders] = React.useState([])

  return <Provider value={{
    size, setSize,
    normalize, setNormalize,
    stats, setStats,
    plotsWhichAreOverlaid, setPlotsWhichAreOverlaid,
    overlayPosition, setOverlaiPosition,
    overlayPlots, setOverlay,
    imageRefScrollDown, setImageRefScrollDown,
    workspaceFolders, setWorkspaceFolders
  }}>{children}</Provider>;
}

export { store, LeftSideStateProvider }