import * as React from 'react';
import { Spin, Typography } from 'antd';

import {
  CustomForm,
  CutomFormItem,
} from '../styledComponents';
import { theme } from '../../styles/theme';
import { useUpdateLiveMode } from '../../hooks/useUpdateInLiveMode';
import { QueryProps, InfoProps } from '../../containers/display/interfaces';
import { main_run_info } from '../constants';
import { useRequest } from '../../hooks/useRequest';
import { get_jroot_plot } from '../../api/oldApi';
import { get_label, makeid } from '../utils';

const { Title } = Typography;

interface LiveModeHeaderProps {
  query: QueryProps;
}

export const LiveModeHeader = ({ query }: LiveModeHeaderProps) => {
  const { not_older_than, addLoader } = useUpdateLiveMode()

  return (
    <>
      <CustomForm display="flex" style={{ alignItems: 'center', }}>
        {main_run_info.map((info: InfoProps) => {
          const params_for_api = {
            run_number: query.run_number,
            dataset_name: query.dataset_name,
            folders_path: 'HLT/EventInfo',
            lumi: -1,
            notOlderThan: undefined,
            plot_name: info.value
          }

          const { data, isLoading } = useRequest(
            get_jroot_plot(params_for_api),
            {},
            [query.dataset_name, query.run_number, not_older_than]
          );
          const [id, setId] = React.useState<string>()
          React.useEffect(() => {
            const id_ = makeid()
            setId(id_)
          }, [])

          React.useEffect(() => {
            addLoader({ value: isLoading, id })
          }, [isLoading])

          return (
            <CutomFormItem
              space="8"
              width="fit-content"
              color={theme.colors.common.white}
              name={info.label}
              label={info.label}
            >
              <Title
                level={4}
                style={{ color: 'white', display: 'content' }}
              >
                {isLoading ? <Spin size="small" /> : get_label(info, data)}
              </Title>
            </CutomFormItem>
          );
        })}
      </CustomForm>
    </>
  );
};
