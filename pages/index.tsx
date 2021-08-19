import React, { useContext, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Col, Tooltip } from 'antd';

import {
  StyledHeader,
  StyledLayout,
  StyledDiv,
  StyledLogoWrapper,
  StyledLogo,
  StyledLogoDiv,
} from '../styles/styledComponents';
import { FolderPathQuery, QueryProps } from '../containers/display/interfaces';
import { backToMainPage } from '../utils';
import { Header } from '../containers/display/header';
import { ContentSwitching } from '../containers/display/content/constent_switching';
import { ModesSelection } from '../components/modes/modesSelection';
import { store } from '../contexts/globalStateContext';
import { get_host_ } from '../api/getHost';

const Index: NextPage<FolderPathQuery> = () => {
  // We grab the query from the URL:
  const router = useRouter();
  const query: QueryProps = router.query;
  const { setHost, host } = useContext(store)

  useEffect(() => {
    get_host_(setHost)
  }, [])
  
  const isDatasetAndRunNumberSelected =
    !!query.run_number && !!query.dataset_name;
  if (typeof window !== "undefined") {
    window.onload = async () => {
      //@ts-ignore
      document.getElementById("holderStyle").remove();
    };
  }
  return (
    <StyledDiv>
      <Head>
        <style
          id="holderStyle"
          dangerouslySetInnerHTML={{
            __html: `
      *, *::before, *::after {
        transition: none!important;
      }` }}
        />
        <script
          crossOrigin="anonymous"
          type="text/javascript"
          src="./jsroot-5.8.0/scripts/JSRootCore.js?2d&hist&more2d"
        ></script>
        <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
      </Head>
      <StyledLayout>
        <StyledHeader>
          <Col>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Back to main page" placement="bottomLeft">
                <StyledLogoDiv>
                  <StyledLogoWrapper onClick={(e) => backToMainPage(e)}>
                    <StyledLogo src="./images/CMSlogo_white_red_nolabel_1024_May2014.png" />
                  </StyledLogoWrapper>
                </StyledLogoDiv>
              </Tooltip>
              <ModesSelection host={host}/>
            </Col>
          </Col>
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
