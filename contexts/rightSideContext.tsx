import React, { createContext, useState, ReactElement } from 'react';

import {
  sizes,
} from '../components/constants';
import {
  CustomizeProps,
} from '../containers/display/interfaces';

export interface LeftSideStateProviderProps {
  children: ReactElement;
}

export const initialState: any = {
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
};

const store = createContext(initialState);
const { Provider } = store;

const RightSideStateProvider = ({ children }: LeftSideStateProviderProps) => {
  const [rightSideSize, setRightSideSize] = useState<number>(initialState.rightSideSize);
  const [customize, setCustomize] = useState<CustomizeProps>(initialState.customize);
  const [JSROOTmode, setJSROOTmode] = useState<boolean>(initialState.JSROOTmode);

  return (
    <Provider
      value={{
        rightSideSize,
        setRightSideSize,
        JSROOTmode,
        setJSROOTmode,
        customize,
        setCustomize,
      }}
    >
      {children}
    </Provider>
  );
};

export { store, RightSideStateProvider };
