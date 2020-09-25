import * as React from 'react';

import { useRequest } from '../../hooks/useRequest';
import { QueryProps } from '../../containers/display/interfaces';
import { get_jroot_plot } from '../../config/apis/get_plots_urls';
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
  const { configuration } = globalState
  const { functions_config } = configuration
  params_for_api.functions_config = functions_config
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
