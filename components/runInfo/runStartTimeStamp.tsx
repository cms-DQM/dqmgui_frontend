import * as React from 'react';
import { Spin } from 'antd';

import { useRequest } from '../../hooks/useRequest';
import { QueryProps } from '../../containers/display/interfaces';
import { get_jroot_plot } from '../../api/oldApi';
import { CustomCol, CustomRow } from '../styledComponents';

interface InfoProps {
  value: string;
  label: string;
  type?: string;
}

interface RunInfoProps {
  query: QueryProps;
  info: InfoProps;
  not_older_than: number;
}

export const RunInfoItem = ({ query, info, not_older_than }: RunInfoProps) => {

  const params_for_api = {
    run_number: query.run_number,
    dataset_name: query.dataset_name,
    lumi: query.lumi,
    folders_path: 'HLT/EventInfo',
    plot_name: info.value,
    notOlderThan: not_older_than
  }
  const { data, isLoading } = useRequest(get_jroot_plot(params_for_api), {}, [
    query.dataset_name,
    query.run_number,
  ]);

  const get_label = (info: InfoProps) => {
    const value = data ? data.fString : null;

    if (info.type === 'time' && value) {
      const milisec = new Date(parseInt(value) * 1000);
      const time = milisec.toUTCString();
      return time;
    } else {
      return value ? value : 'No information';
    }
  };

  return (
    <CustomRow display="flex" justifycontent="space-between">
      <CustomCol space={'1'}>{info.label}</CustomCol>
      <CustomCol space={'1'} bold="true">
        {isLoading ? <Spin size="small" /> : get_label(info)}
      </CustomCol>
    </CustomRow>
  );
};
