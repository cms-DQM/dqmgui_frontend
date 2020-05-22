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
  //when workspace is selected folder path in query is set to '', thats why in condition is cheking is !query.folder_path
  // after that is checking is workspaceFolders array from context is not empty;
  // if it's not- then we taking intersection between all directories and workspaceFolders
  if (!query.folder_path && workspaceFolders.length > 0) {
    //@ts-ignore
    const filteredDirectories = directories.filter((directory: string) => workspaceFolders.includes(directory))
    console.log(workspaceFolders)
    return filteredDirectories
  }
  // if folder_path and workspaceFolders are empty, we return all direstories 
  else if (!query.folder_path && workspaceFolders.length === 0) {
    return directories
  }
  // if folder_path is NOT empty, we return all direstories, because was selected wnated folder and noo additional filterig is needed
  else if (query.folder_path) {
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
