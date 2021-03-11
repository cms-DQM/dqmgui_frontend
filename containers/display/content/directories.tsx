import * as React from 'react';
import { useRouter } from 'next/router';
import { QueryProps, DirectoryInterface } from '../interfaces';
import { Col } from 'antd';

import { DirecotryWrapper, StyledA, Icon } from '../styledComponents';
import {
  getFolderPathToQuery,
  changeRouter,
  getChangedQueryParams,
} from '../utils';
import { CustomDiv, CutomBadge } from '../../../components/styledComponents';
import { functions_config } from '../../../config/config';


interface FoldersFilter {
  directories: DirectoryInterface[];
  isLoading?: boolean;
}

export interface MeCountProps {
  me_count: number;
  children: React.ReactElement;
}

export const MeCount = ({ me_count, children }: MeCountProps) => {
  if (functions_config.new_back_end.new_back_end) {
    return <CutomBadge count={me_count}>{children}</CutomBadge>;
  }
  return children;
};

export const Directories = ({ directories, isLoading }: FoldersFilter) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  return (
    <>
      {directories.map((directory: DirectoryInterface) => (
        <Col span={4} key={directory.subdir}>
          <DirecotryWrapper>
            <CustomDiv
              hover="true"
              display="flex"
              space="1"
              alignitems="center"
              onClick={() =>
                !isLoading && changeRouter(
                  getChangedQueryParams(
                    {
                      folder_path: getFolderPathToQuery(
                        query.folder_path,
                        directory.subdir
                      ),
                    },
                    query
                  )
                )
              }
            >
              <MeCount me_count={directory.me_count ? directory.me_count : 0}>
                <Icon isLoading={isLoading.toString()}/>
              </MeCount>
              <StyledA>{directory.subdir}</StyledA>
            </CustomDiv>
          </DirecotryWrapper>
        </Col>
      ))}
    </>
  );
};
