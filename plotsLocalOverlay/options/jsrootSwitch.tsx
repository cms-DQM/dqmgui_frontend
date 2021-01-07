import * as React from 'react'
import Router, { NextRouter } from 'next/router';
import { Switch } from 'antd';

interface JSROOTSwitchProps {
  router: NextRouter
}

export const JSROOTSwitch = ({ router }: JSROOTSwitchProps) => {
  const { query } = router
  const [JSROOTmode, setJSROOTmode] = React.useState(query.jsroot === 'true' ? true : false)

  React.useEffect(() => {
    Router.push({
      pathname: router.pathname,
      query: {
        ...query,
        jsroot: JSROOTmode,
      },
    });
  }, [JSROOTmode])

  return (
    <Switch
      style={{ width: 'fit-content' }}
      checkedChildren="JSROOT enabled"
      unCheckedChildren="JSROOT disabled"
      checked={JSROOTmode}
      onChange={(e) => {
        setJSROOTmode(e);
      }}
    />
  )
}