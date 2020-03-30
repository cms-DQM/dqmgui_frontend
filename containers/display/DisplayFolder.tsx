import { FC, useState, useEffect } from 'react';
import { useRequest } from '../../hooks/useRequest';
import Link from 'next/link';
import { Plot } from './plot';
import { View_details_menu, LineProps } from '../../components/view_details_menu';

interface DirectoryInterface {
  subdir: string;
  streamerinfo: string;
  obj: string,
  dir: string,
  stats: any,
}

interface ContentsProps {
  subdir: string;
  streamerinfo: string;
}

interface FolderProps {
  folder_path?: string;
  run_number: number;
  dataset_name: string;
}

const DiplayFolder: FC<FolderProps> = ({
  folder_path,
  run_number,
  dataset_name
}) => {
  const [overlay_plot, set_plot_to_overlay] = useState<LineProps[] | undefined>()

  const { data, error, isLoading } = useRequest(
    `/data/json/archive/${run_number}${dataset_name}${folder_path}`,
    {},
    [folder_path]
  );
  const contents: any[] = data ?
    data.contents.filter((one_item: ContentsProps) => !one_item.hasOwnProperty('streamerinfo'))
    : []

  return (
    <>
      <div>
        folder path: {folder_path}, {run_number}, {dataset_name}
      </div>
      <View_details_menu set_plot_to_overlay={set_plot_to_overlay} />
      <div>
        {contents.map((directory: DirectoryInterface) => {
          const directory_name = directory?.subdir
          const plot_name = directory?.obj

          return (
            <li key={directory_name || plot_name}>
              {directory_name ?
                <Link
                  href={{
                    pathname: '/',
                    query: {
                      run_number: run_number,
                      dataset_name: dataset_name,
                      folder_path: `${folder_path}/${directory_name}`
                    }
                  }}
                >
                  <a>{directory_name}</a>
                </Link>
                :
                <Plot
                  plot_name={plot_name}
                  dataset_name={dataset_name}
                  folders_path={folder_path}
                  run_number={run_number}
                  overlay_plot={overlay_plot}
                />
              }
            </li>
          )
        }
        )}
      </div>
    </>
  );
};

export default DiplayFolder;
