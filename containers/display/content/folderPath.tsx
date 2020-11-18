import React from 'react';
import { Breadcrumb } from 'antd';

import { getFolderPath } from '../utils';
import { StyledBreadcrumb } from '../styledComponents';
import { ParsedUrlQueryInput } from 'querystring';
import { FolderPathByBreadcrumbProps } from './folders_and_plots_content';

interface FolderPathProps {
  folder_path: string | undefined;
  changeFolderPathByBreadcrumb(parameters: ParsedUrlQueryInput | FolderPathByBreadcrumbProps): void
}

export const FolderPath = ({ folder_path, changeFolderPathByBreadcrumb }: FolderPathProps) => {
  const folders = folder_path ? folder_path.split('/') : [];
  const filteredFolders = folders.filter((folder: string) => folder !== '');

  return (
    <>
      <StyledBreadcrumb separator="/">
        <Breadcrumb.Item
          onClick={() => {
            changeFolderPathByBreadcrumb({
              folder_path: '/',
              selected_plots: '',
            });
          }}
        >
          <a>Top</a>
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
