import * as React from 'react';

import { useRequest } from '../../hooks/useRequest';
import { QueryProps } from '../../containers/display/interfaces';
import { get_jroot_plot } from '../../config/config';
import { store } from '../../contexts/leftSideContext';
import { FormatParamsForAPI } from '../plots/plot/singlePlot/utils';
import { CustomCol, CustomRow } from '../styledComponents';

interface EventsProps {
  query: QueryProps;
}

export const Events = ({ query }: EventsProps) => {
  const globalState = React.useContext(store);

  const params_for_api = FormatParamsForAPI(
    globalState,
    query,
    'iEvent',
    '/HLT/EventInfo'
  );

  const { data } = useRequest(get_jroot_plot(params_for_api));
  const events_amount = data ? data.fString : '0';
  return (
    <CustomRow display="flex" justifycontent="space-between">
      <CustomCol space={'1'}>Events#: </CustomCol>
      <CustomCol space={'1'} bold="true">
        {events_amount}
      </CustomCol>
    </CustomRow>
  );
};
