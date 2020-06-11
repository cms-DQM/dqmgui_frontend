import * as React from 'react';
import { Col } from 'antd';

import Workspaces from '../workspaces';
import { CustomRow } from '../styledComponents';
import { Browser } from '../browsing';
import { PlotSearch } from '../plots/plot/plotSearch';
import { FreeSeacrhModal } from './freeSearchResultModal';
import { SearchButton } from '../searchButton';

export const ComposedSearch = () => {
  const [modalState, setModalState] = React.useState(false)

  return (
    <CustomRow
      width="100%"
      display="flex"
      justifycontent="space-between"
    >
      <FreeSeacrhModal
        modalState={modalState}
        setModalState={setModalState}
      />
      <CustomRow width="max-content"
      >
        <Col>
          <Workspaces />
        </Col>
        <Col>
          <Browser />
        </Col>
        <SearchButton
          onClick={() => setModalState(true)}
        />
      </CustomRow>
      <Col>
        <PlotSearch isLoadingFolders={false} />
      </Col>
    </CustomRow >
  )
}