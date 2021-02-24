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


const store = createContext(initialState);
const { Provider } = store;

const UpdateStateProvider = ({ children }: UpdateStateProviderProps) => {
  const [loaders, setLoaders] = React.useState<LoaderObject[]>(initialState.loaders)
  const [not_older_than, set_not_older_than] = React.useState(initialState.not_older_than);
  const [isThereAnyLoadingData, setIsThereAnyLoadingData] = React.useState(false)


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

  const values = loaders.map((loader) => {
    const val = loader.value
    return val
  })

  React.useEffect(() => {
    const iseThereAnyTrue = values.includes(true)
    setIsThereAnyLoadingData(iseThereAnyTrue)
  }, values)

  const update_timer = () => {
    const iseThereAnyTrue = values.includes(true)
    if (!iseThereAnyTrue) {
      return setTimeout(async () => {
        const time = await Math.floor(new Date().getTime() / 1000)
        set_not_older_than(time)
      }, 20000)
    }
  }

  React.useEffect(() => {
    update_timer()
  }, [not_older_than, isThereAnyLoadingData]);

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
