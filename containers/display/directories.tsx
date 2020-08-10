import * as React from 'react';
import { useRouter } from 'next/router';
import { QueryProps, DirectoryInterface } from './interfaces';
import { Col } from 'antd';

import { DirecotryWrapper, StyledA, Icon } from './styledComponents';
import {
  getFolderPathToQuery,
  changeRouter,
  getChangedQueryParams,
} from './utils';
import { CustomDiv, CutomBadge } from '../../components/styledComponents';
import { store } from '../../contexts/leftSideContext';
import { functions_config } from '../../config/config';

interface FoldersFilter {
  directories: (DirectoryInterface)[];
}

interface MeCountProps {
  me_count: number;
  children: React.ReactElement
}

const MeCount = ({ me_count, children }: MeCountProps) => {
  if (functions_config.new_back_end.new_back_end) {
    return (<CutomBadge
      count={me_count}>
      {children}
    </CutomBadge>)
  }
  return children
}

export const Directories = ({ directories }: FoldersFilter) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const { updated_by_not_older_than } = React.useContext(store);

  const [blink, set_blink] = React.useState(updated_by_not_older_than);
  React.useEffect(() => {
    //timeouts in order to get longer and more visible animation
    setTimeout(() => {
      set_blink(true);
    }, 0);
    setTimeout(() => {
      set_blink(false);
    }, 2000);
  }, [updated_by_not_older_than]);
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
                changeRouter(
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
              <MeCount
                me_count={directory.me_count ? directory.me_count : 0}>
                <Icon
                  isLoading={blink.toString()}
                  animation={functions_config.modes.online_mode.toString()}
                />
              </MeCount>
              <StyledA>{directory.subdir}</StyledA>
            </CustomDiv>
          </DirecotryWrapper>
        </Col>
      ))}
    </>
  );
};
