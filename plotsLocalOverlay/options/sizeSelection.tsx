import * as React from 'react'
import { Select } from 'antd'
import Router, { NextRouter } from 'next/router';

import { StyledSelect } from '../../components/viewDetailsMenu/styledComponents'
import { sizes } from '../../components/constants';

const { Option } = Select;

interface SizeSelectionProps {
  router: NextRouter
}

export const SizeSelection = ({ router }: SizeSelectionProps) => {
  const options = Object.keys(sizes)
  const { query } = router
  const [size, setSize] = React.useState<string>(query.size as string)

  React.useEffect(() => {
    Router.push({
      pathname: router.pathname,
      query: {
        ...query,
        size,
      },
    });
  }, [size])

  return <StyledSelect
    onChange={(value: any) => setSize(value)}
    defaultValue={query.size}>
    {
      options.map((option) =>
        <Option
          value={option}
          key={option}
        >
          {sizes[option].label}
        </Option>)
    }
  </StyledSelect>
}