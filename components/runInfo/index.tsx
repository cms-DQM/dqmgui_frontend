import * as React from 'react'
import { InfoCircleOutlined } from '@ant-design/icons';

import { Info } from '../info'
import { RunInfoModal } from './runInfoModal';
import { theme } from '../../styles/theme';
import { QueryProps } from '../../containers/display/interfaces';

interface RunInfoProps {
  query: QueryProps;
}

export const RunInfo = ({ query }: RunInfoProps) => {
  const [open, toggleModal] = React.useState(false)

  return <>
  <RunInfoModal  toggleModal={toggleModal} open ={open} query={query}/>
    <div onClick={() => toggleModal(!open)}>
      <Info content={"Run info"}>
        <InfoCircleOutlined style={{color: 'white', padding: '4px', cursor: 'pointer', background: `${theme.colors.secondary.main}`, borderRadius: '25px'}} />
      </Info>
    </div>
  </>
}