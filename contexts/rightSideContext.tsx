import React, { createContext, useState, ReactElement } from 'react';
import { sizes } from '../components/constants';
import { CustomizeProps, SizeProps } from '../containers/display/interfaces';

export interface RightSideStateProviderProps {
  children: ReactElement;
}

export interface RightSideState {
  height: number;
  width: number,
  normalize: boolean,
  stats: boolean,
  size: SizeProps;
  JSROOTmode: boolean;
  customizeProps: CustomizeProps
}

export const initialState: any = {
  normalize: true,
  size: sizes.fill.size,
  stats: true,
  JSROOTmode: false,
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
};

export interface ActionProps {
  type: string;
  payload: any;
}

const store = createContext(initialState);
const { Provider } = store;

const RightSideStateProvider = ({ children }: RightSideStateProviderProps) => {
  const [size, setSize] = useState<number>(initialState.size)
  const [normalize, setNormalize] = useState<boolean>(true)
  const [stats, setStats] = useState<boolean>(true)
  const [JSROOTmode, setJSROOTmode] = useState<boolean>(false)
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
  })

  return <Provider value={{
    size, setSize,
    normalize, setNormalize,
    stats, setStats,
    JSROOTmode, setJSROOTmode,
    customize, setCustomize
  }}>{children}</Provider>;
}

export { store, RightSideStateProvider }