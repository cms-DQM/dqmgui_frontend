import React from 'react'
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router'
import Link from 'next/link';

import { getFolderPath } from './utils'

interface FolderPathProps {
  folder_path: string | undefined
}

export const FolderPath = ({ folder_path }: FolderPathProps) => {
  const folders = folder_path ? folder_path.split("/") : []
  const router = useRouter()
  const query = router.query

  console.log(decodeURIComponent(router.asPath))
  return (
    <Breadcrumb separator=">">
      {folders.map((folder: string) => {
        const formatedFolder = folder === '' ? '\\' : folder
        return (
          <Breadcrumb.Item>
            <Link
              href={{
                pathname: '/',
                query: {
                  run_number: query.run_number,
                  dataset_name: query.dataset_name,
                  folder_path: getFolderPath(folders, formatedFolder),
                },
              }}
            >
              {formatedFolder}
            </Link>
          </Breadcrumb.Item>
        )
      }
      )}
    </Breadcrumb>
  )
}