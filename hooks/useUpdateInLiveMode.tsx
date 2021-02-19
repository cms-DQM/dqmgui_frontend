import { useRouter } from 'next/router';
import * as React from 'react';

import { QueryProps } from '../containers/display/interfaces';
import { functions_config } from '../config/config';

interface LoaderObject {
  value: boolean;
  id: string;
}

export const useUpdateLiveMode = () => {
  const current_time = Math.floor(new Date().getTime() / 1000);
  const [not_older_than, set_not_older_than] = React.useState(current_time);
  const [loaders, setLoaders] = React.useState<LoaderObject[]>([])
  const [update, set_update] = React.useState(false)
  const [isThereAnyLoadingData, setIsThereAnyLoadingData] = React.useState(false)

  const router = useRouter();
  const query: QueryProps = router.query;
  const { run_number, dataset_name } = query

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

  React.useEffect(() => {
    if (run_number === '0' && dataset_name === "/Global/Online/ALL") {
      set_update(true)
    } else if (functions_config.mode === "ONLINE" && Object.keys(query).length === 0) {
      //when query={} it means that users will the lastest runs list, which has to be updated
      set_update(true)
    }
    else {
      set_update(false)
    }
  }, [run_number, dataset_name, functions_config.mode, Object.keys(query).length, isThereAnyLoadingData]);

  const values = loaders.map((loader) =>{
    const val = loader.value
    return val
  })

  React.useEffect(() => {
    const iseThereAnyTrue = values.includes(true)
    setIsThereAnyLoadingData(iseThereAnyTrue)
  }, values )

  const update_timer = () => {
    if (!isThereAnyLoadingData) {
      return setTimeout(() => {
        const time = Math.floor(new Date().getTime() / 1000)
        set_not_older_than(time)
      }, 20000)
    }
  }

  React.useEffect(() => {
    if (update) {
      update_timer()
    }
  }, [update, set_not_older_than, isThereAnyLoadingData]);


  return { not_older_than, addLoader };
};
