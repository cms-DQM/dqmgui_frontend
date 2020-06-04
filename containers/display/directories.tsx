import * as React from 'react'
import { useRouter } from 'next/router';
import { QueryProps } from './interfaces';
import { store } from '../../contexts/leftSideContext';
import { Col, Button } from 'antd';
import { DirecotryWrapper, StyledA, Icon, DirecotryButton } from './styledComponents';
import Link from 'next/link';
import { getFolderPathToQuery, changeRouter, getChangedQueryParams } from './utils';

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
            <div
              onClick={() => changeRouter(getChangedQueryParams({
                folder_path: getFolderPathToQuery(query.folder_path, directory_name),
              }, query))}
            >
              <Icon />
              <StyledA>{directory_name}</StyledA>
            </div>
          </DirecotryWrapper>
        </Col>
      ))}
    </>
  )
}
