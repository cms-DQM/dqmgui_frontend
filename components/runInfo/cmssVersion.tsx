import * as React from 'react';

import { useRequest } from '../../hooks/useRequest';
import { QueryProps } from '../../containers/display/interfaces';
import { store } from '../../contexts/leftSideContext';
import { FormatParamsForAPI } from '../plots/plot/singlePlot/utils';
import { CustomCol, CustomRow } from '../styledComponents';
import { get_jroot_plot } from '../../config/apis/get_plots_urls';

interface CMSSW_versionProps {
  query: QueryProps;
}

export const CMSSW_version = ({ query }: CMSSW_versionProps) => {
  const globalState = React.useContext(store);
  const { configuration } = globalState
  const { functions_config } = configuration
  const params_for_api = FormatParamsForAPI(
    globalState,
    query,
    'CMSSW_Version',
    '/HLT/EventInfo'
  );
  params_for_api.functions_config = functions_config
  const { data } = useRequest(get_jroot_plot(params_for_api));
  const CMSSW_version = data ? data.fString : '0';
  return (
    <CustomRow display="flex" justifycontent="space-between">
      <CustomCol space={'1'}>CMSSW version: </CustomCol>
      <CustomCol space={'1'} bold="true">
        {CMSSW_version}
      </CustomCol>
    </CustomRow>
  );
};
