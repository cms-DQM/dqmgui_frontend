import React, { createContext, ReactElement } from 'react';


interface LoaderObject {
  value: boolean;
  id: string;
}

export interface UpdateStateProviderProps {
  children: ReactElement;
}


export const initialState: any = {
  loaders: [],
  not_older_than: Math.floor(new Date().getTime() / 1000),
};

const updateInterval = 20; // seconds


const store = createContext(initialState);
const { Provider } = store;

const UpdateStateProvider = ({ children }: UpdateStateProviderProps) => {
  const [loaders, setLoaders] = React.useState<LoaderObject[]>(initialState.loaders)
  const [not_older_than, set_not_older_than] = React.useState(initialState.not_older_than);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const time = Math.floor(new Date().getTime() / 1000)
      set_not_older_than(time)
    }, updateInterval * 1000);
    return () => clearInterval(interval);
  }, []);

  const addLoader = (newLoader: LoaderObject) => {
    const copy = [...loaders]
    const filtered = copy.length > 0 ?
      copy.map((loader) => {
        if (loader.id === newLoader.id) {
          loader = newLoader
          return loader
        } else {
          return newLoader
        }
      })
      :
      [newLoader]
    setLoaders(filtered)
  }

  return (
    <Provider
      value={{
        addLoader,
        not_older_than
      }}
    >
      {children}
    </Provider>
  );
};

export { store, UpdateStateProvider };
