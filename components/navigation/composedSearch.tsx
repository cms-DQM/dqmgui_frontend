import * as React from 'react';
import { Col } from 'antd';
import { useRouter } from 'next/router';

import Workspaces from '../workspaces';
import { CustomRow } from '../styledComponents';
import { PlotSearch } from '../plots/plot/plotSearch';
import { QueryProps } from '../../containers/display/interfaces';
import { WrapperDiv } from '../../containers/display/styledComponents';
import { LiveModeHeader } from './liveModeHeader';
import { ArchiveModeHeader } from './archive_mode_header';

export const ComposedSearch = () => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const set_on_live_mode =
    query.run_number === '0' && query.dataset_name === '/Global/Online/ALL';

  return (
    <CustomRow
      // display="flex"
      // justifycontent="space-between"
      alignitems="center"
    >
      {set_on_live_mode ? (
        <LiveModeHeader query={query} />
      ) : (
        <ArchiveModeHeader />
      )}
    
    </CustomRow>
  );
};
