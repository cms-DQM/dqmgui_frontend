import React from 'react';
import { Breadcrumb, Typography } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getFolderPath } from './utils';
import { StyledDiv, WrapperDiv, StyledAForPath } from './styledComponents';

interface FolderPathProps {
  folder_path: string | undefined;
  dataset_name: string;
  run_number: number;
}

export const FolderPath = ({
  folder_path,
  run_number,
  dataset_name,
}: FolderPathProps) => {
  const folders = folder_path ? folder_path.split('/') : [];
  const filteredFolders = folders.filter((folder: string) => folder !== '');
  const router = useRouter();
  const query = router.query;

  return (
    <StyledDiv>
      <div>
        <WrapperDiv>
          <Link
            href={{
              pathname: '/',
              query: {
                search_run_number: run_number,
                search_dataset_name: '',
              },
            }}
            replace
          >
            <WrapperDiv>
              <p>Run number:</p>
              <StyledAForPath>{run_number}</StyledAForPath>
            </WrapperDiv>
          </Link>
          <Link
            href={{
              pathname: '/',
              query: {
                search_run_number: '',
                search_dataset_name: dataset_name,
              },
            }}
            replace
          >
            <WrapperDiv>
              <p>Dataset Name:</p>
              <StyledAForPath> {dataset_name}</StyledAForPath>
            </WrapperDiv>
          </Link>
        </WrapperDiv>
      </div>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>
          <Link
            href={{
              pathname: '/',
              query: {
                run_number: query.run_number,
                dataset_name: query.dataset_name,
                // folder_path: '/'
              },
            }}
          >
            Home
          </Link>
        </Breadcrumb.Item>
        {filteredFolders.map((folder: string) => {
          return (
            <Breadcrumb.Item>
              <Link
                href={{
                  pathname: '/',
                  query: {
                    run_number: query.run_number,
                    dataset_name: query.dataset_name,
                    folder_path: getFolderPath(folders, folder),
                  },
                }}
              >
                {folder}
              </Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </StyledDiv>
  );
};
