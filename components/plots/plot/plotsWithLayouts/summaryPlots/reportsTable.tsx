import * as React from 'react';
import { List, Modal } from 'antd'
import { Report_summary_modal } from './styledComponents';
import { get_run_list_by_search_new_api_with_no_older_than } from '../../../../../api/newApi';
import { Spinner, FillSpinnerWrapper } from '../../../../../containers/search/styledComponents';

interface ReportsTableProps {
  dataSource: any[];
  open: boolean;
  toggleModal(open: boolean): void;
  modal_id: string;
  loading: boolean;
}

export const ReportsTable = ({ dataSource, open, toggleModal, modal_id, loading }: ReportsTableProps) => {
  const keys = Object.keys(dataSource)
  const source = keys.map((key) => {
    const obj = {}
    obj[key] = dataSource[key]
    return obj
  })
  return (<Report_summary_modal
    title={`Report Summary ${modal_id}`}
    visible={open}
    onCancel={() => toggleModal(false)}
    footer={null}
  >
    {loading ?
      <FillSpinnerWrapper>
        <Spinner />
      </FillSpinnerWrapper> :
      <List dataSource={source}
        renderItem={item => {
          return (<List.Item>
            <List.Item.Meta
              title={<a>{Object.keys(item)[0]}</a>}
              description={Object.values(item)[0]}
            />
          </List.Item>)
        }}
      />}
  </Report_summary_modal>
  )
}

