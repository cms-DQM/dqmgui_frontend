import * as React from 'react';

import { Info } from '../info';
import { RunInfoModal } from './runInfoModal';
import { QueryProps } from '../../containers/display/interfaces';
import { RunInfoIcon } from '../styledComponents';
import { Col } from 'antd';

interface RunInfoProps {
  query: QueryProps;
}

export const RunInfo = ({ query }: RunInfoProps) => {
  const [open, toggleModal] = React.useState(false);

  return (
    <>
      <RunInfoModal toggleModal={toggleModal} open={open} query={query} />
      <Col onClick={() => toggleModal(!open)} style={{width:'min-content'}}>
        <Info content={'Run info'}>
          <RunInfoIcon />
        </Info>
      </Col>
    </>
  );
};
