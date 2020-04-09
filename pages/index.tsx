import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import Nav from '../components/Nav';
import SearchResults from '../containers/search/SearchResults';
import DiplayFolders from '../containers/display/DisplayFolderAndPlot';
import { useSearch } from '../hooks/useSearch';
import { StyledHeader, StyledLayout, StyledContent } from './styles';

const { Header, Footer, Sider, Content } = Layout;

interface FolderPathQuery {
  run_number?: number;
  dataset_name?: string;
  folder_path?: string;
}

const Index: NextPage<FolderPathQuery> = (query) => {
  const [run_number, setRunNumber] = useState('');
  const [dataset_name, setDatasetName] = useState('');
  const { results, results_grouped, searching, isLoading } = useSearch(
    run_number,
    dataset_name
  );
  return (
    <div>
      <Head>
        <script
          crossOrigin="anonymous"
          type="text/javascript"
          src="/jsroot-5.8.0/scripts/JSRootCore.js?2d&hist&more2d"
        ></script>
      </Head>
      <StyledLayout>
        <StyledHeader>
          <Nav setRunNumber={setRunNumber} setDatasetName={setDatasetName} />
        </StyledHeader>
        <StyledContent>
          {query.run_number && query.dataset_name ? (
            <DiplayFolders
              run_number={query.run_number}
              dataset_name={query.dataset_name}
              folder_path={query.folder_path || ''}
            />
          ) : searching ? (
            <SearchResults
              isLoading={isLoading}
              results={results}
              results_grouped={results_grouped}
            />
          ) : (
            <div>Home</div>
          )}
        </StyledContent>
        <Footer>Footer</Footer>
      </StyledLayout>
    </div>
  );
};

Index.getInitialProps = ({ query }: { query: FolderPathQuery }) => {
  return query;
};

export default Index;
