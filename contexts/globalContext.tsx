import React, { createContext, ReactChildren, useState } from 'react';

export interface GlobalStateProviderProps {
  children: ReactChildren;
}

export interface ActionProps {
  type: string;
  payload: any;
}

export const initialState: any = {
  overlay_plot: {}
};

export const store = createContext(initialState);
export const { Provider } = store;

const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [overlay_plot, setOverlayPlot] = useState<any>(initialState.overlay_plot)
  return <Provider value={{ overlay_plot, setOverlayPlot }}>{children}</Provider>;
}

export { store, GlobalStateProvider }