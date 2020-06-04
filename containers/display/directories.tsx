import * as React from 'react'
import { useRouter } from 'next/router';
import { QueryProps } from './interfaces';
import { store } from '../../contexts/leftSideContext';
import { Col } from 'antd';
import { DirecotryWrapper, StyledA, Icon } from './styledComponents';
import Link from 'next/link';
import { getFolderPathToQuery } from './utils';

interface FoldersFilter {
  directories: (string | undefined)[]
}

export const Directories = ({ directories }: FoldersFilter) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  return (
    <>
      {directories.map((directory_name: any) => (
        <Col span={4} key={directory_name}>
          <DirecotryWrapper>
            <Icon />
            <Link
              href={{
                pathname: '/',
                query: {
                  run_number: query.run_number,
                  dataset_name: query.dataset_name,
                  folder_path: getFolderPathToQuery(query.folder_path, directory_name),
                  workspace: query.workspace,
                  plot_search: query.plot_search
                },
              }}
            >
              <StyledA>{directory_name}</StyledA>
            </Link>
          </DirecotryWrapper>
        </Col>
      ))}
    </>
  )
}
