import React from 'react';
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getFolderPath, changeRouter, getChangedQueryParams } from './utils';
import { StyledBreadcrumb } from './styledComponents';
import { ParsedUrlQueryInput } from 'querystring';

interface FolderPathProps {
  folder_path: string | undefined;
}

export const FolderPath = ({ folder_path }: FolderPathProps) => {
  const folders = folder_path ? folder_path.split('/') : [];
  const filteredFolders = folders.filter((folder: string) => folder !== '');
  const router = useRouter();
  const query = router.query;
  const changeFolderPathByBreadcrumb = (parameters: ParsedUrlQueryInput) =>
    changeRouter(getChangedQueryParams(parameters, query));

  return (
    <>
      <StyledBreadcrumb separator=">">
        <Breadcrumb.Item
          onClick={() => {
            changeFolderPathByBreadcrumb({
              folder_path: '/',
              selected_plots: '',
            });
          }}
        >
          <a>/</a>
        </Breadcrumb.Item>
        {filteredFolders.map((folder: string) => {
          return (
            <Breadcrumb.Item
              key={folder}
              onClick={() => {
                changeFolderPathByBreadcrumb({
                  folder_path: getFolderPath(folders, folder),
                  selected_plots: '',
                });
              }}
            >
              <a>{folder}</a>
            </Breadcrumb.Item>
          );
        })}
      </StyledBreadcrumb>
    </>
  );
};
