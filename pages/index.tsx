import { NextPage } from 'next';
import Head from 'next/head'

import Home from '../containers/search/Home';
import Nav from '../components/Nav';
import SearchResults from '../containers/search/SearchResults';
import DiplayFolders from '../containers/display/DisplayFolderAndPlot';
import { FC, useState, useEffect } from 'react';
import { useSearch } from '../hooks/useSearch';

interface FolderPathQuery {
  run_number?: number;
  dataset_name?: string;
  folder_path?: string;
}

const Index: NextPage<FolderPathQuery> = query => {
  const [run_number, setRunNumber] = useState('');
  const [dataset_name, setDatasetName] = useState('');
  const { results, results_grouped, searching, isLoading } = useSearch(
    run_number,
    dataset_name
  );
  return (
    <>
      <Head>
      //@ts-ignore
        <script crossorigin  type="text/javascript" src="/jsroot-5.8.0/scripts/JSRootCore.js?2d&hist"></script>
      </Head>
      <Nav setRunNumber={setRunNumber} setDatasetName={setDatasetName} />
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
            <Home />
          )}
    </>
  );
};

Index.getInitialProps = ({ query }: { query: FolderPathQuery }) => {
  return query;
};

export default Index;
