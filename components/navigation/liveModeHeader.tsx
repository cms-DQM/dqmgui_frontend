import * as  React from 'react';
import { Button, Tooltip, Spin, Typography } from "antd"
import { PauseOutlined, PlayCircleOutlined } from '@ant-design/icons';

import { CustomCol, CustomDiv, CustomForm, CutomFormItem } from "../styledComponents"
import { theme } from "../../styles/theme"
import { useUpdateLiveMode } from '../../hooks/useUpdateInLiveMode';
import { FormatParamsForAPI } from '../plots/plot/singlePlot/utils';
import { store } from '../../contexts/leftSideContext';
import { QueryProps, InfoProps } from '../../containers/display/interfaces';
import { main_run_info } from '../constants'
import { useRequest } from '../../hooks/useRequest';
import { get_jroot_plot } from '../../config/config';
import { get_label } from '../utils';
const { Title } = Typography;

interface LiveModeHeaderProps {
  query: QueryProps
}

export const LiveModeHeader = ({ query }: LiveModeHeaderProps) => {
  const { update, set_update } = useUpdateLiveMode();
  const globalState = React.useContext(store);
  return (
    <>
      <CustomForm display="flex">
        {
          main_run_info.map((info: InfoProps) => {
            const params_for_api = FormatParamsForAPI(
              globalState,
              query,
              info.value,
              '/HLT/EventInfo'
            );

            const { data, isLoading } = useRequest(get_jroot_plot(params_for_api), {}, [
              query.dataset_name,
              query.run_number,
            ]);
            return <CutomFormItem
              space="8"
              width="fit-content"
              color={theme.colors.common.white}
              name={info.label}
              label={info.label}>
              <Title level={4} style={{ color: `${update ? theme.colors.notification.success : theme.colors.notification.error}` }}>
                {isLoading ? <Spin size="small" /> : get_label(info, data)}
              </Title>
            </CutomFormItem>
          }
          )
        }
      </CustomForm>
      <CustomCol
        justifycontent="flex-end"
        display="flex"
        alignitems="center"
        texttransform="uppercase"
        color={update ? theme.colors.notification.success : theme.colors.notification.error}
      >
        Live Mode
        <CustomDiv space="2">
          <Tooltip title={`Updating mode is ${update ? 'on' : 'off'}`} >
            <Button
              type="primary" shape="circle"
              onClick={() => {
                set_update(!update)
              }}
              icon={update ? <PauseOutlined /> : <PlayCircleOutlined />}></Button>
          </Tooltip>
        </CustomDiv>
      </CustomCol>
    </>
  )
}