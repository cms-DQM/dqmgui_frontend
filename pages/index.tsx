import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Tooltip } from 'antd';

import {
  StyledHeader,
  StyledLayout,
  StyledDiv,
  StyledLogoWrapper,
  StyledLogo,
  StyledLogoDiv,
} from '../styles/styledComponents';
import { FolderPathQuery, QueryProps } from '../containers/display/interfaces';
import { backToMainPage } from '../utils/pages';
import { Header } from '../containers/display/header';
import { ContentSwitching } from '../containers/display/content/constent_switching';

const Index: NextPage<FolderPathQuery> = () => {
  // We grab the query from the URL:
  const router = useRouter();
  const query: QueryProps = router.query;

  const isDatasetAndRunNumberSelected =
    !!query.run_number && !!query.dataset_name;

  return (
    <StyledDiv>
      <Head>
        <script
          crossOrigin="anonymous"
          type="text/javascript"
          src="/jsroot-5.8.0/scripts/JSRootCore.js?2d&hist&more2d"
        ></script>
      </Head>
      <StyledLayout>
        <StyledHeader>
          <Tooltip title="Back to main page" placement="bottomLeft">
            <StyledLogoDiv>
              <StyledLogoWrapper onClick={() => backToMainPage()}>
                <StyledLogo src="/images/CMSlogo_white_red_nolabel_1024_May2014.png" />
              </StyledLogoWrapper>
            </StyledLogoDiv>
          </Tooltip>
          <Header
            isDatasetAndRunNumberSelected={isDatasetAndRunNumberSelected}
            query={query}
          />
        </StyledHeader>
       <ContentSwitching />
      </StyledLayout>
    </StyledDiv>
  );
};

export default Index;
