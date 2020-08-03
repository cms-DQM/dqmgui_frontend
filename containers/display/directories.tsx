import * as React from 'react';
import { useRouter } from 'next/router';
import { QueryProps } from './interfaces';
import { Col } from 'antd';
import { DirecotryWrapper, StyledA, Icon } from './styledComponents';
import {
  getFolderPathToQuery,
  changeRouter,
  getChangedQueryParams,
} from './utils';
import { CustomDiv } from '../../components/styledComponents';
import { store } from '../../contexts/leftSideContext';
import { functions_config } from '../../config/config';

interface FoldersFilter {
  directories: (string | undefined)[];
}

export const Directories = ({ directories }: FoldersFilter) => {
  const router = useRouter();
  const query: QueryProps = router.query;
  const { updated_by_not_older_than } = React.useContext(store);

  const [blink, set_blink] = React.useState(updated_by_not_older_than)
  React.useEffect(() => {
    //timeouts in order to get longer and more visible animation
    setTimeout(() => { set_blink(true) }, 0)
    setTimeout(() => { set_blink(false) }, 2000)
  }, [updated_by_not_older_than])

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
              <Icon
                isLoading={blink.toString()}
                animation={functions_config.modes.online_mode.toString()}
              />
              <StyledA>{directory_name}</StyledA>
            </CustomDiv>
          </DirecotryWrapper>
        </Col>
      ))}
    </>
  );
};
