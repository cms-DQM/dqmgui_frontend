import * as React from 'react'
import Form from 'antd/lib/form/Form'
import { Input } from 'antd';

import { useRouter } from 'next/router';
import { StyledFormItem } from '../../../styledComponents';
import { QueryProps } from '../../../../containers/display/interfaces';
import { getChangedQueryParams, changeRouter } from '../../../../containers/display/utils';

const { Search } = Input;

interface PlotSearchProps {

}

export const PlotSearch = () => {
  const [plotName, setPlotName] = React.useState<string>('')

  const router = useRouter();
  const query: QueryProps = router.query;

  React.useEffect(() => {
    if (!!plotName === false) {
      const params = getChangedQueryParams({ plot_search: '.*' }, query)
      console.log(params)
      changeRouter(params)
    } else {
      const params = getChangedQueryParams({ plot_search: plotName }, query)
      changeRouter(params)
    }
  }, [plotName])

  return (
    <Form
      onChange={(e: any) => setPlotName(e.target.value)}
    >
      <StyledFormItem>
        <Search
          id="plot_search"
          placeholder="Enter plot name"
        />
      </StyledFormItem>
    </Form>
  )
}