import * as React from 'react';

import { Info } from '../info';
import { RunInfoModal } from './runInfoModal';
import { QueryProps } from '../../containers/display/interfaces';
import { RunInfoIcon } from '../styledComponents';

interface RunInfoProps {
  query: QueryProps;
}

export const RunInfo = ({ query }: RunInfoProps) => {
  const [open, toggleModal] = React.useState(false);

  return (
    <>
      <RunInfoModal toggleModal={toggleModal} open={open} query={query} />
      <div onClick={() => toggleModal(!open)}>
        <Info content={'Run info'}>
          <RunInfoIcon />
        </Info>
      </div>
    </>
  );
};
