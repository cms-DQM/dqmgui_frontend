import * as React from 'react';

import { store } from '../contexts/leftSideContext';

export const useFecthConfiguration = () => {
  const { configuration, setConfiguration } = React.useContext(store)
  const [loading, setLoading] = React.useState(false)

  const getData = async () => {
    setLoading(true)
    await fetch('config.json', { mode: 'no-cors' })
      .then(response => response.json())
      .then(
        (response) => {
          setConfiguration(response[process.env.NODE_ENV || 'development'])
          setLoading(false)
        },
        (error) => {
          setConfiguration('Unable to load custom data')
          setLoading(false)
        }
      )
  }

  React.useEffect(() => {
    if(!loading){}
    getData()
  }, [])

  return {configuration, loading, setConfiguration}
}