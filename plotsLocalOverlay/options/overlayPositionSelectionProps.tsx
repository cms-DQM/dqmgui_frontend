import * as React from 'react'
import Router, { NextRouter } from 'next/router';
import { Select } from 'antd'

import { StyledSelect } from '../../components/viewDetailsMenu/styledComponents'
import { overlayOptions } from '../../components/constants';

const { Option } = Select;

interface OverlayPositionSelectionProps {
  router: NextRouter
}

export const OverlayPositionSelection = ({ router }: OverlayPositionSelectionProps) => {
  const { query } = router
  const [overlayPosition, setOverlayPosition] = React.useState<string>(query.overlayPosition)

  React.useEffect(() => {
    Router.push({
      pathname: router.pathname,
      query: {
        ...query,
        overlayPosition: overlayPosition,
      },
    });
  }, [overlayPosition])

  return <StyledSelect
    onChange={(overlay: any) => setOverlayPosition(overlay)}
    defaultValue={query.overlayPosition}>
    {
      overlayOptions.map((option) =>
        <Option
          value={option.value}
          key={option.value}
        >
          {option.label}
        </Option>)
    }
  </StyledSelect>
}