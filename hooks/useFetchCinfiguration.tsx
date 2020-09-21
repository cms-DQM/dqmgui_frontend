import * as React from 'react';

import { store } from '../contexts/leftSideContext';

export const useFecthConfiguration = () => {
  const { configuration, setConfiguration } = React.useContext(store)

  const getData = () => {
    fetch('config.json', { mode: 'no-cors' })
      .then(response => response.json())
      .then(
        (response) => {
          setConfiguration(response[process.env.NODE_ENV || 'development'])
        },
        (error) => {
          setConfiguration('Unable to load custom data')
        }
      )
  }
  React.useEffect(() => {
    getData()
  }, [])
  return configuration
}