import * as React from 'react'
import { useRouter } from 'next/router';
import { QueryProps } from './interfaces';
import { store } from '../../contexts/leftSideContext';
import { Col } from 'antd';
import { DirecotryWrapper, StyledA, Icon } from './styledComponents';
import Link from 'next/link';

interface FoldersFilter {
  directories: (string | undefined)[]
}

const getFilteredDirectories = (query: QueryProps, workspaceFolders: string[], directories: (string | undefined)[]) => {
  //if workspaceFolders array from context is not empty we taking intersection between all directories and workspaceFolders
  // workspace folders are fileterd folders array by selected workspace
  if (workspaceFolders.length > 0) {
    //@ts-ignore
    const filteredDirectories = directories.filter((directory: string) => workspaceFolders.includes(directory))
    return filteredDirectories
  }
  // if folder_path and workspaceFolders are empty, we return all direstories 
  else if (workspaceFolders.length === 0) {
    return directories
  }
}

export const Directories = ({ directories }: FoldersFilter) => {
  const router = useRouter();
  const query: QueryProps = router.query;

  const globalState = React.useContext(store)
  const { workspaceFolders } = globalState;
  const filteredDirectories = directories ? getFilteredDirectories(query, workspaceFolders, directories) : []

  return (
    <>
      {filteredDirectories && filteredDirectories.map((directory_name: any) => (
        <Col span={4} key={directory_name}>
          <DirecotryWrapper>
            <Icon />
            <Link
              href={{
                pathname: '/',
                query: {
                  run_number: query.run_number,
                  dataset_name: query.dataset_name,
                  folder_path: `${query.folder_path}/${directory_name}`,
                  workspace: query.workspace,
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
