import * as React from 'react'
import Router, { useRouter } from 'next/router';

import { QueryProps } from '../containers/display/interfaces'
import { ParsedUrlQueryInput } from 'querystring';
import { getChangedQueryParams } from '../containers/display/utils'

export const useChangeRouter = (params: ParsedUrlQueryInput, watchers: (string | number | undefined)[] = [], condition: boolean) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const parameters = getChangedQueryParams(params, query)

  React.useEffect(() => {
    if (condition) {
      Router.replace({
        pathname: '/',
        query: parameters,
      });
    }
  }, watchers)
}