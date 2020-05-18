import React from 'react';
import { Breadcrumb, Row, Col } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getFolderPath } from './utils';
import { StyledDiv, StyledBreadcrumb } from './styledComponents';
import { Browser } from '../../components/browsing';

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
    <Row style={{margin: 8}}>
      <Col span={8}>
        <StyledBreadcrumb separator=">">
        <Breadcrumb.Item>
            <Link
              href={{
                pathname: '/',
                query: {
                  search_run_number: '',
                  search_dataset_name: '',
                },
              }}
            >
              <a>Main Page</a>
            </Link>
          </Breadcrumb.Item>
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
              <a>Home</a>
            </Link>
          </Breadcrumb.Item>
          {filteredFolders.map((folder: string) => {
            return (
              <Breadcrumb.Item key={folder}>
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
                  <a>{folder}</a>
                </Link>
              </Breadcrumb.Item>
            );
          })}
        </StyledBreadcrumb>
      </Col>
    </Row>
  );
};
