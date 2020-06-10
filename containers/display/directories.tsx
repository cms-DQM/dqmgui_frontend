import * as React from 'react';
import { useRouter } from 'next/router';
import { QueryProps } from './interfaces';
import { Col } from 'antd';
import {
  DirecotryWrapper,
  StyledA,
  Icon,
} from './styledComponents';
import {
  getFolderPathToQuery,
  changeRouter,
  getChangedQueryParams,
} from './utils';
import { CustomDiv } from '../../components/styledComponents';

interface FoldersFilter {
  directories: (string | undefined)[];
}

export const Directories = ({ directories }: FoldersFilter) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  return (
    <>
      {directories.map((directory_name: any) => (
        <Col span={4} key={directory_name}>
          <DirecotryWrapper>
            <CustomDiv
              hover="true"
              display="flex"
              alignitems="center"
              onClick={() =>
                changeRouter(
                  getChangedQueryParams(
                    {
                      folder_path: getFolderPathToQuery(
                        query.folder_path,
                        directory_name
                      ),
                    },
                    query
                  )
                )
              }
            >
              <Icon />
              <StyledA>{directory_name}</StyledA>
            </CustomDiv>
          </DirecotryWrapper>
        </Col>
      ))}
    </>
  );
};
