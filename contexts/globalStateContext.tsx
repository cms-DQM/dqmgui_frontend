import React, { createContext, useState, ReactElement } from 'react';

import { plotsProportionsOptions, viewPositions } from '../components/constants';

export interface LeftSideStateProviderProps {
  children: ReactElement;
}


export const initialState: any = {
  imageRefScrollDown: null,
  workspace: 'Everything',
  openOverlayDataMenu: false,
  viewPlotsPosition: viewPositions[1].value,
  proportion: plotsProportionsOptions[0].value,
  host: '',
};


const store = createContext(initialState);
const { Provider } = store;

const GlobalStateProvider = ({ children }: LeftSideStateProviderProps) => {
  const [openOverlayDataMenu, toggleOverlayDataMenu] = React.useState(initialState.openOverlayDataMenu);
  const [imageRefScrollDown, setImageRefScrollDown] = useState(initialState.imageRefScrollDown);
  const [workspace, setWorkspace] = React.useState(initialState.workspace);
  const [viewPlotsPosition, setViewPlotsPosition] = React.useState(initialState.viewPlotsPosition);
  const [proportion, setProportion] = React.useState(initialState.proportion);
  const [host, setHost] = React.useState(initialState.host);

  return (
    <Provider
      value={{
        imageRefScrollDown,
        setImageRefScrollDown,
        workspace, setWorkspace,
        openOverlayDataMenu,
        toggleOverlayDataMenu,
        viewPlotsPosition,
        setViewPlotsPosition,
        proportion,
        setProportion,
        host,
        setHost
      }}
    >
      {children}
    </Provider>
  );
};

export { store, GlobalStateProvider };
