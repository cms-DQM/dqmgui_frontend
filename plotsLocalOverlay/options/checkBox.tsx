import * as React from 'react'
import Router, { NextRouter } from 'next/router';

import { CustomCheckbox } from '../../components/styledComponents';

interface CheckBoxProps {
  router: NextRouter
  option: {
    label: string;
    value: boolean
  }
}

export const CheckBox = ({ router, option }: CheckBoxProps) => {
  const [checked, setChecked] = React.useState(option.value)
  const { query } = router

  React.useEffect(() => {
    if(checked !== option.value){
      Router.push({
        pathname: router.pathname,
        query: {
          ...query,
          [option.label.toLowerCase()]: checked,
        },
      });
    }
  }, [checked])

  return (
    <CustomCheckbox
      onClick={async (e: any) => {
        await setChecked(e.target.checked);
      }}
      checked={checked}
    >
      {option.label}
    </CustomCheckbox>
  )
}