import React from 'react';
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getFolderPath } from './utils';

interface FolderPathProps {
  folder_path: string | undefined;
}

export const FolderPath = ({ folder_path }: FolderPathProps) => {
  const folders = folder_path ? folder_path.split('/') : [];
  const filteredFolders = folders.filter((folder: string) => folder !== '');
  const router = useRouter();
  const query = router.query;

  return (
    <Breadcrumb separator=">">
      <Breadcrumb.Item>
        <Link
          href={{
            pathname: '/',
            query: {
              run_number: query.run_number,
              dataset_name: query.dataset_name,
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
  );
};
