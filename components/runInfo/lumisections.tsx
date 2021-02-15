import * as React from 'react';
import { Row } from 'antd';

import { useRequest } from '../../hooks/useRequest';
import { QueryProps } from '../../containers/display/interfaces';
import { get_jroot_plot } from '../../api/oldApi';
import { store } from '../../contexts/leftSideContext';
import { FormatParamsForAPI } from '../plots/plot/singlePlot/utils';
import { CustomCol, CustomRow } from '../styledComponents';

interface LumisectionsProps {
  query: QueryProps;
}

export const Lumisections = ({ query }: LumisectionsProps) => {
  const globalState = React.useContext(store);

  const params_for_api = FormatParamsForAPI(
    globalState,
    query,
    'iLumiSection',
    '/HLT/EventInfo'
  );

  const { data } = useRequest(get_jroot_plot(params_for_api));
  const lumis = data ? data.fString : '0';
  return (
    <CustomRow display="flex" justifycontent="space-between">
      <CustomCol space={'1'}>Lumi section #: </CustomCol>
      <CustomCol space={'1'} bold="true">
        {lumis}
      </CustomCol>
    </CustomRow>
  );
};
