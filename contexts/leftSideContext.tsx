import React, { createContext, useState, ReactElement } from 'react';

import { sizes } from '../components/constants';
import { TripleProps } from '../containers/display/interfaces';
import { overlayOptions } from '../components/constants';

export interface LeftSideStateProviderProps {
  children: ReactElement;
}


export const initialState: any = {
  size: sizes.medium.size,
  normalize: 'True',
  stats: true,
  overlayPosition: overlayOptions[0].value,
  triples: [],
  runs_set_for_overlay: [],
  lumisection: -1,
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
  const [triples, setTriples] = React.useState(initialState.triples);
  const [runs_set_for_overlay, set_runs_set_for_overlay] = React.useState(initialState.runs_set_for_overlay)
  const [lumisection, setLumisection] = React.useState(initialState.lumisection);

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
        change_value_in_reference_table,
        triples,
        setTriples,
        runs_set_for_overlay,
        set_runs_set_for_overlay,
        lumisection, setLumisection
      }}
    >
      {children}
    </Provider>
  );
};

export { store, LeftSideStateProvider };
